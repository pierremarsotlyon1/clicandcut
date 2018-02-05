/**
 * Created by pierremarsot on 19/05/2017.
 */
import {
  LOAD_PROFILE_GERANT_ERROR,
  LOAD_PROFILE_GERANT_SUCCESS,
  UPDATE_PROFILE_GERANT_SUCCESS,
  UPDATE_PROFILE_GERANT_ERROR,
} from '../actions/profile';

const initialState = {
  gerant: null,
};

export default function profile(state = initialState, action = {}){
  switch (action.type){
    case LOAD_PROFILE_GERANT_ERROR:
      return {
        ...state,
        gerant: null,
      };

    case UPDATE_PROFILE_GERANT_SUCCESS:
    case LOAD_PROFILE_GERANT_SUCCESS:
      const {gerant} = action;
      if(!gerant){
        return {
          ...state,
          gerant: null,
        };
      }

      return {
        ...state,
        gerant: gerant,
      };

    case UPDATE_PROFILE_GERANT_ERROR:
      return state;

    default:
      return state;
  }
}