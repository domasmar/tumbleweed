package importStops

import com.google.inject.AbstractModule

class VilniusStopImportModule extends AbstractModule {
  override def configure(): Unit = {
    bind(classOf[VilniusStopImportService]).asEagerSingleton
  }
}
