package models

type Annonce struct {
	HeaderElasticsearch
	Source struct {
		Titre string `json:"titre" query:"titre" form:"titre"`
		Tarif int `json:"tarif" query:"tarif" form:"tarif"`
		Description string `json:"description" query:"description" form:"description"`
		Lundi bool `json:"lundi" query:"lundi" form:"lundi"`
		Mardi bool `json:"mardi" query:"mardi" form:"mardi"`
		Mercredi bool `json:"mercredi" query:"mercredi" form:"mercredi"`
		Jeudi bool `json:"jeudi" query:"jeudi" form:"jeudi"`
		Vendredi bool `json:"vendredi" query:"vendredi" form:"vendredi"`
		Samedi bool `json:"samedi" query:"samedi" form:"samedi"`
		Dimanche bool `json:"dimanche" query:"dimanche" form:"dimanche"`
		Wifi bool `json:"wifi" query:"wifi" form:"wifi"`
		Telephone bool `json:"telephone" query:"telephone" form:"telephone"`
		ClientGerant bool `json:"client_gerant" query:"client_gerant" form:"client_gerant"`
		CreatedDate string `json:"created_date" query:"created_date" form:"created_date"`
		SearchDate string `json:"search_date" query:"search_date" form:"search_date"`
		Location Geolocation `json:"location" form:"location" query:"location"`
		Address string `json:"address" form:"address" query:"address"`
		NameShop string `json:"name_shop" form:"name_shop" query:"name_shop"`
		Photo string `json:"photo" form:"photo" query:"photo"`
		PhoneNumber string `json:"phone_number" form:"phone_number" query:"phone_number"`
	} `json:"_source" form:"_source" query:"_source"`
}
