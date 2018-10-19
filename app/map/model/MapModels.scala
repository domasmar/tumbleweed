package map.model

case class RoadPoint(lat: Double, lng: Double)

case class Road(startEndLocation: Section,
                steps: List[Section])

case class Section(startLocation: RoadPoint,
                   endLocation: RoadPoint)

//https://maps.googleapis.com/maps/api/directions/json?origin=40.6781877,-73.9442203&destination=40.7282208,-73.79488019999999&mode=transit&key=AIzaSyBpDvGSJUey9dg2tTZURDcYSNPi35lp8Vs
