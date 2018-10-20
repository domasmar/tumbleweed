package infrastructure.persistance

import entity.PickupPoint
import infrastructure.config.{CollectionBasedDao, DatabaseConnector}
import javax.inject.Inject
import org.mongodb.scala.MongoCollection
import org.mongodb.scala.model.Filters._

import scala.concurrent.{ExecutionContext, Future, Promise}


class PickupPointDao @Inject()(implicit databaseConnector: DatabaseConnector, ec: ExecutionContext) extends CollectionBasedDao() {

  val collection: MongoCollection[PickupPoint] = database.getCollection("pickup_points")

  def deleteByType(`type`: String) = {
    collection.deleteMany(equal("type", `type`)).subscribe(deleteObserver)
  }

  def getAll(): Future[List[PickupPoint]] = {
    val p = Promise[List[PickupPoint]]()
    collection.find().subscribe(accumulateObserver(p))
    p.future
  }

  def getByType(`type`: String): Future[List[PickupPoint]] = {
    val p = Promise[List[PickupPoint]]()
    collection.find(equal("type", `type`)).subscribe(accumulateObserver(p))
    p.future
  }

  def save(points: List[PickupPoint]) = {
    collection.insertMany(points).subscribe(insertObserver)
  }

}
