package infrastructure.config

import org.mongodb.scala.bson.collection.immutable.Document
import org.mongodb.scala.{MongoCollection, MongoDatabase}

abstract class CollectionBasedDao(collectionName: String, databaseName: Option[String] = None)(implicit databaseConnector: DatabaseConnector) {

  private val database: MongoDatabase = databaseConnector.getDatabase(databaseName)

  val collection: MongoCollection[Document] = database.getCollection(collectionName)
}
