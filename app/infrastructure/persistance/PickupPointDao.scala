package infrastructure.persistance

import entity.PickupPoint
import infrastructure.config.{CollectionBasedDao, DatabaseConnector}
import javax.inject.Inject
import org.mongodb.scala.{Completed, MongoCollection, Observer}
import org.mongodb.scala.model.Filters._
import org.mongodb.scala.result.DeleteResult

class PickupPointDao @Inject()(implicit databaseConnector: DatabaseConnector) extends CollectionBasedDao() {

  val collection: MongoCollection[PickupPoint] = database.getCollection("pickup_points")

  def deleteByType(`type`: String) = {
   collection.deleteMany(equal("type", `type`)).subscribe(new Observer[DeleteResult] {

     override def onNext(result: DeleteResult): Unit = println("Deleted")

     override def onError(e: Throwable): Unit = println(s"Failed: $e")

     override def onComplete(): Unit = println("Completed")
   })
  }

  def getByType(`type`: String): List[PickupPoint] = {
    //    collection.find(equal("type", `type`)).printResults()
    List.empty
  }

  def save(points: List[PickupPoint]) = {
    collection.insertMany(points).subscribe(new Observer[Completed] {

      override def onNext(result: Completed): Unit = println("Inserted")

      override def onError(e: Throwable): Unit = println(s"Failed: $e")

      override def onComplete(): Unit = println("Completed")
    })
  }

}
