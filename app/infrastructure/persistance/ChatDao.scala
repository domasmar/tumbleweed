package infrastructure.persistance

import akka.actor.FSM
import chat.models.{Conversation, Message}
import com.mongodb.MongoException
import infrastructure.config.{CollectionBasedDao, DatabaseConnector}
import javax.inject.Inject
import org.mongodb.scala.bson.collection.immutable.Document
import org.mongodb.scala.model.Filters._
import org.mongodb.scala.model.Updates._
import org.mongodb.scala.model.changestream.ChangeStreamDocument
import org.mongodb.scala.{ChangeStreamObservable, Completed, FindObservable, MongoCollection, Observer, SingleObservable}

import scala.concurrent.ExecutionContext
import scala.util.{Failure, Success}

class ChatDao @Inject()(implicit databaseConnector: DatabaseConnector, ec: ExecutionContext) extends CollectionBasedDao() {

  val conversationCollection: MongoCollection[Conversation] = database.getCollection("conversations")
  val messageCollection: MongoCollection[Message] = database.getCollection("messages")
  val counterCollection: MongoCollection[Document] = database.getCollection("counters")


  def saveConversation(conversation: Conversation): SingleObservable[Long] = {
    getNextId("conversations")
      .map(nextId => conversation.copy(id = Some(nextId)))
      .flatMap(conv => conversationCollection.insertOne(conv)
        .map(o => conv.id.get)
      )
  }

  def saveMessage(message: Message): SingleObservable[Long] = {
    getNextId("messages")
      .map(newId => message.copy(id = Some(newId)))
      .flatMap(msg => messageCollection.insertOne(msg)
        .map(o => msg.id.get))
  }

  def getConversationByMembers(members: (String, String)): SingleObservable[Conversation] = {
    conversationCollection
      .find(all("members", members._1, members._2))
      .first()
  }

  def getMessagesByConversationId(conversationId: Long): FindObservable[Message] = {
    messageCollection.find(equal("conversationId", conversationId))
  }

  def watchMessages(conversationId: Long): ChangeStreamObservable[Message] = messageCollection.watch()

  private def getNextId(collectionName: String): SingleObservable[Long] = {
    counterCollection.findOneAndUpdate(
      equal("_id", collectionName),
      inc("nextId", 1))
      .map(doc => doc.get("nextId").get)
      .map(bson => bson.asInt64().getValue)
  }
}
