package chat.models

case class Conversation(id: Long, members: (String, String))

case class Message(id: Long, conversationId: Long, author: String, text: String /*, date: LocalDateTime*/)
