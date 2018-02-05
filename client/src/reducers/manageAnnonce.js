/**
 * Created by pierremarsot on 20/05/2017.
 */
import {
  ADD_ANNONCE_SUCCESS,
  LOAD_ANNONCES_GERANT_SUCCESS,
  REMOVED_ANNONCE_SUCCESS,
  REMOVED_ANNONCE_ERROR,
  UPDATE_ANNONCE_SUCCESS,
  UPDATE_ANNONCE_ERROR,
  SET_ANNONCE_TO_UPDATE_SUCCESS,
} from '../actions/manageAnnonce';

const initialState = {
  annonces: [],
  annonce_to_update: null,
};

export default function manageAnnonce(state = initialState, action = {}){
  switch(action.type){
    case ADD_ANNONCE_SUCCESS:
      const annonce = action.annonce;
      if(!annonce){
        return state;
      }

      return {
        ...state,
        annonces: state.annonces.concat(annonce),
      };

    case LOAD_ANNONCES_GERANT_SUCCESS:
      const annonces = action.annonces;
      if(!annonces){
        return {
          ...state,
          annonces: [],
        };
      }

      return {
        ...state,
        annonces: annonces,
      };

    case REMOVED_ANNONCE_SUCCESS:
      const _id = action._id;

      if(!_id || _id.length === 0){
        return state;
      }

      return {
        ...state,
        annonces: state.annonces.filter((a) => {
          return a._id !== _id;
        })
      };

    case REMOVED_ANNONCE_ERROR:
      return state;

    case UPDATE_ANNONCE_SUCCESS:
      const annonceUpdated = action.annonceUpdated;

      if(!annonceUpdated){
        return state;
      }

      let newTabAnnonces = state.annonces.filter((a) => {
        return a._id !== annonceUpdated._id;
      });

      return {
        ...state,
        annonces: newTabAnnonces.concat(annonceUpdated)
      };

    case SET_ANNONCE_TO_UPDATE_SUCCESS:
      const annonceToUpdate = action.annonceToUpdate;
      if(!annonceToUpdate){
        return {
          ...state,
          annonce_to_update: null,
        };
      }

      return {
        ...state,
        annonce_to_update: annonceToUpdate,
      };

    default:
      return state;
  }
}