package infrastructure.config

import entity.Registries
import org.mongodb.scala.result.DeleteResult
import org.mongodb.scala.{Completed, MongoDatabase, Observer}

import scala.collection.mutable
import scala.concurrent.Promise

abstract class CollectionBasedDao(databaseName: Option[String] = None)(implicit databaseConnector: DatabaseConnector) {

  val database: MongoDatabase = databaseConnector.getDatabase(databaseName)
    .withCodecRegistry(Registries.codecRegistry)

  def deleteObserver: Observer[DeleteResult] = {
    new Observer[DeleteResult] {
      override def onNext(result: DeleteResult): Unit = println("Deleted")

      override def onError(e: Throwable): Unit = println(s"Failed: $e")

      override def onComplete(): Unit = println("Completed")
    }
  }

  def accumulateObserver[T](promise: Promise[List[T]]): Observer[T] = {
    new Observer[T] {
      val acc: mutable.ArrayBuffer[T] = mutable.ArrayBuffer()

      override def onNext(result: T): Unit = acc += result

      override def onError(e: Throwable): Unit = promise.failure(e)

      override def onComplete(): Unit = promise.success(acc.toList)
    }
  }

  def insertObserver: Observer[Completed] = {
    new Observer[Completed] {

      override def onNext(result: Completed): Unit = println("Inserted")

      override def onError(e: Throwable): Unit = println(s"Failed: $e")

      override def onComplete(): Unit = println("Completed")
    }
  }

}
