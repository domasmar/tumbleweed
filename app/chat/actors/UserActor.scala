package chat.actors

import akka.actor.{Actor, ActorRef, _}
import akka.pattern.ask
import akka.util.Timeout
import chat.models._
import chat.services.ChatService

import scala.concurrent.Await
import scala.concurrent.duration._


class UserActor(out: ActorRef, chatRoom: ActorRef)(chatService: ChatService, userId: String) extends Actor {

  override def preStart(): Unit = {
    println(s"connected $userId")
    self ! UserConnected(out)
  }

  override def receive: PartialFunction[Any, Unit] = {
    case UserConnected(outgoing) =>
      context.become(connected(outgoing))
  }

  private def connected(outgoing: ActorRef): Receive = {

    chatRoom ! JoinRoom

    {
      case IncomingMessage(text) => handleIncomingMessage(text)
      case RoomMessage(history) => outgoing ! OutgoingMessage(history)
    }
  }

  private def handleIncomingMessage(text: String): Unit = {
    implicit val timeout: Timeout = Timeout(5 seconds)
    val future = chatRoom ? IdentificationRequest
    val roomId = Await.result(future, timeout.duration).asInstanceOf[Long]
    chatRoom ! RoomMessage(chatService.postMessage(roomId, userId, text))
  }

}

// create factory to re use User actor on multiple connections
