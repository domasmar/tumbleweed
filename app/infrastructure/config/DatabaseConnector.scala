package infrastructure.config

import javax.inject.{Inject, Singleton}
import org.mongodb.scala.{MongoClient, MongoDatabase}
import play.api.Configuration

@Singleton
class DatabaseConnector @Inject()(config: Configuration) {

  val defaultDatabaseName: String = config.get[String]("mongo.default.database.name")

  val mongoClient: MongoClient = MongoClient("mongodb://admin:GHAPh5rYSPNP114O@SG-tumbleweed-15979.servers.mongodirector.com:27017/admin")

  def getDatabase(name: Option[String]): MongoDatabase = mongoClient.getDatabase(name.getOrElse(defaultDatabaseName))
}
