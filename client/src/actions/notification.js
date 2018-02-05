/**
 * Created by pierremarsot on 25/05/2017.
 */
export const ADD_NOTIFICATION_SUCCESS = 'ADD_NOTIFICATION_SUCCESS';
export const ADD_NOTIFICATION_ERROR = 'ADD_NOTIFICATION_ERROR';
export const RESET_NOTIFICATION = 'RESET_NOTIFICATION';

function add_notification_success(type, message){
  return {
    type: ADD_NOTIFICATION_SUCCESS,
    type_notification: type,
    message: message
  };
}

export function add_notification(type, message){
  return dispatch => {
    return dispatch(add_notification_success(type, message));
  };
}

export function add_error_notification(message){
  return dispatch => {
    return dispatch(add_notification_success('error', message));
  };
}

export function add_success_notification(message){
  return dispatch => {
    return dispatch(add_notification_success('success', message));
  };
}

export function reset(){
  return dispatch => {
    return dispatch({
      type: RESET_NOTIFICATION,
    });
  };
}