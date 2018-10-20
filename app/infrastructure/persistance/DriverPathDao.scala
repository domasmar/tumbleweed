package infrastructure.persistance

import entity.DriverPath
import infrastructure.config.{CollectionBasedDao, DatabaseConnector}
import javax.inject.Inject
import org.mongodb.scala.MongoCollection
import org.mongodb.scala.model.Filters.equal

import scala.concurrent.{ExecutionContext, Future, Promise}

class DriverPathDao @Inject()(implicit databaseConnector: DatabaseConnector, ec: ExecutionContext) extends CollectionBasedDao() {

  val collection: MongoCollection[DriverPath] = database.getCollection("driver_paths")

  def deleteByType(`type`: String) = {
    collection.deleteMany(equal("type", `type`)).subscribe(deleteObserver)
  }

  def getAll(): Future[List[DriverPath]] = {
    val p = Promise[List[DriverPath]]()
    collection.find().subscribe(accumulateObserver(p))
    p.future
  }

  def getByDriver(userId: String): Future[List[DriverPath]] = {
    val p = Promise[List[DriverPath]]()
    collection.find(equal("driverId", userId)).subscribe(accumulateObserver(p))
    p.future
  }

  def save(points: List[DriverPath]) = {
    collection.insertMany(points).subscribe(insertObserver)
  }

}
