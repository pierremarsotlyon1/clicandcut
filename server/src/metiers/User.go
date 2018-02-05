package metiers

import (
	"gopkg.in/olivere/elastic.v5"
	"serveur_coiffure/src/daos"
)

type UserMetier struct {}

func (*UserMetier) UserExist (client *elastic.Client, email string) (bool, error) {
	exist, err := daos.UserExist(client, email)
	if err != nil {
		return true, err
	}

	return exist, nil
}