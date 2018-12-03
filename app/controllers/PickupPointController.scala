package controllers

import entity.Point
import javax.inject.{Inject, Singleton}
import play.api.mvc.{AbstractController, AnyContent, ControllerComponents, Request}
import services.PickupPointService

import scala.concurrent.ExecutionContext

@Singleton
class PickupPointController @Inject()(
                                       cc: ControllerComponents,
                                       pickupPointService: PickupPointService)
                                     (implicit ex: ExecutionContext) extends AbstractController(cc) with Mapper {

  def getAll() = Action.async { implicit request: Request[AnyContent] =>
    val all = pickupPointService.getAll()
    all.map(a => Ok(mapper.writerWithDefaultPrettyPrinter().writeValueAsString(a)))
  }

  def get(lat: Double, long: Double, maxDistance: Double) = Action.async { implicit request: Request[AnyContent] =>
    val all = pickupPointService.getAll(Point(lat, long), maxDistance)
    all.map(a => Ok(mapper.writerWithDefaultPrettyPrinter().writeValueAsString(a)))
  }

}
