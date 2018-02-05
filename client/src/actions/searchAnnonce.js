/**
 * Created by pierremarsot on 15/05/2017.
 */
import {get} from '../tools/api';

export const SEARCH_ANNONCE_SUCCESS = 'SEARCH_ANNONCE_SUCCESS';
export const SEARCH_ANNONCE_ERROR = 'SEARCH_ANNONCE_ERROR';

export const SEARCH_MORE_ANNONCE_SUCCESS = 'SEARCH_MORE_ANNONCE_SUCCESS';

function search_annonce_success(payload) {
  return {
    type: SEARCH_ANNONCE_SUCCESS,
    annonces: payload,
  };
}

function search_annonce_error() {
  return {
    type: SEARCH_ANNONCE_ERROR,
  };
}

export function search_annonce(lat, lon, index) {
  return dispatch => {

    if (!lat) {
      return dispatch(search_annonce_error());
    }

    if (!lon) {
      return dispatch(search_annonce_error());
    }

    get("/annonce/search/location", {
      lat: lat,
      lon: lon,
      index: index,
    })
      .then((response) => {
        return dispatch(search_annonce_success(response));
      })
      .catch((response) => {
      //response.error
        return dispatch(search_annonce_error());
      });
  };
}

function search_more_annonce_success(payload) {
  return {
    type: SEARCH_MORE_ANNONCE_SUCCESS,
    annonces: payload,
  };
}

export function search_more_annonce(lat, lon, index) {
  return dispatch => {

    if (!lat) {
      return false;
    }

    if (!lon) {
      return false;
    }

    get("/annonce/search/location", {
      lat: lat,
      lon: lon,
      index: index,
    })
      .then((response) => {
        return dispatch(search_more_annonce_success(response));
      })
      .catch((response) => {
        //response.error
        return false;
      });
  };
}