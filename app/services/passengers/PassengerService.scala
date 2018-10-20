package services.passengers

import entity._
import infrastructure.DriverPathService
import javax.inject.{Inject, Singleton}
import services.map.helper.MapHelper

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class PassengerService @Inject()(implicit ec: ExecutionContext, driverPathService: DriverPathService) {

  private val DEFAULT_MAX_DISTANCE_M = 300


  def getNearestDriverRoads(startLocation: Point, endLocation: Point): Future[List[NearestDriverView]] = {
    driverPathService.getAllPaths
      .map(paths => getNearestRoutes(startLocation, endLocation, paths))
  }

  private def getNearestRoutes(startLocation: Point, endLocation: Point, allRoutes: List[DriverPath]): List[NearestDriverView] = {

    val nearestViews: List[NearestDriverView] =
      allRoutes
        .filterNot(_.hidden)
        .map(path => (DriverInfo(path.driverId, path.carId), path.route))
        .map {
          case (driverInfo, route) =>
            val shortestDistanceToStart = MapHelper.findNearestRoutePointToPoint(startLocation, route)
            val shortestDistanceToEnd = MapHelper.findNearestRoutePointToPoint(endLocation, route)
            NearestDriverView(driverInfo, shortestDistanceToStart.distanceMetres.toInt, shortestDistanceToEnd.distanceMetres.toInt)
        }

    nearestViews
      .filter(r => r.distFromEndLocation < DEFAULT_MAX_DISTANCE_M && r.distFromStartLocation < DEFAULT_MAX_DISTANCE_M)
      .sortBy(r => r.distFromStartLocation + r.distFromEndLocation)
  }
}
