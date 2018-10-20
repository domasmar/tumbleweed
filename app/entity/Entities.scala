package entity

import com.google.maps.model.LatLng
import org.bson.codecs.configuration.CodecRegistries._
import org.mongodb.scala.bson.codecs.{DEFAULT_CODEC_REGISTRY, Macros}

case class PickupPoint(`type`: String, name: String, point: Point)

case class Point(lat: Double, lng: Double) {
  override def toString: String = s"$lat,$lng"
}

case class DriverPath(
                       driverId: String,
                       start: Point,
                       end: Point,
                       startLabel: String,
                       endLabel: String,
                       points: List[Point]
                     )

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

  val codecRegistry = fromRegistries(
    fromProviders(pickupPointCodec),
    fromProviders(pointCodec),
    fromProviders(driverPathCodec),
    DEFAULT_CODEC_REGISTRY
  )
}


case class Route(
                  startLocation: Point,
                  endLocation: Point,
                  routeSteps: List[Point]
                )

