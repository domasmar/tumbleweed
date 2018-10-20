package controllers

import entity.DriverPath
import infrastructure.DriverPathService
import javax.inject.Inject
import play.api.mvc.{AbstractController, ControllerComponents}

import scala.concurrent.ExecutionContext

class DriverPathController @Inject()(
                                      cc: ControllerComponents,
                                      driverPathService: DriverPathService)
                                    (implicit ex: ExecutionContext) extends AbstractController(cc) with Mapper {

  def getDrivers(driverId: String) = Action.async { implicit request =>
    val all = driverPathService.getAll(driverId)
    all.map(a => Ok(mapper.writerWithDefaultPrettyPrinter().writeValueAsString(a)))
  }

  def save = Action { implicit request =>
    val maybePath = request.body.asJson.map(dv => mapper.readValue(dv.toString(), classOf[DriverPath]))


    maybePath.foreach { path =>
      driverPathService.save(path)
    }

    Ok("Good")
  }

}