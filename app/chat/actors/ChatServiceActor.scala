package chat.actors

import akka.NotUsed
import akka.actor.Actor
import akka.pattern.pipe
import akka.stream.scaladsl.Source
import chat.actors.ChatServiceActor.{ConversationRequest, RequestHistory, RequestMessagesForStream, SaveMessage}
import chat.models.{Conversation, Message}
import chat.ports.ChatRepositoryPort
import javax.inject.Inject

import scala.concurrent.{ExecutionContext, Future}
import scala.util.Success


object ChatServiceActor {

  case class ConversationRequest(members: (String, String))

  case class SaveMessage(conversationId: Long, author: String, text: String)

  case class RequestHistory(conversationId: Long)

  case class RequestMessagesForStream(conversationId: Long)

}

class ChatServiceActor @Inject()(chatPort: ChatRepositoryPort)
                                (implicit ec: ExecutionContext) extends Actor {

  var messageSourceByConvId: Map[Long, Source[Message, NotUsed]] = Map.empty

  def receive: PartialFunction[Any, Unit] = {
    case ConversationRequest(members) =>
      val eventualLong = chatPort.getConversationIdByMembers(members)
        .transformWith {
          case Success(value) => if (value == 0) chatPort.saveConversation(Conversation(members)) else Future.successful(value)
          case scala.util.Failure(exception) => chatPort.saveConversation(Conversation(members))
        }
        .recoverWith {
          case e => chatPort.saveConversation(Conversation(members))
        }
      eventualLong pipeTo sender()
    case SaveMessage(conversationId, author, text) => chatPort.saveMessage(Message(conversationId, author, text))
    case RequestHistory(conversationId) => chatPort.getMessagesByConversationId(conversationId) pipeTo sender()
    case RequestMessagesForStream(conversationId) =>
      sender() ! messageSourceByConvId.getOrElse(conversationId, {
        val newSource = Source.fromPublisher(chatPort.getMessagesPublisherByConversationId(conversationId)).filter(_.conversationId == conversationId)
        messageSourceByConvId = messageSourceByConvId + (conversationId -> newSource)
        newSource
      })
  }
}
