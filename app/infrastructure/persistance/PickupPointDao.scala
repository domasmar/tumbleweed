package infrastructure.persistance

import entity.PickupPoint
import infrastructure.config.{CollectionBasedDao, DatabaseConnector}
import javax.inject.Inject
import org.mongodb.scala.model.Filters._
import org.mongodb.scala.result.DeleteResult
import org.mongodb.scala.{Completed, MongoCollection, Observer}

import scala.collection.mutable
import scala.concurrent.{ExecutionContext, Future, Promise}


class PickupPointDao @Inject()(implicit databaseConnector: DatabaseConnector, ec: ExecutionContext) extends CollectionBasedDao() {

  val collection: MongoCollection[PickupPoint] = database.getCollection("pickup_points")

  def deleteByType(`type`: String) = {
   collection.deleteMany(equal("type", `type`)).subscribe(new Observer[DeleteResult] {

     override def onNext(result: DeleteResult): Unit = println("Deleted")

     override def onError(e: Throwable): Unit = println(s"Failed: $e")

     override def onComplete(): Unit = println("Completed")
   })
  }

  def getAll(): Future[List[PickupPoint]] = {
    val p = Promise[List[PickupPoint]]()

    collection.find().subscribe(new Observer[PickupPoint] {
      val acc: mutable.ArrayBuffer[PickupPoint] = mutable.ArrayBuffer()

      override def onNext(result: PickupPoint): Unit = acc += result
      override def onError(e: Throwable): Unit = p.failure(e)
      override def onComplete(): Unit = p.success(acc.toList)
    })

    p.future
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
