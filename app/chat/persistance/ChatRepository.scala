package chat.persistance

import chat.models.{Conversation, Message}
import javax.inject.Singleton

@Singleton
class ChatRepository {

  private var conversations: List[Conversation] = List.empty

  private var messagesByConversationId: Map[Long, List[Message]] = Map.empty

  def saveConversation(conversation: Conversation): Conversation = {
    conversations = conversations :+ conversation
    conversation
  }

  def getConversationByMembers(member1: String, member2: String): Option[Conversation] = {
    val members = (member1, member2)
    conversations.find(conv => conv.members.equals(members) || conv.members.equals(members.swap))
  }

  def saveMessage(conversationId: Long, message: Message): List[Message] = {
    var messages = messagesByConversationId.getOrElse(conversationId, List.empty)
    messages = messages :+ message
    messagesByConversationId += conversationId -> messages
    messages
  }

  def getMessages(conversationId: Long): List[Message] = {
    messagesByConversationId.getOrElse(conversationId, List.empty)
  }

  def getUserConversations(user: String): List[Conversation] = {
    conversations.filter(conv => conv.members._1.equals(user))
  }
}
