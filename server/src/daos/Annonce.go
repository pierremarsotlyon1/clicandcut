package daos

import (
	"gopkg.in/olivere/elastic.v5"
	"serveur_coiffure/src/models"
	"context"
	"errors"
	"encoding/json"
	"time"
)

type AnnonceDao struct{}

func (*AnnonceDao) Get(client *elastic.Client, idGerant string, idAnnonce string) (*models.Annonce, error) {
	//On récup le context
	ctx := context.Background()

	//On recherche les annonces du gérant via la query
	result, err := client.Get().
		Index(index).
		Type("annonce").
		Id(idAnnonce).
		Parent(idGerant).
		Do(ctx)

	//On regarde si on a eu une erreur lors de la recherche
	if err != nil || result == nil {
		return nil, errors.New("Erreur lors de la récupération de l'annonce")
	}

	annonce := new(models.Annonce)

	marshal, err := json.Marshal(result)
	if err != nil {
		return nil, errors.New("Erreur lors de la récupération de vos annonces")
	}

	//On regarde si on peut deserialiser le hit en annonce
	if err := json.Unmarshal(marshal, annonce); err != nil {
		return nil, errors.New("Erreur lors de la récupération de vos annonces")
	}

	return annonce, nil
}

func (*AnnonceDao) Find(client *elastic.Client, id string) ([]*models.Annonce, error) {
	//On récup le context
	ctx := context.Background()

	//On fait une query avec un match_all pour récupérait toutes les annonces du gérant
	queryMatchAll := elastic.NewTermQuery("_id", id)

	//Création de la query globale
	parentQuery := elastic.NewHasParentQuery("gerant", queryMatchAll)

	//On recherche les annonces du gérant via la query
	results, err := client.Search().
		Index(index).
		Type("annonce").
		Query(parentQuery).
		Pretty(true).
		Do(ctx)

	//On regarde si on a eu une erreur lors de la recherche
	if err != nil || results == nil || results.Hits == nil {
		return nil, errors.New("Erreur lors de la récupération de vos annonces")
	}

	//Création du tableau de retour
	var annonces []*models.Annonce

	//Si on a aucun résultats, on retourne le tableau vide
	if results.Hits.TotalHits == 0 {
		return annonces, nil
	}

	//On parcourt les résultats pour les ajouter au tableau d'annonces
	for _, hit := range results.Hits.Hits {
		annonce := new(models.Annonce)

		marshal, err := json.Marshal(hit)
		if err != nil {
			return nil, errors.New("Erreur lors de la récupération de vos annonces")
		}

		//On regarde si on peut deserialiser le hit en annonce
		if err := json.Unmarshal(marshal, annonce); err != nil {
			return nil, errors.New("Erreur lors de la récupération de vos annonces")
		}

		annonces = append(annonces, annonce)
	}

	return annonces, nil
}

func (*AnnonceDao) Add(client *elastic.Client, id string, annonce *models.Annonce) error {
	ctx := context.Background()

	//On récupère le datetime courant
	t := time.Now().UTC().Format(time.RFC3339)

	//On ajoute la date de création et la date qui servira à la recherche à l'annonce
	annonce.Source.CreatedDate = t
	annonce.Source.SearchDate = t

	result, err := client.Index().
		Index(index).
		Type("annonce").
		Parent(id).
		BodyJson(annonce.Source).
		Refresh("true").
		Do(ctx)

	if err != nil || result == nil || !result.Created {
		return errors.New("Erreur lors de l'ajout de votre annonce")
	}

	annonce.Id = result.Id
	annonce.Parent = id
	annonce.Version = result.Version
	annonce.Type = result.Type
	annonce.Index = result.Index

	return nil
}

func (*AnnonceDao) Delete(client *elastic.Client, id string, parentId string) error {
	ctx := context.Background()

	deleted, err := client.Delete().
		Index(index).
		Type("annonce").
		Id(id).
		Parent(parentId).
		Do(ctx)

	if err != nil || deleted == nil {
		return errors.New("Erreur lors de la suppression de l'annonce")
	}

	return nil
}

