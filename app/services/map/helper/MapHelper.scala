package services.map.helper

import entity.{Point, Route, StartEndLocation}

object MapHelper {
  private val AVERAGE_RADIUS_OF_EARTH_M = 6371000

  private def calculateDistanceInMeter(userLocation: Point, warehouseLocation: Point): Double = {
    val latDistance = Math.toRadians(userLocation.lat - warehouseLocation.lat)
    val lngDistance = Math.toRadians(userLocation.lng - warehouseLocation.lng)
    val sinLat = Math.sin(latDistance / 2)
    val sinLng = Math.sin(lngDistance / 2)
    val a = sinLat * sinLat +
      (Math.cos(Math.toRadians(userLocation.lat)) *
        Math.cos(Math.toRadians(warehouseLocation.lat)) *
        sinLng * sinLng)
    val c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    AVERAGE_RADIUS_OF_EARTH_M * c
  }

  def findNearestRoutePointToPoint(destination: Point, route: Route): PointToDistance = {
    val routePoints: List[Point] = route.routeSteps ++ List(route.startLocation, route.endLocation)
    routePoints.map(point => (point, calculateDistanceInMeter(destination, point)))
      .sortBy(_._2)
      .map(d => PointToDistance(d._1, d._2))
      .head
  }

  def isSameDirection(originPath: StartEndLocation, validatedPath: StartEndLocation): Boolean = {
    val distStartToStart = calculateDistanceInMeter(originPath.startLocation, validatedPath.startLocation)
    val distEndToEnd = calculateDistanceInMeter(originPath.endLocation, validatedPath.endLocation)

    val distStartToEnd = calculateDistanceInMeter(originPath.startLocation, validatedPath.endLocation)
    val distEndToStart = calculateDistanceInMeter(originPath.endLocation, validatedPath.startLocation)
    distStartToStart + distEndToEnd < distStartToEnd + distEndToStart
  }

}

case class PointToDistance(point: Point, distanceMetres: Double)

