package metiers

import (
	"gopkg.in/olivere/elastic.v5"
	"serveur_coiffure/src/models"
	"errors"
	"serveur_coiffure/src/daos"
)

type AnnonceMetier struct {}

func (*AnnonceMetier) Get (client *elastic.Client, idGerant string, idAnnonce string) (*models.Annonce, error) {
	//On regarde si on a une connexion
	if client == nil {
		return nil, errors.New("Erreur lors de la connexion à notre base de donnée")
	}

	//On regarde si on a l'id du gérant
	if len(idGerant) == 0 {
		return nil, errors.New("Erreur lors de la récupération de votre identifiant")
	}

	if len(idAnnonce) == 0 {
		return nil, errors.New("Erreur lors de la récupération de l'identifiant de l'annonce")
	}

	//On récupère les annonces du gérant
	annonce, err := (&daos.AnnonceDao{}).Get(client, idGerant, idAnnonce)

	//On regarde si on a eu une erreur
	if err != nil {
		return nil, err
	}

	return annonce, nil
}

func (*AnnonceMetier) Find (client *elastic.Client, id string) ([]*models.Annonce, error) {
	//On regarde si on a une connexion
	if client == nil {
		return nil, errors.New("Erreur lors de la connexion à notre base de donnée")
	}

	//On regarde si on a l'id du gérant
	if len(id) == 0 {
		return nil, errors.New("Erreur lors de la récupération de votre identifiant")
	}

	//On récupère les annonces du gérant
	annonces, err := (&daos.AnnonceDao{}).Find(client, id)

	//On regarde si on a eu une erreur
	if err != nil {
		return nil, err
	}

	return annonces, nil
}

func (*AnnonceMetier) Add (client *elastic.Client, id string, annonce *models.Annonce) error {
	//On regarde si on a une connexion à la bdd
	if client == nil {
		return errors.New("Erreur lors de la connexion à notre base de donnée")
	}

	//On regarde si on a l'id du gérant
	if len(id) == 0 {
		return errors.New("Erreur lors de la récupération de votre identifiant")
	}

	//On regarde si on a bien bindé l'annonce
	if annonce == nil {
		return errors.New("Erreur lors de la récupération de votre annonce")
	}

	//Check des informations
	if annonce.Source.Location.Lat == 0.0 || annonce.Source.Location.Lon == 0.0 {
		return errors.New("Erreur lors de la récupération des coordonnées GPS")
	}

	if len(annonce.Source.Address) == 0 {
		return errors.New("Erreur lors de la récupération de votre adresse")
	}

	//On ajoute l'annonce
	if err := (&daos.AnnonceDao{}).Add(client, id, annonce); err != nil {
		return err
	}

	return nil
}

func (*AnnonceMetier) Delete (client *elastic.Client, idAnnonce string, idGerant string) error {
	//On regarde si on a une connexion à la base de donnée
	if client == nil {
		return errors.New("Erreur lors de la connexion à la base de donnée")
	}

	//On regarde si on a une idAnnonce
	if len(idAnnonce) == 0 {
		return errors.New("Erreur lors de la récupération de l'identifiant de l'annonce")
	}

	//On regarde si on a bien l'id gérant
	if len(idGerant) == 0 {
		return errors.New("Erreur lors de la récupération de votre identifiant")
	}

	//On supprime l'annonce
	if err := new(daos.AnnonceDao).Delete(client, idAnnonce, idGerant); err != nil {
		return err
	}

	return nil
}

func (*AnnonceMetier) Update (client *elastic.Client, idAnnonce string, idGerant string, newAnnonce *models.Annonce) error {
	//On regarde si on a une connexion à la base de donnée
	if client == nil {
		return errors.New("Erreur lors de la connexion à la base de donnée")
	}

	//On regarde si on a une idAnnonce
	if len(idAnnonce) == 0 {
		return errors.New("Erreur lors de la récupération de l'identifiant de l'annonce")
	}

	//On regarde si on a bien l'id gérant
	if len(idGerant) == 0 {
		return errors.New("Erreur lors de la récupération de votre identifiant")
	}

	//On regarde si on a une annonce
	if newAnnonce == nil {
		return errors.New("Erreur lors de la récupération des informations de votre annonce")
	}

	//On modifie l'annonce
	if err := new(daos.AnnonceDao).Update(client, idAnnonce, idGerant, newAnnonce); err != nil {
		return err
	}

	return nil
}

func (*AnnonceMetier) SearchByLocation (client *elastic.Client, searchAnnonce *models.SearchAnnonce) ([]*models.Annonce, error) {
	//On regarde si on a une connexion à la base de donnée
	if client == nil {
		return nil, errors.New("Erreur lors de la connexion à la base de donnée")
	}

	//On regarde si on a l'emplacement de recherche
	if searchAnnonce == nil {
		return nil, errors.New("Erreur lors de la récupération des coordonées GPS")
	}

	//On recherche les annonces
	annonces, err := new(daos.AnnonceDao).SearchByLocation(client, searchAnnonce)

	if err != nil {
		return nil, err
	}

	return annonces, nil
}