/**
 * Created by pierremarsot on 15/05/2017.
 */
import {
  SEARCH_ANNONCE_SUCCESS,
  SEARCH_ANNONCE_ERROR,
  SEARCH_MORE_ANNONCE_SUCCESS,
} from '../actions/searchAnnonce';

const initialState = {
  annonces: [],
};

export default function searchAnnonce(state = initialState, action = {}){
  switch(action.type){
    case SEARCH_ANNONCE_SUCCESS:
      const annonces = action.annonces;

      if(!annonces || annonces.length === 0){
        return {
          ...state,
          annonces: []
        };
      }

      return {
        ...state,
        annonces: annonces,
      };

    case SEARCH_MORE_ANNONCE_SUCCESS:
      const annonces_more = action.annonces;

      if(!annonces_more || annonces_more.length === 0){
        return state;
      }

      return {
        ...state,
        annonces: state.annonces.concat(annonces_more),
      };
    default:
      return state;
  }
}