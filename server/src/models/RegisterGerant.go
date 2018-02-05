package models

type RegisterGerant struct {
	Nom string `json:"nom" query:"nom" form:"nom"`
	Prenom string `json:"prenom" query:"prenom" form:"prenom"`
	Email string `json:"email" query:"email" form:"email"`
	Password string `json:"password" query:"password" form:"password"`
	Siret string `json:"siret" query:"siret" form:"siret"`
	ConfirmPassword string `json:"confirm_password" query:"confirm_password" form:"confirm_password"`
}
