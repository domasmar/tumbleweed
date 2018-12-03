package chat

import chat.actors.ChatServiceActor
import com.google.inject.AbstractModule
import play.api.libs.concurrent.AkkaGuiceSupport

class ChatModule extends AbstractModule with AkkaGuiceSupport {
  override def configure(): Unit = {
    bindActor[ChatServiceActor]("chat-service-actor")
  }
}
