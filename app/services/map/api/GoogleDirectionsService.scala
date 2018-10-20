package services.map.api

import com.google.maps.model.{DirectionsRoute, LatLng, TravelMode}
import com.google.maps.{DirectionsApi, GeoApiContext}
import entity.{Point, Route}
import javax.inject.{Inject, Singleton}
import play.api.Configuration
import play.api.libs.ws.WSClient

import scala.collection.JavaConverters._


@Singleton
class GoogleDirectionsService @Inject()(ws: WSClient, config: Configuration) {

  private val apiKey: String = config.get[String]("google.api.key")

  private val context: GeoApiContext = new GeoApiContext.Builder().apiKey(apiKey).build


  def getRoad(startLocation: Point, endLocation: Point): Option[Route] = {

    val request = DirectionsApi.getDirections(context, startLocation.toString, endLocation.toString).mode(TravelMode.DRIVING)

    try {
      val result = request.await()
      result.routes.headOption.flatMap(toRoute)
    } catch {
      case e: Exception => Option.empty
    }
  }

  private def toRoute(route: DirectionsRoute): Option[Route] = {
    for {
      head <- route.legs.headOption
      last <- route.legs.lastOption
    } yield Route(
      Point(head.startLocation),
      Point(last.endLocation),
      getRouteSteps(route)
    )
  }

  private def getRouteSteps(route: DirectionsRoute): List[Point] = {
    route.legs
      .flatMap(leg => leg.steps)
      .flatMap(step => step.polyline.decodePath().asScala)
      .map(Point(_))
      .toList
  }
}
