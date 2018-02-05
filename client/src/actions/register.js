/**
 * Created by pierremarsot on 18/05/2017.
 */
import {postApi} from '../tools/api';
import {add_error_notification} from './notification';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

function register_success(payload) {
  return {
    type: REGISTER_SUCCESS,
    token: payload.token,
  };
}

function register_error() {
  return {
    type: REGISTER_ERROR,
  };
}

export function register(nom, prenom, siret, email, password, confirmPassword, acceptCGU) {
  return dispatch => {
    validate_informations_register(nom, prenom, siret, email, password, confirmPassword, acceptCGU)
      .then(() => {
        postApi('/register', {
          nom: nom,
          prenom: prenom,
          siret: siret,
          email: email,
          password: password,
          confirm_password: confirmPassword,
        })
          .then((response) => {
            return dispatch(register_success(response));
          })
          .catch((response) => {
            if (response && response.error) {
              dispatch(add_error_notification(response.error));
            }
            return dispatch(register_error());
          });
      })
      .catch((error) => {
        return dispatch(add_error_notification(error));
      });
  };
}

export function validate_informations_register(nom, prenom, siret, email, password, confirmPassword, acceptCGU) {
  return new Promise((resolve, reject) => {

    if (!acceptCGU) {
      return reject('Vous devez accepter les CGU');
    }

    if (!nom || nom.length === 0) {
      return reject('Vous devez renseigner votre nom');
    }

    if (!prenom || nom.length === 0) {
      return reject('Vous devez renseigner votre prénom');
    }

    if (!siret || siret.length === 0) {
      return reject('Vous devez renseigner votre SIRET');
    }

    if (!email || email.length === 0) {
      return reject('Vous devez renseigner votre mail');
    }

    if (!password || password.length === 0) {
      return reject('Vous devez renseigner votre mot de passe');
    }

    if (!confirmPassword || confirmPassword.length === 0) {
      return reject('Vous devez confirmer votre mot de passe');
    }

    if (confirmPassword !== password) {
      return reject('Vos mots de passe ne sont pas identique');
    }

    return resolve();
  });
}