package infrastructure.adapters

import chat.models.{Conversation, Message}
import chat.ports.ChatRepositoryPort
import chat.utils.Implicits._
import infrastructure.persistance.ChatDao
import javax.inject.{Inject, Singleton}
import org.reactivestreams.Publisher

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class ChatRepositoryAdapter @Inject()(chatDao: ChatDao)(implicit ec: ExecutionContext) extends ChatRepositoryPort {

  override def saveMessage(message: Message): Future[Long] =
    chatDao.saveMessage(message).head()


  override def saveConversation(conversation: Conversation): Future[Long] =
    chatDao.saveConversation(conversation).head()

  override def getMessagesByConversationId(conversationId: Long): Future[Seq[Message]] = {
    chatDao.getMessagesByConversationId(conversationId).toFuture()
  }

  override def getConversationIdByMembers(members: (String, String)): Future[Long] =
    chatDao.getConversationByMembers(members).map(_.id.get).head()

  override def getMessagesPublisherByConversationId(conversationId: Long): Publisher[Message] = {
    chatDao.watchMessages(conversationId)
  }
}
