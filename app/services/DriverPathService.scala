package services

import entity.{DriverPath, DriverPathView}
import infrastructure.persistance.DriverPathDao
import javax.inject.Inject

import scala.concurrent.{ExecutionContext, Future}

class DriverPathService @Inject()(driverPathDao: DriverPathDao)(implicit ec: ExecutionContext) {
  def delete(routeId: String): Unit = {
    driverPathDao.delete(routeId)
  }

  def save(path: DriverPath): Unit = {
    driverPathDao.save(List(path))
  }


  def getByRouteId(routeId: String): Future[DriverPath] = {
    driverPathDao.getById(routeId)
  }

  def getAll(driverId: String): Future[List[DriverPathView]] = {
    driverPathDao.getByDriver(driverId)
      .map(paths => paths.map(DriverPathView(_)))
  }

  def getAllPaths: Future[List[DriverPath]] = driverPathDao.getAll()

  def updatePathStatus(routeId: String, hide: Boolean): Unit = driverPathDao.updatePathStatus(routeId, hide)
}
