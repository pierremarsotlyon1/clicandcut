/**
 * Created by pierremarsot on 19/05/2017.
 */
import {get, putApi} from '../tools/api';
import {add_success_notification, add_error_notification} from './notification';

export const LOAD_PROFILE_GERANT_SUCCESS = 'LOAD_PROFILE_GERANT_SUCCESS';
export const LOAD_PROFILE_GERANT_ERROR = 'LOAD_PROFILE_GERANT_ERROR';

export const UPDATE_PROFILE_GERANT_SUCCESS = 'UPDATE_PROFILE_GERANT_SUCCESS';
export const UPDATE_PROFILE_GERANT_ERROR = 'UPDATE_PROFILE_GERANT_ERROR';

export const UPDATE_PASSWORD_GERANT_SUCCESS = 'UPDATE_PASSWORD_GERANT_SUCCESS';
export const UPDATE_PASSWORD_GERANT_ERROR = 'UPDATE_PASSWORD_GERANT_ERROR';

function load_profile_gerant_success(payload) {
  return {
    type: LOAD_PROFILE_GERANT_SUCCESS,
    gerant: payload,
  };
}

function load_profile_gerant_error() {
  return {
    type: LOAD_PROFILE_GERANT_ERROR,
  };
}

export function load_profile_gerant() {
  return dispatch => {
    get('/api/gerant')
      .then((response) => {
        return dispatch(load_profile_gerant_success(response))
      })
      .catch((response) => {
        if (response && response.error) {
          dispatch(add_error_notification(response.error));
        }
        return dispatch(load_profile_gerant_error());
      });
  };
}

function update_profile_gerant_success(payload) {
  return {
    type: UPDATE_PROFILE_GERANT_SUCCESS,
    gerant: payload,
  };
}

function update_profile_gerant_error() {
  return {
    type: UPDATE_PROFILE_GERANT_ERROR
  };
}

export function update_profile_gerant(nom, prenom, siret) {
  return dispatch => {
    if (!nom || nom.length === 0) {
      dispatch(add_error_notification('Vous devez renseigner un nom'));
      return dispatch(update_profile_gerant_error());
    }

    if (!prenom || prenom.length === 0) {
      dispatch(add_error_notification('Vous devez renseigner un prénom'));
      return dispatch(update_profile_gerant_error());
    }

    if (!siret || siret.length === 0) {
      dispatch(add_error_notification('Vous devez renseigner un numéro de SIRET'));
      return dispatch(update_profile_gerant_error());
    }

    putApi('/api/gerant', {
      _source: {
        nom: nom,
        prenom: prenom,
        siret: siret,
      }
    })
      .then((response) => {
        dispatch(add_success_notification('Vos informations ont bien été modifiées'));
        return dispatch(update_profile_gerant_success(response));
      })
      .catch((response) => {
        if (response && response.error) {
          dispatch(add_error_notification(response.error));
        }
        return dispatch(update_profile_gerant_error());
      });
  };
}

function update_password_gerant_success() {
  return {
    type: UPDATE_PASSWORD_GERANT_SUCCESS,
  };
}

function update_password_gerant_error() {
  return {
    type: UPDATE_PASSWORD_GERANT_ERROR,
  };
}

export function update_password_gerant(newPassword, confirmNewPassword) {
  return dispatch => {
    if (!newPassword || newPassword.length === 0) {
      dispatch(add_error_notification('Vous devez renseigner un mot de passe'));
      return dispatch(update_password_gerant_error());
    }

    if (!confirmNewPassword || confirmNewPassword.length === 0) {
      dispatch(add_error_notification('Vous devez confirmer votre mot de passe'));
      return dispatch(update_password_gerant_error());
    }

    if (newPassword !== confirmNewPassword) {
      dispatch(add_error_notification('Les mots de passe ne sont pas indentique'));
      return dispatch(update_password_gerant_error());
    }

    putApi('/api/gerant/password', {
      new_password: newPassword,
      confirm_new_password: confirmNewPassword,
    })
      .then((response) => {
        dispatch(add_success_notification('Votre mot de passe a bien été mis à jour'));
        return dispatch(update_password_gerant_success());
      })
      .catch((response) => {
        if (response && response.error) {
          dispatch(add_error_notification(response.error));
        }
        return dispatch(update_password_gerant_error());
      });
  };
}