package chat.actors

import akka.actor.{Actor, ActorRef, _}
import akka.pattern.{ask, pipe}
import akka.util.Timeout
import chat.actors.ChatRoom.{JoinRoom, RequestRoomHistory, UserMessage}
import chat.actors.UserActor._
import chat.models._

import scala.concurrent.ExecutionContext
import scala.concurrent.duration._

object UserActor {

  case class IncomingMessage(text: String)

  case class RoomMessage(message: Message)

  case class OutgoingMessage(message: Seq[Message])

  case class UserConnected(outgoing: ActorRef)

  case object Init

  case object Ack

  case object Complete

}

class UserActor(out: ActorRef, chatRoom: ActorRef, userId: String)(implicit ec: ExecutionContext) extends Actor {

  implicit val timeout: Timeout = 5.seconds

  override def preStart(): Unit = {
    println(s"connected $userId")
    self ! UserConnected(out)
  }

  override def receive: PartialFunction[Any, Unit] = {
    case UserConnected(outgoing) =>
      context.become(connected(outgoing))
  }

  override def unhandled(message: Any): Unit = {
    println("Unhandled")
    println(message)
  }

  private def connected(outgoing: ActorRef): Receive = {
    chatRoom ! JoinRoom

    val historyFuture = chatRoom ? RequestRoomHistory
    historyFuture.mapTo[Seq[Message]].map(OutgoingMessage) pipeTo outgoing


    {
      case IncomingMessage(text) => chatRoom ! UserMessage(userId, text)
      case RoomMessage(message) =>
        outgoing ! OutgoingMessage(Seq(message))
        sender() ! Ack
      case Init => sender() ! Ack
    }
  }
}
