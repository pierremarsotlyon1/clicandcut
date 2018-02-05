package models

type SearchAnnonce struct {
	Index int `json:"index" query:"index" form:"index"`
	Geolocation
}
