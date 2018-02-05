/**
 * Created by pierremarsot on 18/05/2017.
 */
import {deleteLocalStorage, ID_TOKEN, getToken} from '../tools/localStorage';

export const REMOVE_TOKEN = 'REMOVE_TOKEN';

export function logout(){
  return dispatch => {
    if(deleteLocalStorage(ID_TOKEN)){
      return dispatch({
        type: REMOVE_TOKEN,
      });
    }
    else{
      return false;
    }
  };
}