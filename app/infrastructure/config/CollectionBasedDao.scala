package infrastructure.config

import entity.Registries
import org.mongodb.scala.MongoDatabase

abstract class CollectionBasedDao(databaseName: Option[String] = None)(implicit databaseConnector: DatabaseConnector) {

  val database: MongoDatabase = databaseConnector.getDatabase(databaseName)
    .withCodecRegistry(Registries.codecRegistry)

}
