package models

type Gerant struct {
	HeaderElasticsearch
	Source struct {
		Nom string `json:"nom" form:"nom" query:"nom"`
		Prenom string `json:"prenom" form:"prenom" query:"prenom"`
		Email string `json:"email" form:"email" query:"email"`
		Password string `json:"password" form:"password" query:"password"`
		Siret string `json:"siret" form:"siret" query:"siret"`
	} `json:"_source" form:"_source" query:"_source"`
}

func (gerant *Gerant) GetEmail () string {
	return gerant.Source.Email
}