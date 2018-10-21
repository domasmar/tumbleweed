package controllers

import entity.StartEndLocation
import infrastructure.DriverPathService
import javax.inject.{Inject, Singleton}
import play.api.mvc.{AbstractController, AnyContent, ControllerComponents, Request}
import services.map.api.GoogleDirectionsService

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class DirectionsController @Inject()(
                                      cc: ControllerComponents,
                                      directionsService: GoogleDirectionsService,
                                      driverPathService: DriverPathService)
                                    (implicit ex: ExecutionContext) extends AbstractController(cc) with Mapper {

  def route() = Action { implicit request: Request[AnyContent] =>
    val maybeLocation = request.body.asJson.map(dv => mapper.readValue(dv.toString(), classOf[StartEndLocation]))
    maybeLocation.flatMap(loc => directionsService.getRoad(loc.startLocation, loc.endLocation))
      .map(route => Ok(mapper.writerWithDefaultPrettyPrinter().writeValueAsString(route)))
      .getOrElse(NotFound("route was not faund"))
  }


  def routeDelete(routeId: String) = Action.async { implicit request: Request[AnyContent] =>
    driverPathService.delete(routeId)
    Future.successful(Ok("deleted"))
  }

  def routeGet(routeId: String) = Action.async { implicit request: Request[AnyContent] =>
    driverPathService.getByRouteId(routeId).map { route =>
      Ok(mapper.writerWithDefaultPrettyPrinter().writeValueAsString(route))
    }
  }


}
