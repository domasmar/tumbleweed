package map.model

import com.fasterxml.jackson.annotation.{JsonIgnoreProperties, JsonProperty}

case class RoutePoint(lat: Double, lng: Double) {
  override def toString: String = s"$lat,$lng"
}

case class Leg(@JsonProperty("start_location") startLocation: RoutePoint,
               @JsonProperty("end_location") endLocation: RoutePoint,
               steps: List[Section])

case class Section(@JsonProperty("start_location") startLocation: RoutePoint,
                   @JsonProperty("end_location") endLocation: RoutePoint)

case class RouteWrapper(routes: List[Route])

case class Route(legs: List[Leg])
