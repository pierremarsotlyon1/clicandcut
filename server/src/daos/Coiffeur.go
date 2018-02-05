package daos

import (
	"gopkg.in/olivere/elastic.v5"
	"serveur_coiffure/src/models"
	"encoding/json"
	"context"
	"errors"
)

type CoiffeurDao struct {}

func (*CoiffeurDao) GetByEmail(client *elastic.Client, email string) (*models.Gerant, error) {
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
