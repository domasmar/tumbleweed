package infrastructure.persistance

import infrastructure.config.{CollectionBasedDao, DatabaseConnector}
import javax.inject.{Inject, Singleton}
import org.mongodb.scala.bson.collection.immutable.Document
import org.mongodb.scala.{Completed, MongoCollection, Observer}

@Singleton
class UserDao @Inject()(implicit databaseConnector: DatabaseConnector) extends CollectionBasedDao() {

  val collection: MongoCollection[Document] = database.getCollection("users")

  //just test method useless
  def insertUser() = {
    val doc: Document = Document("_id" -> 1, "name" -> "MongoDB", "age" -> 15)
    collection.insertOne(doc).subscribe(new Observer[Completed] {

      override def onNext(result: Completed): Unit = println("Inserted")

      override def onError(e: Throwable): Unit = println("Failed")

      override def onComplete(): Unit = println("Completed")
    }
    )
  }

}
