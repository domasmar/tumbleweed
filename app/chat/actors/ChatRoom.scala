package chat.actors

import akka.NotUsed
import akka.actor.{Actor, ActorRef, _}
import akka.pattern.{ask, pipe}
import akka.stream.scaladsl.{Flow, Sink, Source}
import akka.stream.{ActorMaterializer, Materializer}
import akka.util.Timeout
import chat.actors.ChatRoom.{JoinRoom, RequestRoomHistory, UserMessage}
import chat.actors.ChatServiceActor.{ConversationRequest, RequestHistory, RequestMessagesForStream, SaveMessage}
import chat.actors.UserActor.{Ack, Complete, Init, RoomMessage}
import chat.models.Message
import javax.inject.{Inject, Named, Singleton}

import scala.concurrent.duration._
import scala.concurrent.{Await, ExecutionContext}

object ChatRoom {

  def props(conversationId: Long, chatServiceRef: ActorRef)(implicit ec: ExecutionContext) = Props(new ChatRoom(conversationId, chatServiceRef))

  case class UserMessage(userId: String, text: String)

  case object JoinRoom

  case object RequestRoomHistory

}

class ChatRoom(conversationId: Long, chatServiceRef: ActorRef)(implicit ec: ExecutionContext) extends Actor {

  implicit val timeout: Timeout = 5.seconds

  override def receive: PartialFunction[Any, Unit] = {
    case JoinRoom => subscribeToMessages(sender())
    case RequestRoomHistory => (chatServiceRef ? RequestHistory(conversationId)) pipeTo sender()
    case UserMessage(userId, text) => chatServiceRef ! SaveMessage(conversationId, userId, text)
  }

  private def subscribeToMessages(userRef: ActorRef): Unit = {
    implicit val mat: ActorMaterializer = ActorMaterializer()

    val subscriptionFuture = chatServiceRef ? RequestMessagesForStream(conversationId)

    val outgoingMappingFlow = Flow[Message].map(RoomMessage)
    val actorRefSink = Sink.actorRefWithAck(userRef, Init, Ack, Complete)

    subscriptionFuture.mapTo[Source[Message, NotUsed]]
      .map(_.via(outgoingMappingFlow)
        .to(actorRefSink))
      .foreach(_.run())
  }
}

@Singleton
class ChatRoomFactory @Inject()(@Named("chat-service-actor") chatServiceRef: ActorRef)(implicit system: ActorSystem, mat: Materializer, executionContext: ExecutionContext) {

  implicit val timeout: Timeout = 5.seconds

  private var roomActorCacheByConversationId: Map[Long, ActorRef] = Map.empty

  def getOrCreateRoom(sender: String, receiver: String): ActorRef = {
    val conversationFuture = chatServiceRef ? ConversationRequest((sender, receiver))
    val conversationId = Await.result(conversationFuture, timeout.duration).asInstanceOf[Long]

    roomActorCacheByConversationId.getOrElse(conversationId, {
      val chatRoom: ActorRef = system.actorOf(ChatRoom.props(conversationId, chatServiceRef), s"room_$conversationId")
      roomActorCacheByConversationId += conversationId -> chatRoom
      chatRoom
    })
  }

}
