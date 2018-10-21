package infrastructure.persistance

import java.time.LocalDateTime

import entity.DriverPath
import infrastructure.config.{CollectionBasedDao, DatabaseConnector}
import javax.inject.Inject
import org.mongodb.scala.MongoCollection
import org.mongodb.scala.model.Filters.equal
import org.mongodb.scala.model.Updates._

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

  def getById(routeId: String): Future[DriverPath] = {
    val p = Promise[List[DriverPath]]()
    collection.find(equal("routeId", routeId)).subscribe(accumulateObserver(p))
    p.future.map(_.head)
  }

  def getByDriver(userId: String): Future[List[DriverPath]] = {
    val p = Promise[List[DriverPath]]()
    collection.find(equal("driverId", userId)).subscribe(accumulateObserver(p))
    p.future
  }

  def save(points: List[DriverPath]) = {
    collection
      .insertMany(points.map(generateDriverPathId))
      .subscribe(insertObserver)
  }

  private def generateDriverPathId(path: DriverPath) = {
    if (path.routeId.isEmpty) {
      path.copy(routeId = Some(path.driverId + LocalDateTime.now().toString))
    } else {
      path
    }
  }

  def delete(routeId: String): Unit = {
    collection.deleteOne(equal("routeId", routeId)).subscribe(deleteObserver)
  }

  def updatePathStatus(routeId: String, hide: Boolean): Unit = {
    collection.findOneAndUpdate(equal("routeId", routeId), set("hidden", hide))
      .subscribe(accumulateObserver(Promise[List[DriverPath]]()))
  }

}
