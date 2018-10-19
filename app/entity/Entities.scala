package entity

import org.bson.codecs.configuration.CodecRegistries._
import org.mongodb.scala.bson.codecs.{DEFAULT_CODEC_REGISTRY, Macros}

case class PickupPoint(`type`: String, name: String, point: Point)

case class Point(lat: Double, long: Double)


object Registries {

  val pickupPointCodec = Macros.createCodecProviderIgnoreNone[PickupPoint]
  val pointCodec = Macros.createCodecProviderIgnoreNone[Point]

  val codecRegistry = fromRegistries(
    fromProviders(pickupPointCodec),
    fromProviders(pointCodec),
    DEFAULT_CODEC_REGISTRY
  )
}
