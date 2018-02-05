package models

type Coiffeur struct {
	HeaderElasticsearch
	Source struct {
		Email string `json:"email" form:"email" query:"email"`
		Password string `json:"password" form:"password" query:"password"`
	} `json:"_source" form:"_source" query:"_source"`
}

