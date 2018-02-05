package daos

import (
	"serveur_coiffure/src/models"
	"context"
	"gopkg.in/olivere/elastic.v5"
	"encoding/json"
	"errors"
)

type GerantDao struct{}

func (*GerantDao) Add(client *elastic.Client, gerant *models.Gerant) error {
	ctx := context.Background()

	//On crée le compte
	response, err := client.Index().
		Index(index).
		Type("gerant").
		BodyJson(gerant.Source).
		Refresh("true").
		Do(ctx)

	if err != nil || response == nil || !response.Created {
		// Handle error
		return errors.New("Erreur lors de la création de votre compte")
	}

	//On set à l'objet les nouveaux paramètres
	gerant.Id = response.Id
	gerant.Version = response.Version
	gerant.Index = response.Index
	gerant.Type = response.Type

	return nil
}

func (*GerantDao) GetByEmail(client *elastic.Client, email string) (*models.Gerant, error) {
	ctx := context.Background()

	//Création de la query globale
	query := elastic.NewMatchQuery("email", email)

	//On recherche le compte
	results, err := client.Search().
		Index(index).
		Type("gerant").
		Query(query).
		Do(ctx)

	//Check des erreurs
	if results == nil || err != nil {
		return nil, errors.New("Erreur lors de la récupération de votre compte")
	}

	if results.Hits.TotalHits == 0 {
		return nil, errors.New("Aucun compte ne correspond à ces identifiants")
	}

	if results.Hits.TotalHits > 1 {
		return nil, errors.New("Erreur lors de la récupération de votre compte")
	}

	//On récup le premier compte
	user_account_pretty := results.Hits.Hits[0]
	user_account := new(models.Gerant)

	bytes, err := json.Marshal(user_account_pretty)

	//On parse le json en objet
	err_unmarshal := json.Unmarshal(bytes, &user_account)
	if err_unmarshal != nil {
		return nil, errors.New("Erreur lors de la récupération de votre compte")
	}

	return user_account, nil
}

func (*GerantDao) Get(client *elastic.Client, id string) (*models.Gerant, error) {
	ctx := context.Background()

	//On recherche le compte
	results, err := client.Get().
		Index(index).
		Type("gerant").
		Id(id).
		Do(ctx)

	if err != nil || results == nil {
		return nil, errors.New("Erreur lors de la récupération de votre compte")
	}

	//Création de l'objet réponse
	gerant := &models.Gerant{}

	//On Marshal l'objet elastic
	gerantUnmarshal, err := json.Marshal(results)

	//On regarde si il y a une erreur pendant le Marshal
	if err != nil || gerantUnmarshal == nil {
		return nil, errors.New("Erreur lors de la récupération de votre compte")
	}

	if err := json.Unmarshal(gerantUnmarshal, gerant); err != nil {
		return nil, errors.New("Erreur lors de la récupération de votre compte")
	}

	return gerant, nil
}

func (*GerantDao) UpdateProfile(client *elastic.Client, id string, newGerant *models.Gerant) (bool, error) {
	ctx := context.Background()

	update, err := client.Update().
		Index(index).
		Type("gerant").
		Id(id).
		Script(elastic.NewScriptInline(
		"ctx._source.nom = params.nom; " +
		"ctx._source.prenom = params.prenom; " +
		"ctx._source.siret = params.siret; ").
		Lang("painless").
		Param("nom", newGerant.Source.Nom).
		Param("prenom", newGerant.Source.Prenom).
		Param("siret", newGerant.Source.Siret)).
		Do(ctx)

	if err != nil || update == nil {
		return false, errors.New("Erreur lors de la mise à jour de vos informations")
	}

	return true, nil
}

func (*GerantDao) UpdatePassword (client *elastic.Client, idGerant string, newPassword string) error {
	ctx := context.Background()

	update, err := client.Update().
		Index(index).
		Type("gerant").
		Id(idGerant).
		Script(elastic.NewScriptInline("ctx._source.password = params.password;").
		Lang("painless").
		Param("password", newPassword)).
		Do(ctx)

	if err != nil || update == nil {
		return errors.New("Erreur lors de la mise à jour de vos informations")
	}

	return nil
}