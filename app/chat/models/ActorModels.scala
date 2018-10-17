package chat.models

import akka.actor.ActorRef

case object IdentificationRequest

case object JoinRoom

case class RoomMessage(history: List[Message])

case class UserConnected(outgoing: ActorRef)

case class IncomingMessage(text: String)

case class OutgoingMessage(history: List[Message])

