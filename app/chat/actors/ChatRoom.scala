package chat.actors

import akka.actor.{Actor, ActorRef, Terminated, _}
import akka.stream.Materializer
import chat.models.{IdentificationRequest, JoinRoom, RoomMessage}
import chat.services.ChatService
import javax.inject.{Inject, Singleton}

class ChatRoom(roomId: Long)(chatService: ChatService) extends Actor {
  var users: Set[ActorRef] = Set.empty

  override def receive: PartialFunction[Any, Unit] = {
    case JoinRoom => handleUserConnection()

    case msg: RoomMessage =>
      users.foreach(_ ! msg)

    case IdentificationRequest => sender() ! roomId

    case Terminated(user) =>
      users -= user
  }

  private def handleUserConnection(): Unit = {
    sender() ! RoomMessage(chatService.getConversationHistory(roomId))
    users += sender()
    context.watch(sender())
  }
}

@Singleton
class ChatRoomFactory @Inject()(chatService: ChatService)(implicit system: ActorSystem, mat: Materializer) {

  private var roomActorCacheByConversationId: Map[Long, ActorRef] = Map.empty

  def getOrCreateRoom(sender: String, receiver: String): ActorRef = {
    val conversationId = chatService.getOrCreateConversation(sender, receiver)

    roomActorCacheByConversationId.getOrElse(conversationId, {
      val chatRoom: ActorRef = system.actorOf(Props(new ChatRoom(conversationId)(chatService)), s"room_$conversationId")
      roomActorCacheByConversationId += conversationId -> chatRoom
      chatRoom
    })
  }


}
