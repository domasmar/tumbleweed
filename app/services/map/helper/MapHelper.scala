package services.map.helper

import entity.{Point, Route}

object MapHelper {
  private val AVERAGE_RADIUS_OF_EARTH_KM = 6371
  private val DEFAULT_MAX_DISTANCE_M = 300

  private def calculateDistanceInKilometer(userLocation: Point, warehouseLocation: Point): Double = {
    val latDistance = Math.toRadians(userLocation.lat - warehouseLocation.lat)
    val lngDistance = Math.toRadians(userLocation.lng - warehouseLocation.lng)
    val sinLat = Math.sin(latDistance / 2)
    val sinLng = Math.sin(lngDistance / 2)
    val a = sinLat * sinLat +
      (Math.cos(Math.toRadians(userLocation.lat)) *
        Math.cos(Math.toRadians(warehouseLocation.lat)) *
        sinLng * sinLng)
    val c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    AVERAGE_RADIUS_OF_EARTH_KM * c
  }

  private def findNearestRoutePointToPoint(destination: Point, route: Route): Option[PointToDistance] = {
    val routePoints: List[Point] = route.routeSteps ++ List(route.startLocation, route.endLocation)
    routePoints.map(point => (point, calculateDistanceInKilometer(destination, point)))
      .sortBy(_._2)
      .headOption
      .map(d => PointToDistance(d._1, d._2))
  }

  def findNearestRoutesToPoint(destination: Point, routes: List[Route]): List[(Route, PointToDistance)] = {
    val routesWiThNearestPoints = for {
      route <- routes
      nearestPoint <- findNearestRoutePointToPoint(destination, route)
    } yield (route, nearestPoint)

    routesWiThNearestPoints
      .filter(route => route._2.distance * 1000 < DEFAULT_MAX_DISTANCE_M)
      .sortBy(_._2.distance)
  }

//  def main(args: Array[String]): Unit = {
//    println(calculateDistanceInKilometer(Point(54.720248, 25.302335), Point(54.718992, 25.296918)))
//  }

}

case class PointToDistance(point: Point, distance: Double)

