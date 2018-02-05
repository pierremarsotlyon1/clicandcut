package daos

import (
	"gopkg.in/olivere/elastic.v5"
	"golang.org/x/net/context"
	"errors"
)

func UserExist (client *elastic.Client, email string) (bool, error) {
	ctx := context.Background()
	emailMatchQuery := elastic.NewMatchQuery("email", email)

	query := elastic.NewBoolQuery().Must(emailMatchQuery)
	response, err := client.Search().
		Index(index).
		Type("gerant", "coiffeur").
		Query(query).
		Size(1).
		Pretty(true).
		Do(ctx)

	if err != nil || response == nil {
		return false, errors.New("Erreur lors de la requête")
	}

	if response.Hits == nil {
		return false, errors.New("Erreur lors de la requête")
	}

	return response.Hits.TotalHits > 0, nil
}
