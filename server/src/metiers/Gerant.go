package metiers

import (
	"serveur_coiffure/src/models"
	"serveur_coiffure/src/daos"
	"gopkg.in/olivere/elastic.v5"
	"github.com/asaskevich/govalidator"
	"golang.org/x/crypto/bcrypt"
	"errors"
)

type GerantMetier struct {}

func (*GerantMetier) UpdatePassword (client *elastic.Client, idGerant string, updatePassword *models.UpdatePassword) error {
	//On regarde si on a la connexion à la base de donnée
	if client == nil {
		return errors.New("Erreur lors de la connexion à notre base de donnée")
	}

	//On regarde si on à l'id du gérant
	if len(idGerant) == 0 {
		return errors.New("Erreur lors de la récupération de votre identifiant")
	}

	//On regarde si on a les nouvelles données
	if updatePassword == nil {
		return errors.New("Erreur lors de la récupération du nouveau mot de passe")
	}

	//On regarde si on a les mots de passe
	if len(updatePassword.NewPassword) == 0 {
		return errors.New("Erreur lors de la récupération du nouveau mot de passe")
	}

	if len(updatePassword.ConfirmNewPassword) == 0 {
		return errors.New("Erreur lors de la récupération de la confirmation du mot de passe")
	}

	//On regarde si les mot de passe sont identiques
	if updatePassword.NewPassword != updatePassword.ConfirmNewPassword {
		return errors.New("Vos mots de passe doivent être identique")
	}

	//On hash le mot de passe
	passwordHash, err := bcrypt.GenerateFromPassword([]byte(updatePassword.NewPassword), bcrypt.DefaultCost)
	if err != nil {
		return errors.New("Erreur lors de la sécurisation de votre mot de passe")
	}

	if err := new(daos.GerantDao).UpdatePassword(client, idGerant, string(passwordHash)); err != nil {
		return err
	}

	return nil
}

func (gerantMetier *GerantMetier) UpdateProfile (client *elastic.Client, id string, newGerant *models.Gerant) (*models.Gerant, error) {
	//On regarde si on a la connexion à la base de donnée
	if client == nil {
		return nil, errors.New("Erreur lors de la connexion à notre base de donnée")
	}

	//On regarde si on à l'id du gérant
	if len(id) == 0 {
		return nil, errors.New("Erreur lors de la récupération de votre identifiant")
	}

	//On regarde si on a les nouvelles données
	if newGerant == nil {
		return nil, errors.New("Erreur lors de la récupération des nouvelles informations")
	}

	//On update le profil
	updated, err := (&daos.GerantDao{}).UpdateProfile(client, id, newGerant)

	//On regarde si on a eu une erreur
	if err != nil {
		return nil, err
	}

	if !updated {
		return nil, errors.New("Erreur lors de la mise à jour de votre profil")
	}

	//On récupère le nouveau profil
	gerant, err := gerantMetier.Get(client, id)

	if err != nil {
		return nil, err
	}

	return gerant, nil
}

func (*GerantMetier) Get (client *elastic.Client, id string) (*models.Gerant, error) {
	if len(id) == 0 {
		return nil, errors.New("Erreur lors de la récupération de votre identifiant")
	}

	return (&daos.GerantDao{}).Get(client, id)
}

func (*GerantMetier) Add(client *elastic.Client, registerGerant *models.RegisterGerant) (*models.Gerant, error) {

	//On regarde si on a la struct
	if registerGerant == nil {
		return nil, errors.New("Erreur lors de la récupération de vos informations")
	}

	//On regarde si on a un email
	if len(registerGerant.Email) == 0 {
		return nil, errors.New("Erreur lors de la récupération de l'email")
	}

	//On regarde si c'est un email valide
	if !govalidator.IsEmail(registerGerant.Email) {
		return nil, errors.New("L'email n'est pas au bon format")
	}

	//On regarde si on a pas déjà un user avec ces infos
	userMetier := &UserMetier{}
	exist, err := userMetier.UserExist(client, registerGerant.Email)

	if err != nil {
		return nil, errors.New("Erreur lors de la vérification si un compte avec cet email existe déjà")
	}

	if exist {
		return nil, errors.New("Un compte avec ces identifiant existe déjà")
	}

	//On regarde si on a un password
	if len(registerGerant.Password) == 0 {
		return nil, errors.New("Erreur lors de la récupération de votre mot de passe")
	}

	//On regarde si on a la confirmation du mot de passe
	if len(registerGerant.ConfirmPassword) == 0 {
		return nil, errors.New("Erreur lors de la récupération de la confirmation du mot de passe")
	}

	//On regarde si le mot de passe == confirm password
	if registerGerant.Password != registerGerant.ConfirmPassword {
		return nil, errors.New("Votre mot de passe doit être identique à la confirmation du mot de passe")
	}

	//On hash le mot de passe
	passwordHash, err := bcrypt.GenerateFromPassword([]byte(registerGerant.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, errors.New("Erreur lors de la sécurisation de votre mot de passe")
	}

	//Création du pointer gerant
	gerant := new(models.Gerant)

	//Association des valeurs
	gerant.Source.Email = registerGerant.Email
	gerant.Source.Nom = registerGerant.Nom
	gerant.Source.Prenom = registerGerant.Prenom
	gerant.Source.Siret = registerGerant.Siret
	gerant.Source.Password = string(passwordHash)

	//Création du dao metier
	gerantDao := &daos.GerantDao{}

	//On crée le compte gérant
	err = gerantDao.Add(client, gerant)

	//Check si erreur
	if err != nil {
		return nil, err
	}

	if gerant == nil {
		return nil, errors.New("Erreur lors de la création de votre compte")
	}

	return gerant, nil
}

func (*GerantMetier) GetByEmailAndPassword(client *elastic.Client, login *models.Login) (*models.Gerant, error) {
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

	return gerant, nil
}