func (*AnnonceDao) Update(client *elastic.Client, idAnnonce string, parentId string, newAnnonce *models.Annonce) error {
	ctx := context.Background()

	if updated, err := client.Update().
		Index(index).
		Type("annonce").
		Id(idAnnonce).
		Parent(parentId).
		Script(elastic.NewScriptInline("" +
		"ctx._source.titre = params.titre; " +
		"ctx._source.tarif = params.tarif; " +
		"ctx._source.description = params.description; " +
		"ctx._source.lundi = params.lundi;" +
		"ctx._source.mardi = params.mardi;" +
		"ctx._source.mercredi = params.mercredi;" +
		"ctx._source.jeudi = params.jeudi;" +
		"ctx._source.vendredi = params.vendredi;" +
		"ctx._source.samedi = params.samedi;" +
		"ctx._source.dimanche = params.dimanche;" +
		"ctx._source.wifi = params.wifi;" +
		"ctx._source.telephone = params.telephone;" +
		"ctx._source.name_shop = params.name_shop;" +
		"ctx._source.address = params.address;" +
		"ctx._source.location.lat = params.lat;" +
		"ctx._source.location.lon = params.lon;" +
		"ctx._source.photo = params.photo;" +
		"ctx._source.phone_number = params.phone_number;" +
		"ctx._source.client_gerant = params.client_gerant;").
		Lang("painless").
		Param("titre", newAnnonce.Source.Titre).
		Param("tarif", newAnnonce.Source.Tarif).
		Param("description", newAnnonce.Source.Description).
		Param("lundi", newAnnonce.Source.Lundi).
		Param("mardi", newAnnonce.Source.Mardi).
		Param("mercredi", newAnnonce.Source.Mercredi).
		Param("jeudi", newAnnonce.Source.Jeudi).
		Param("vendredi", newAnnonce.Source.Vendredi).
		Param("samedi", newAnnonce.Source.Samedi).
		Param("dimanche", newAnnonce.Source.Dimanche).
		Param("wifi", newAnnonce.Source.Wifi).
		Param("telephone", newAnnonce.Source.Telephone).
		Param("name_shop", newAnnonce.Source.NameShop).
		Param("address", newAnnonce.Source.Address).
		Param("lat", newAnnonce.Source.Location.Lat).
		Param("lon", newAnnonce.Source.Location.Lon).
		Param("photo", newAnnonce.Source.Photo).
		Param("phone_number", newAnnonce.Source.PhoneNumber).
		Param("client_gerant", newAnnonce.Source.ClientGerant)).
		Do(ctx); updated == nil || err != nil {
		return errors.New("Erreur lors de la mise à jour de votre annonce")
	}

	return nil
}

func (*AnnonceDao) SearchByLocation(client *elastic.Client, searchAnnonce *models.SearchAnnonce) ([]*models.Annonce, error) {
	ctx := context.Background()

	//Match all
	matchAll := elastic.NewMatchAllQuery()

	//Filter pour la geo_point du gérant sur address
	filter := elastic.NewGeoDistanceQuery("location").Distance("50km").Lat(searchAnnonce.Lat).Lon(searchAnnonce.Lon)

	//La bool query qui réunit le match all et le filter
	boolQuery := elastic.NewBoolQuery().Must(matchAll).Filter(filter)

	results, err := client.Search().
		Index(index).
		Type("annonce").
		Query(boolQuery).
		Sort("search_date", false).
		From(searchAnnonce.Index).
		Size(10).
		Pretty(true).
		Do(ctx)

	//On regarde si on a eu une erreur
	if err != nil || results == nil || results.Hits == nil {
		return nil, errors.New("Erreur lors de la récupération des annonces")
	}

	//Création du tableau retour
	var annonces []*models.Annonce

	//Si on a aucun result, on retourne le tableau vide
	if results.Hits.TotalHits == 0 {
		return annonces, nil
	}

	//On parcourt les résultats pour les ajouter au tableau d'annonces
	for _, hit := range results.Hits.Hits {
		annonce := new(models.Annonce)

		marshal, err := json.Marshal(hit)
		if err != nil {
			return nil, errors.New("Erreur lors de la récupération de vos annonces")
		}

		//On regarde si on peut deserialiser le hit en annonce
		if err := json.Unmarshal(marshal, annonce); err != nil {
			return nil, errors.New("Erreur lors de la récupération de vos annonces")
		}

		annonces = append(annonces, annonce)
	}

	return annonces, nil
}
