package chat.models

import java.time.LocalDateTime

case class Conversation(id: Option[Long], members: Seq[String])

object Conversation {
  def apply(members: (String, String)): Conversation =
    Conversation(None, members.productIterator.map(o => o.asInstanceOf[String]).toList)
}

case class Message(id: Option[Long], conversationId: Long, author: String, text: String, date: LocalDateTime)

object Message {
  def apply(conversationId: Long, author: String, text: String): Message =
    Message(None, conversationId, author, text, LocalDateTime.now())
}
