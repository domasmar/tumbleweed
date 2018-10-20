package controllers

import entity.Point
import javax.inject.{Inject, Singleton}
import play.api.mvc.{AbstractController, AnyContent, ControllerComponents, Request}
import services.map.api.GoogleDirectionsService

import scala.concurrent.ExecutionContext

@Singleton
class DirectionsController @Inject()(
                                      cc: ControllerComponents,
                                      directionsService: GoogleDirectionsService)
                                    (implicit ex: ExecutionContext) extends AbstractController(cc) with Mapper {

  def route() = Action { implicit request: Request[AnyContent] =>
    val maybeLocation = request.body.asJson.map(dv => mapper.readValue(dv.toString(), classOf[StartEndLocation]))
    maybeLocation.flatMap(loc => directionsService.getRoad(loc.startLocation, loc.endLocation))
      .map(route => Ok(mapper.writerWithDefaultPrettyPrinter().writeValueAsString(route)))
      .getOrElse(NotFound("route was not faund"))

  }


}

case class StartEndLocation(startLocation: Point, endLocation: Point)
