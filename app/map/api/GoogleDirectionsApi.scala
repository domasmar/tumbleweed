package map.api

import javax.inject.{Inject, Singleton}
import map.model.RoadPoint
import play.api.libs.ws.{WSClient, WSRequest}

import scala.concurrent.duration._

@Singleton
class GoogleDirectionsApi @Inject()(ws: WSClient) {

  private val baseUrl = "https://maps.googleapis.com/maps/api/directions/json"

  def getRoad(startLocation: RoadPoint, endLocation: RoadPoint) = {

    val request = ws.url(baseUrl)

    val complexRequest: WSRequest =
      request.addHttpHeaders("Accept" -> "application/json")
        .addQueryStringParameters("origin" -> "40.6781877,-73.9442203")
        .addQueryStringParameters("destination" -> "40.7282208,-73.79488019999999")
        .addQueryStringParameters("mode" -> "driving")
        .addQueryStringParameters("key" -> "AIzaSyBpDvGSJUey9dg2tTZURDcYSNPi35lp8Vs")
        .withRequestTimeout(10000.millis)
  }
}
