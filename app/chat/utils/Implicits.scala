package chat.utils

import java.util.concurrent.atomic.AtomicBoolean

import akka.util.Timeout
import org.mongodb.scala.model.changestream.ChangeStreamDocument
import org.mongodb.{scala => mongoDB}
import org.{reactivestreams => rxStreams}

import scala.language.implicitConversions

object Implicits {

  implicit def observableToPublisher[T](observable: mongoDB.Observable[T]): rxStreams.Publisher[T] = ObservableToPublisher(observable)

  case class ObservableToPublisher[T](observable: mongoDB.Observable[T]) extends rxStreams.Publisher[T] {
    override def subscribe(subscriber: rxStreams.Subscriber[_ >: T]): Unit = {
      observable.subscribe(
        new mongoDB.Observer[T] {


          override def onSubscribe(subscription: mongoDB.Subscription): Unit = {
            subscriber.onSubscribe(new rxStreams.Subscription {
              private final val cancelled: AtomicBoolean = new AtomicBoolean

              override def request(n: Long): Unit = {
                if (!subscription.isUnsubscribed() && n < 1) {
                  subscriber.onError(new IllegalArgumentException(
                    """3.9 While the Subscription is not cancelled,
                      | Subscription.request(long n) 'n' argument is <= 0.""".stripMargin
                  ))
                } else {
                  subscription.request(n)
                }
              }

              override def cancel(): Unit = {
                if (!cancelled.getAndSet(true)) {
                  subscription.unsubscribe()
                }
              }
            })
          }

          override def onNext(result: T): Unit = subscriber.onNext(result)


          override def onError(e: Throwable): Unit = subscriber.onError(e)

          override def onComplete(): Unit = subscriber.onComplete()
        }
      )
    }
  }

  implicit def changeStreamObservableToPublisher[T](observable: mongoDB.ChangeStreamObservable[T]): rxStreams.Publisher[T] = ChangeStreamObservableToPublisher(observable)


  case class ChangeStreamObservableToPublisher[T](observable: mongoDB.ChangeStreamObservable[T]) extends rxStreams.Publisher[T] {
    override def subscribe(subscriber: rxStreams.Subscriber[_ >: T]): Unit = {
      observable.subscribe(new mongoDB.Observer[ChangeStreamDocument[T]] {
        override def onSubscribe(subscription: mongoDB.Subscription): Unit = {
          subscriber.onSubscribe(new rxStreams.Subscription {
            private final val cancelled: AtomicBoolean = new AtomicBoolean

            override def request(n: Long): Unit = {
              if (!subscription.isUnsubscribed() && n < 1) {
                subscriber.onError(new IllegalArgumentException(
                  """3.9 While the Subscription is not cancelled,
                    | Subscription.request(long n) 'n' argument is <= 0.""".stripMargin
                ))
              } else {
                subscription.request(n)
              }
            }

            override def cancel(): Unit = {
              if (!cancelled.getAndSet(true)) {
                subscription.unsubscribe()
              }
            }
          })
        }

        override def onNext(result: ChangeStreamDocument[T]): Unit = subscriber.onNext(result.getFullDocument)

        override def onError(e: Throwable): Unit = subscriber.onError(e)

        override def onComplete(): Unit = subscriber.onComplete()
      })
    }
  }

}
