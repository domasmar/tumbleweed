package chat

import akka.actor.{ActorSystem, Props}
import akka.stream.Materializer
import akka.stream.scaladsl.{Flow, Sink, Source}
import chat.actors.UserActor.{IncomingMessage, OutgoingMessage}
import chat.actors.{ChatRoomFactory, UserActor}
import chat.models.Message
import controllers.Mapper
import javax.inject.Inject
import play.api.libs.json.{Json, OFormat}
import play.api.libs.streams.ActorFlow
import play.api.mvc.WebSocket.MessageFlowTransformer
import play.api.mvc.{AbstractController, ControllerComponents, _}

import scala.concurrent.{ExecutionContext, Future}

class ChatController @Inject()(
                                cc: ControllerComponents,
                                chatRoomFactory: ChatRoomFactory
                              )
                              (implicit system: ActorSystem, mat: Materializer, ec: ExecutionContext) extends AbstractController(cc) with Mapper {

  implicit def incomingMessageFormat: OFormat[IncomingMessage] = Json.format[IncomingMessage]

  implicit def outgoingMessageFormat: OFormat[OutgoingMessage] = Json.format[OutgoingMessage]

  implicit def messageFormat: OFormat[Message] = Json.format[Message]

  implicit def messageFlowTransformer: MessageFlowTransformer[IncomingMessage, OutgoingMessage] = MessageFlowTransformer.jsonMessageFlowTransformer[IncomingMessage, OutgoingMessage]


  def chatSocket: WebSocket = {
    WebSocket.acceptOrResult[IncomingMessage, OutgoingMessage] {
      request =>
        Future.successful(
          getSenderAndReceiverIds(request) match {
            case None => Left(Forbidden("Missing 'chat-sender' or/and 'chat-receiver' headers"))
            case Some((sender, receiver)) => Right(getFlow(sender, receiver))
          }
        )
    }
  }

  private def getSenderAndReceiverIds(request: RequestHeader): Option[(String, String)] = {
    for {
      sender <- request.headers.get("chat-sender")
      receiver <- request.headers.get("chat-receiver")
    } yield (sender, receiver)
  }

  private def getFlow(sender: String, receiver: String) = ActorFlow.actorRef {
    out => Props(new UserActor(out, chatRoomFactory.getOrCreateRoom(sender, receiver), sender))
  }
}
