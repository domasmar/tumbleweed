
name := """tubmbleweed"""
organization := "com.ednax"

version := "1.0-SNAPSHOT"

lazy val tubmbleweed = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.12.6"

libraryDependencies += guice
libraryDependencies += ws
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "3.1.2" % Test
// https://mvnrepository.com/artifact/com.typesafe.play/play-json
libraryDependencies += "com.typesafe.play" %% "play-json" % "2.6.10"
// https://mvnrepository.com/artifact/org.mongodb.scala/mongo-scala-driver
libraryDependencies += "org.mongodb.scala" %% "mongo-scala-driver" % "2.4.2"
libraryDependencies += "com.fasterxml.jackson.module" %% "jackson-module-scala" % "2.9.7"



// Adds additional packages into Twirl
//TwirlKeys.templateImports += "com.ednax.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "com.ednax.binders._"
