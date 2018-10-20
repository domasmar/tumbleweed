package controllers

import entity.StartEndLocation
import javax.inject.{Inject, Singleton}
import play.api.mvc.{AbstractController, AnyContent, ControllerComponents, Request}
import services.map.api.GoogleDirectionsService
import services.passengers.PassengerService

import scala.concurrent.ExecutionContext

@Singleton
class PassengerController @Inject()(
                                     cc: ControllerComponents,
                                     passengerService: PassengerService
                                   )
                                   (implicit ex: ExecutionContext) extends AbstractController(cc) with Mapper {

  def getNearestDriverPaths() = Action { implicit request: Request[AnyContent] =>
    val maybeLocation = request.body.asJson.map(dv => mapper.readValue(dv.toString(), classOf[StartEndLocation]))


    maybeLocation.map(loc => passengerService.getNearestDriverRoads(loc.startLocation, loc.endLocation))
      .map(nearestRoutes => Ok(mapper.writerWithDefaultPrettyPrinter().writeValueAsString(nearestRoutes)))
      .getOrElse(NotFound("No nearest routes faund"))
  }

}
