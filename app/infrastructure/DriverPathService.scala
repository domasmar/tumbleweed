package infrastructure

import entity.DriverPath
import infrastructure.persistance.DriverPathDao
import javax.inject.Inject

import scala.concurrent.{ExecutionContext, Future}

class DriverPathService @Inject()(driverPathDao: DriverPathDao)(implicit ec: ExecutionContext) {

  def save(path: DriverPath): Unit = {
    driverPathDao.save(List(path))
  }


  def getAll(driverId: String): Future[List[DriverPath]] = {
    driverPathDao.getByDriver(driverId)
  }

  def getAllPaths: Future[List[DriverPath]] = driverPathDao.getAll()

}
