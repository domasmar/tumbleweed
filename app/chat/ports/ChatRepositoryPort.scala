package chat.ports

import akka.stream.scaladsl.Source
import chat.models.{Conversation, Message}
import com.google.inject.ImplementedBy
import infrastructure.adapters.ChatRepositoryAdapter
import org.reactivestreams.Publisher

import scala.concurrent.Future

@ImplementedBy(classOf[ChatRepositoryAdapter])
trait ChatRepositoryPort {

  def saveMessage(message: Message): Future[Long]

  def saveConversation(conversation: Conversation): Future[Long]

  def getMessagesByConversationId(conversationId: Long): Future[Seq[Message]]

  def getConversationIdByMembers(members: (String, String)): Future[Long]

  def getMessagesPublisherByConversationId(conversationId: Long): Publisher[Message]

}
