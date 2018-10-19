package map.api

import akka.util.Timeout
import com.fasterxml.jackson.databind.{DeserializationFeature, ObjectMapper}
import com.fasterxml.jackson.module.scala.DefaultScalaModule
import javax.inject.{Inject, Singleton}
import map.model.{RoutePoint, RouteWrapper}
import play.api.Configuration
import play.api.libs.ws.{WSClient, WSRequest, WSResponse}

import scala.concurrent.duration._
import scala.concurrent.{Await, Future}

@Singleton
class GoogleDirectionsApi @Inject()(ws: WSClient, config: Configuration) {

  implicit val responseTimeout: Duration = Timeout(5 seconds).duration

  val mapper = new ObjectMapper()
  mapper.registerModule(DefaultScalaModule)
  mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)

  private val directionsApiUrl = "https://maps.googleapis.com/maps/api/directions/json"

  private val apiKey: String = config.get[String]("google.api.key")

  private def buildDirectionsRequest(): WSRequest = {
    ws.url(directionsApiUrl)
      .addHttpHeaders("Accept" -> "application/json")
      .addQueryStringParameters("mode" -> "driving")
      .addQueryStringParameters("key" -> apiKey)
      .withRequestTimeout(responseTimeout)
  }


  def getRoad(startLocation: RoutePoint, endLocation: RoutePoint): RouteWrapper = {

    val complexRequest: WSRequest = buildDirectionsRequest()
      .addQueryStringParameters("origin" -> startLocation.toString)
      .addQueryStringParameters("destination" -> endLocation.toString)

    val futureResponse: Future[WSResponse] = complexRequest.get()
    val resp: WSResponse = Await.result(futureResponse, responseTimeout)
    mapper.readValue(resp.json.toString(), classOf[RouteWrapper])
  }


}
