package controllers

import entity.StartEndLocation
import javax.inject.{Inject, Singleton}
import play.api.libs.json.Json
import play.api.mvc._
import services.map.api.GoogleDirectionsService
import services.passengers.PassengerService

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class PassengerController @Inject()(
                                     cc: ControllerComponents,
                                     passengerService: PassengerService
                                   )
                                   (implicit ex: ExecutionContext) extends AbstractController(cc) with Mapper {

  def getNearestDriverPaths = Action.async { implicit request: Request[AnyContent] =>

    if (!request.hasBody) {
      BadRequest("Body not faund")
    }

    val maybeLocation = request.body.asJson.map(dv => mapper.readValue(dv.toString(), classOf[StartEndLocation]))
    val loc = maybeLocation.get
    passengerService.getNearestDriverRoads(loc.startLocation, loc.endLocation)
      .map(nearestRoutes => Ok(mapper.writerWithDefaultPrettyPrinter().writeValueAsString(nearestRoutes)))
  }

}
