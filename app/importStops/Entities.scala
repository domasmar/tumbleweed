package importStops

import com.fasterxml.jackson.annotation.JsonProperty


case class StopsData(`type`: String, features: List[Stop])

case class Stop(`type`: String, properties: StopProperties, geometry: StopGeometry)

case class StopProperties(@JsonProperty("OBJECTID") objectId: Int,
                          @JsonProperty("PAVADIN") name: String,
                          @JsonProperty("GATVE") street: Option[String])

case class StopGeometry(`type`: String,
                        coordinates: List[Double])
