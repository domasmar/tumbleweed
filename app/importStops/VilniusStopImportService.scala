package importStops

import com.fasterxml.jackson.databind.{DeserializationFeature, ObjectMapper}
import com.fasterxml.jackson.module.scala.DefaultScalaModule
import com.fasterxml.jackson.module.scala.experimental.ScalaObjectMapper
import entity.{PickupPoint, Point}
import infrastructure.persistance.PickupPointDao
import javax.inject.Inject
import play.api.Logger

class VilniusStopImportService @Inject()() {

  private val mapper = new ObjectMapper() with ScalaObjectMapper
  mapper.registerModule(DefaultScalaModule)
  mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)

  @Inject
  def init(pickupPointDao: PickupPointDao)= {
    val dataUri = this.getClass.getClassLoader.getResource("data/vilnius_stops.json")
    val stopsData = mapper.readValue(dataUri, classOf[StopsData])

    val stops = stopsData.features.map { stop =>
      PickupPoint("VilniusStop", stop.properties.name, Point(stop.geometry.coordinates(1), stop.geometry.coordinates(0)))
    }

    pickupPointDao.deleteByType("VilniusStop")
    pickupPointDao.save(stops)

    Logger.info(s"$stopsData")

  }

}
