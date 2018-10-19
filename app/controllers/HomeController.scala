package controllers

import javax.inject._
import map.api.GoogleDirectionsApi
import map.model.RoutePoint
import play.api.mvc._

/**
  * This controller creates an `Action` to handle HTTP requests to the
  * application's home page.
  */
@Singleton
class HomeController @Inject()(cc: ControllerComponents, gapi: GoogleDirectionsApi) extends AbstractController(cc) {

  def index() = Action { implicit request: Request[AnyContent] =>

    gapi.getRoad(RoutePoint(40.6781877, -73.9442203), RoutePoint(40.7282208, -73.79488019999999))
    Ok(views.html.index())
  }
}
