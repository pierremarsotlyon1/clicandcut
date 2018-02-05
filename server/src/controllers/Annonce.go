package controllers

import (
	"github.com/labstack/echo"
	"serveur_coiffure/src/metiers"
	"serveur_coiffure/src/models"
	"serveur_coiffure/src/tools"
	"net/http"
)

type AnnonceController struct{}

func (*AnnonceController) Get(c echo.Context) error {
	//Récupération du Token
	jwtToken := &metiers.JwtMetier{}
	idGerant := jwtToken.GetTokenByContext(c)

	//On regarde si on a bien récupéré l'id du gérant
	if len(idGerant) == 0 {
		return c.JSON(403, models.JsonErrorResponse{Error: "Erreur lors de la récupération de votre identifiant"})
	}

	//On regarde si on a bien l'id de l'annonce
	idAnnonce := c.Param("id")
	if len(idAnnonce) == 0 {
		return c.JSON(403, models.JsonErrorResponse{Error: "Erreur lors de la récupération de l'identifiant de l'annonce"})
	}

	//Création du client
	client := tools.CreateElasticsearchClient()

	//On récup les annonces du gérant
	annonce, err := (&metiers.AnnonceMetier{}).Get(client, idGerant, idAnnonce)

	if err != nil {
		return c.JSON(403, models.JsonErrorResponse{Error: err.Error()})
	}

	return c.JSON(200, annonce)
}

func (*AnnonceController) Find(c echo.Context) error {
	//Récupération du Token
	jwtToken := &metiers.JwtMetier{}
	idGerant := jwtToken.GetTokenByContext(c)

	//On regarde si on a bien récupéré l'id du gérant
	if len(idGerant) == 0 {
		return c.JSON(403, models.JsonErrorResponse{Error: "Erreur lors de la récupération de votre identifiant"})
	}

	//Création du client
	client := tools.CreateElasticsearchClient()

	//On récup les annonces du gérant
	annonces, err := (&metiers.AnnonceMetier{}).Find(client, idGerant)

	if err != nil {
		return c.JSON(403, models.JsonErrorResponse{Error: err.Error()})
	}

	return c.JSON(200, annonces)
}

func (*AnnonceController) Add(c echo.Context) error {
	//Récupération du Token
	jwtToken := &metiers.JwtMetier{}
	idGerant := jwtToken.GetTokenByContext(c)

	//On regarde si on a bien récupéré l'id du gérant
	if len(idGerant) == 0 {
		return c.JSON(403, models.JsonErrorResponse{Error: "Erreur lors de la récupération de votre identifiant"})
	}

	//On bind l'annonce
	annonce := new(models.Annonce)
	if err := c.Bind(annonce); err != nil {
		return c.JSON(403, models.JsonErrorResponse{Error: "Erreur lors de la récupération des informations de l'annonce"})
	}

	//Création du client
	client := tools.CreateElasticsearchClient()

	//On ajoute l'annonce
	if err := (&metiers.AnnonceMetier{}).Add(client, idGerant, annonce); err != nil {
		return c.JSON(403, models.JsonErrorResponse{Error: err.Error()})
	}

	return c.JSON(200, annonce)
}

func (*AnnonceController) Delete(c echo.Context) error {
	//Récupération du Token
	jwtToken := &metiers.JwtMetier{}
	idGerant := jwtToken.GetTokenByContext(c)

	//On regarde si on a bien récupéré l'id du gérant
	if len(idGerant) == 0 {
		return c.JSON(403, models.JsonErrorResponse{Error: "Erreur lors de la récupération de votre identifiant"})
	}

	//On regarde si on a bien l'id de l'annonce
	idAnnonce := c.Param("id")
	if len(idAnnonce) == 0 {
		return c.JSON(403, models.JsonErrorResponse{Error: "Erreur lors de la récupération de l'identifiant de l'annonce"})
	}

	//Création du client
	client := tools.CreateElasticsearchClient()

	if err := new(metiers.AnnonceMetier).Delete(client, idAnnonce, idGerant); err != nil {
		return c.JSON(403, models.JsonErrorResponse{Error: err.Error()})
	}

	return c.NoContent(http.StatusOK)
}

func (*AnnonceController) Update (c echo.Context) error {
	//Récupération du Token
	jwtToken := &metiers.JwtMetier{}
	idGerant := jwtToken.GetTokenByContext(c)

	//On regarde si on a bien récupéré l'id du gérant
	if len(idGerant) == 0 {
		return c.JSON(403, models.JsonErrorResponse{Error: "Erreur lors de la récupération de votre identifiant"})
	}

	//On regarde si on a bien l'id de l'annonce
	idAnnonce := c.Param("id")
	if len(idAnnonce) == 0 {
		return c.JSON(403, models.JsonErrorResponse{Error: "Erreur lors de la récupération de l'identifiant de l'annonce"})
	}

	//On récupère les nouvelles informations de l'annonce
	newAnnonce := new(models.Annonce)
	if err := c.Bind(newAnnonce); err != nil {
		return c.JSON(403, models.JsonErrorResponse{Error:"Erreur lors de la récupération des informations de l'annonce"})
	}

	//Création du client
	client := tools.CreateElasticsearchClient()

	//Update de l'annonce
	if err := new(metiers.AnnonceMetier).Update(client, idAnnonce, idGerant, newAnnonce); err != nil {
		return c.JSON(403, models.JsonErrorResponse{Error: err.Error()})
	}

	return c.NoContent(200)
}

func (*AnnonceController) SearchByLocation (c echo.Context) error {
	//On récup la location
	searchAnnonce := new(models.SearchAnnonce)
	if err := c.Bind(searchAnnonce); err != nil {
		return c.JSON(403, models.JsonErrorResponse{Error: "Erreur lors de la récupération du lieu"})
	}

	//Création du client
	client := tools.CreateElasticsearchClient()

	annonces, err := new(metiers.AnnonceMetier).SearchByLocation(client, searchAnnonce)

	if err != nil {
		return c.JSON(403, models.JsonErrorResponse{Error: err.Error()})
	}

	return c.JSON(200, annonces)
}