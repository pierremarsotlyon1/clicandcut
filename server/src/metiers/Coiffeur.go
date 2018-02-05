package metiers

import (
	"serveur_coiffure/src/models"
	"github.com/asaskevich/govalidator"
	"serveur_coiffure/src/daos"
	"golang.org/x/crypto/bcrypt"
	"gopkg.in/olivere/elastic.v5"
	"errors"
)

type CoiffeurMetier struct {}

func (*CoiffeurMetier) GetByEmailAndPassword (client *elastic.Client, login *models.Login) (*models.Coiffeur, error) {
	//On regarde si on a bien un pointer ur gerant
	if login == nil {
		return nil, errors.New("Erreur lors de la récupération de vos informations")
	}

	//On regare si on a le mot de passe
	if len(login.Password) == 0 {
		return nil, errors.New("Erreur lors de la récupération de votre mot de passe")
	}

	//On regarde si on a un email
	if len(login.Email) == 0 {
		return nil, errors.New("Erreur lors de la récupération de votre email")
	}

	//On regarde si c'est un email valide
	if !govalidator.IsEmail(login.Email) {
		return nil, errors.New("L'email n'est pas valide")
	}

	//Création du dao metier
	gerantDao := &daos.GerantDao{}

	//On récup le compte associé à l'email
	gerant, err := gerantDao.GetByEmail(client, login.Email)
	if err != nil {
		return nil, err
	}

	//On regarde si on a le mot de passe du gérant stocké en BDD
	if len(gerant.Source.Password) == 0 {
		return nil, errors.New("Erreur lors de la récupération de votre mot de passe dans notre base de donnée")
	}

	//On regarde si le password du gerant = passwordHash => sinon problème
	if err := bcrypt.CompareHashAndPassword([]byte(gerant.Source.Password), []byte(login.Password)); err != nil {
		return nil, errors.New("Erreur lors de la récupération de votre compte")
	}

	return nil, nil
}
