package chat.services

import chat.models.{Conversation, Message}
import chat.persistance.ChatRepository
import javax.inject.{Inject, Singleton}

@Singleton
class ChatService @Inject()(chatRepository: ChatRepository) {

  //yea it is stupid
  private var idx = 333
  private var idx2 = 111

  def getOrCreateConversation(sender: String, receiver: String): Long = {
    chatRepository.getConversationByMembers(sender, receiver).getOrElse {
      idx += 1
      chatRepository.saveConversation(Conversation(idx, (sender, receiver)))
    }.id
  }

  def postMessage(conversationId: Long, author: String, text: String): List[Message] = {
    idx2 += 1
    val message = Message(idx2, conversationId, author, text /*, LocalDateTime.now*/)
    chatRepository.saveMessage(conversationId, message)
  }

  def getConversationHistory(conversationId: Long): List[Message] = chatRepository.getMessages(conversationId)

  def getUserConversation(user: String): List[Conversation] = chatRepository.getUserConversations(user);
}
