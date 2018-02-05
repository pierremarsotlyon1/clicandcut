package models

type UpdatePassword struct {
	NewPassword string `json:"new_password" query:"new_password" form:"new_password"`
	ConfirmNewPassword string `json:"confirm_new_password" query:"confirm_new_password" form:"confirm_new_password"`
}
