package infrastructure

import entity.{PickupPoint, Point}
import infrastructure.persistance.PickupPointDao
import javax.inject.Inject

import scala.concurrent.{ExecutionContext, Future}

class PickupPointService @Inject ()(pickupPointDao: PickupPointDao)(implicit ec: ExecutionContext) {

  def getAll(): Future[List[PickupPoint]] = {
    pickupPointDao.getAll()
  }

  def getAll(point: Point, maxDistance: Double): Future[List[PickupPoint]] = {
    pickupPointDao.getAll().map { points =>
      points
        .filter(pickupPoint => Point.distance(point, pickupPoint.point) <= maxDistance)
    }
  }

}
