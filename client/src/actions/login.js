/**
 * Created by pierremarsot on 18/05/2017.
 */
import {postApi} from '../tools/api';
import {add_error_notification} from './notification';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

function login_success(payload) {
  return {
    type: LOGIN_SUCCESS,
    token: payload.token,
  };
}

function login_error() {
  return {
    type: LOGIN_ERROR,
  };
}

export function login(email, password) {
  return dispatch => {
    if (!email || email.length === 0) {
      dispatch(add_error_notification('Vous devez renseigner un email'));
      return dispatch(login_error());
    }

    if (!password || password.length === 0) {
      dispatch(add_error_notification('Vous devez renseigner votre mot de passe'));
      return dispatch(login_error());
    }

    postApi('/login', {
      email: email,
      password: password,
    })
      .then((response) => {
        return dispatch(login_success(response));
      })
      .catch((response) => {
        if (response && response.error) {
          dispatch(add_error_notification(response.error));
        }
        return dispatch(login_error());
      });
  };
}