package entity

import chat.models.{Conversation, Message}
import com.google.maps.model.LatLng
import org.bson.codecs.configuration.CodecRegistries._
import org.mongodb.scala.bson.codecs.{DEFAULT_CODEC_REGISTRY, Macros}

case class PickupPoint(`type`: String, name: String, point: Point)

case class Point(lat: Double, lng: Double) {
  override def toString: String = s"$lat,$lng"
}

case class DriverPath(
                       routeId: Option[String],
                       driverId: String,
                       carId: String,
                       startLabel: Option[String],
                       endLabel: Option[String],
                       route: Route,
                       `type`: String,
                       hidden: Boolean = false,
                       active: Boolean = true
                     )

case class DriverPathView(
                           routeId: Option[String],
                           startLabel: Option[String],
                           endLabel: Option[String],
                           hidden: Boolean,
                         )

object DriverPathView {
  def apply(
             driverPath: DriverPath,
           ): DriverPathView = new DriverPathView(driverPath.routeId, driverPath.startLabel, driverPath.endLabel, driverPath.hidden)
}

object Point {

  def apply(latLng: LatLng): Point = new Point(latLng.lat, latLng.lng)

  def distance(p1: Point, p2: Point): Double = {
    Math.sqrt(Math.pow(p2.lat - p1.lat, 2) + Math.pow(p2.lng - p1.lng, 2))
  }
}

object Registries {

  val pickupPointCodec = Macros.createCodecProviderIgnoreNone[PickupPoint]
  val pointCodec = Macros.createCodecProviderIgnoreNone[Point]
  val driverPathCodec = Macros.createCodecProviderIgnoreNone[DriverPath]
  val routeCodec = Macros.createCodecProviderIgnoreNone[Route]
  val conversationCodec = Macros.createCodecProvider[Conversation]
  val messageCodec = Macros.createCodecProvider[Message]

  val codecRegistry = fromRegistries(
    fromProviders(pickupPointCodec),
    fromProviders(pointCodec),
    fromProviders(driverPathCodec),
    fromProviders(routeCodec),
    fromProviders(conversationCodec),
    fromProviders(messageCodec),
    DEFAULT_CODEC_REGISTRY
  )
}

case class Route(
                  startLocation: Point,
                  endLocation: Point,
                  routeSteps: List[Point]
                )

case class NearestDriverView(
                              driverInfo: DriverInfo,
                              distFromStartLocation: Int,
                              distFromEndLocation: Int
                            )

case class DriverInfo(driverId: String,
                      carId: String,
                      routeId: String)

case class StartEndLocation(startLocation: Point, endLocation: Point)


case class DBActionResultSuccess() {
  override def toString: String = "DB transaction was successfull"
}
