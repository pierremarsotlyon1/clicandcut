package main

import (
	"github.com/labstack/echo"
	"serveur_coiffure/src/controllers"
	"github.com/labstack/echo/middleware"
	"serveur_coiffure/src/metiers"
)

func main() {
	e := echo.New()

	//CORS
	e.Use(middleware.CORS())

	//Association des routes
	//Définition des controllers
	gerantController := &controllers.GerantController{}
	annonceController := &controllers.AnnonceController{}

	//Gerant Controller sans JWT
	e.POST("/login", gerantController.GetGerantByEmailAndPassword)
	e.POST("/register", gerantController.Add)

	//Définition de l'api de base avec restriction JWT
	api := e.Group("/api")
	api.Use(middleware.JWT([]byte(metiers.GetSecretJwt())))

	//Api pour le gérant
	gerantApi := api.Group("/gerant")
	gerantApi.GET("", gerantController.Profile)
	gerantApi.PUT("", gerantController.UpdateProfile)
	gerantApi.PUT("/password", gerantController.UpdatePassword)

	//Api pour les annonces
	annonceApi := api.Group("/annonce")
	annonceApi.GET("", annonceController.Find)
	annonceApi.GET("/:id", annonceController.Get)
	annonceApi.POST("", annonceController.Add)
	annonceApi.DELETE("/:id", annonceController.Delete)
	annonceApi.PUT("/:id", annonceController.Update)

	//Recherche des annonces par geolocation
	e.GET("/annonce/search/location", annonceController.SearchByLocation)

	e.Logger.Fatal(e.Start(":1324"))
}