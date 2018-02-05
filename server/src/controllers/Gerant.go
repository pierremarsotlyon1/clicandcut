package controllers

import (
	"github.com/labstack/echo"
	"net/http"
	"serveur_coiffure/src/metiers"
	"serveur_coiffure/src/models"
	"serveur_coiffure/src/tools"
)

type GerantController struct{}

func (*GerantController) UpdatePassword(c echo.Context) error {
	//Récupération du Token
	jwtToken := &metiers.JwtMetier{}
	idGerant := jwtToken.GetTokenByContext(c)

	//On regarde si on a le token
	if len(idGerant) == 0 {
		return c.JSON(404, models.JsonErrorResponse{Error: "Erreur lors de la récupération de votre token"})
	}

	//On bind les params
	updatePassword := &models.UpdatePassword{}
	err := c.Bind(updatePassword)

	//On regarde si on a eu une erreur lors du bind
	if err != nil {
		return c.JSON(404, models.JsonErrorResponse{Error: "Erreur lors de la récupération de vos mot de passe"})
	}

	//Création du client elasticsearch
	client := tools.CreateElasticsearchClient()
	if client == nil {
		return c.JSON(403, models.JsonErrorResponse{Error: "Erreur lors de la connexion à notre base de donnée"})
	}

	if err := (&metiers.GerantMetier{}).UpdatePassword(client, idGerant, updatePassword); err != nil {
		return c.JSON(403, models.JsonErrorResponse{Error:err.Error()})
	}

	return c.NoContent(200)
}

func (*GerantController) UpdateProfile(c echo.Context) error {
	//Récupération du Token
	jwtToken := &metiers.JwtMetier{}
	idGerant := jwtToken.GetTokenByContext(c)

	//On regarde si on a le token
	if len(idGerant) == 0 {
		return c.JSON(404, models.JsonErrorResponse{Error: "Erreur lors de la récupération de votre token"})
	}

	//On bind les params
	newGerant := &models.Gerant{}
	err := c.Bind(newGerant)

	//On regarde si on a eu une erreur lors du bind
	if err != nil {
		return c.JSON(404, models.JsonErrorResponse{Error: "Erreur lors de la récupération de votre profil"})
	}

	//Création du client elasticsearch
	client := tools.CreateElasticsearchClient()
	if client == nil {
		return c.JSON(403, models.JsonErrorResponse{Error: "Erreur lors de la connexion à notre base de donnée"})
	}

	gerant, err := (&metiers.GerantMetier{}).UpdateProfile(client, idGerant, newGerant)

	if err != nil {
		return c.JSON(403, models.JsonErrorResponse{Error:err.Error()})
	}

	return c.JSON(200, gerant)
}

func (*GerantController) Profile(c echo.Context) error {

	//Récupération du Token
	jwtToken := &metiers.JwtMetier{}
	idGerant := jwtToken.GetTokenByContext(c)

	//On regarde si on a le token
	if len(idGerant) == 0 {
		return c.JSON(404, models.JsonErrorResponse{Error: "Erreur lors de la récupération de votre token"})
	}

	//Création du client
	client := tools.CreateElasticsearchClient()
	if client == nil {
		return c.JSON(403, models.JsonErrorResponse{Error: "Erreur lors de la connexion à notre base de donnée"})
	}

	//Récupération du gérant
	gerant, err := (&metiers.GerantMetier{}).Get(client, idGerant)

	//On regarde si on a une erreur
	if err != nil {
		return c.JSON(403, models.JsonErrorResponse{Error: err.Error()})
	}

	//On regarde si on a un gérant
	if gerant == nil {
		return c.JSON(404, models.JsonErrorResponse{Error: "Erreur lors de la récupération de votre compte"})
	}

	return c.JSON(200, gerant)
}

func (*GerantController) Add(c echo.Context) (err error) {

	//Création du client
	client := tools.CreateElasticsearchClient()
	if client == nil {
		return c.JSON(403, models.JsonErrorResponse{Error: "Erreur lors de la connexion à notre base de donnée"})
	}

	//Création et Bind du gérant
	registerGerant := new(models.RegisterGerant)
	if err = c.Bind(registerGerant); err != nil {
		return c.JSON(403, models.JsonErrorResponse{Error: "Erreur lors de la récupération des informations"})
	}

	//Création de l'objet metier
	gerantMetier := &metiers.GerantMetier{}

	//On ajoute en BDD
	gerant, err := gerantMetier.Add(client, registerGerant)
	if err != nil {
		return c.JSON(404, models.JsonErrorResponse{Error: err.Error()})
	}

	//On regarde si on a bien le gérant
	if gerant == nil {
		return c.JSON(403, models.JsonErrorResponse{Error: "Erreur lors de la création de votre compte"})
	}

	//Création du token
	m := &metiers.JwtMetier{}
	token, err := m.Encode(gerant)

	//On regarde si on a une erreur lors de la génération du token
	if err != nil {
		return c.JSON(http.StatusBadRequest, models.JsonErrorResponse{Error: err.Error()})
	}

	return c.JSON(http.StatusOK, models.Token{Token: token.Token})
}

func (*GerantController) GetGerantByEmailAndPassword(c echo.Context) error {
	//Création du client
	client := tools.CreateElasticsearchClient()
	if client == nil {
		return c.JSON(403, models.JsonErrorResponse{Error: "Erreur lors de la connexion à notre base de donnée"})
	}

	//On récupère les informations via le BIND
	login := new(models.Login)

	if err := c.Bind(login); err != nil {
		return c.JSON(404, models.JsonErrorResponse{Error: "Erreur lors de la récupération des informations"})
	}

	//Création de l'objet metier
	gerantMetier := &metiers.GerantMetier{}

	//On récupère le compte
	gerant, err := gerantMetier.GetByEmailAndPassword(client, login)
	if err != nil {
		return c.JSON(http.StatusBadRequest, models.JsonErrorResponse{Error: err.Error()})
	}

	//On regarde si on a bien un compte
	if gerant == nil {
		return c.JSON(http.StatusBadRequest, models.JsonErrorResponse{Error: "Erreur lors de la récupération de votre compte"})
	}

	//Création du token
	m := &metiers.JwtMetier{}
	token, err := m.Encode(gerant)

	//On regarde si on a une erreur lors de la génération du token
	if err != nil {
		return c.JSON(http.StatusBadRequest, models.JsonErrorResponse{Error: err.Error()})
	}

	return c.JSON(http.StatusOK, models.Token{Token: token.Token})
}
