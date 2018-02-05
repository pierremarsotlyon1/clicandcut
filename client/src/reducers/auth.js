/**
 * Created by pierremarsot on 18/05/2017.
 */
import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
} from '../actions/login';

import {
  REMOVE_TOKEN,
} from '../actions/logout';

import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from '../actions/register';

import {setLocalStorage, getToken, ID_TOKEN} from '../tools/localStorage';

const initialState = {
  token: getToken(),
};

export default function login(state = initialState, action = {}){
  switch(action.type){
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      const {token} = action;

      if(!token || !setLocalStorage(ID_TOKEN, token)){
        return {
          ...state,
          token: '',
        };
      }

      return {
        ...state,
        token: token,
      };

    case LOGIN_ERROR:
      return {
        token: '',
      };

    case REMOVE_TOKEN:
      return {
        ...state,
        token: '',
      };
    default:
      return state;
  }
}