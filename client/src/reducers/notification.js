/**
 * Created by pierremarsot on 25/05/2017.
 */
import {
  ADD_NOTIFICATION_SUCCESS,
  RESET_NOTIFICATION,
} from '../actions/notification';

const initialState = {
  type: '',
  message: '',
};

export default function notification(state = initialState, action = {}){
  switch(action.type){
    case ADD_NOTIFICATION_SUCCESS:
      const type_notification = action.type_notification;
      const message = action.message;

      return {
        ...state,
        type: type_notification,
        message: message,
      };

    case RESET_NOTIFICATION:
      return {
        ...state,
        type: '',
        message: '',
      };
    default:
      return state;
  }
}