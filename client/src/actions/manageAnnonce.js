/**
 * Created by pierremarsot on 20/05/2017.
 */
import {postApi, get, removeApi, putApi} from '../tools/api';
import {gpsToAddress} from '../tools/Geocoder';
import {add_error_notification, add_success_notification} from './notification';

export const ADD_ANNONCE_SUCCESS = 'ADD_ANNONCE_SUCCESS';
export const REMOVED_ANNONCE_SUCCESS = 'REMOVED_ANNONCE_SUCCESS';
export const REMOVED_ANNONCE_ERROR = 'REMOVED_ANNONCE_ERROR';
export const UPDATE_ANNONCE_SUCCESS = 'UPDATE_ANNONCE_SUCCESS';
export const UPDATE_ANNONCE_ERROR = 'UPDATE_ANNONCE_ERROR';
export const SET_ANNONCE_TO_UPDATE_SUCCESS = 'SET_ANNONCE_TO_UPDATE_SUCCESS';
export const LOAD_ANNONCES_GERANT_SUCCESS = 'LOAD_ANNONCES_GERANT_SUCCESS';

function load_annonces_gerant_success(payload) {
  return {
    type: LOAD_ANNONCES_GERANT_SUCCESS,
    annonces: payload,
  };
}

export function load_annonces_gerant() {
  return dispatch => {
    get('/api/annonce')
      .then((response) => {
        return dispatch(load_annonces_gerant_success(response));
      })
      .catch((response) => {
        return dispatch(add_error_notification('Erreur lors de la récupération de vos annonces'));
      });
  };
}

function add_annonce_success(payload) {
  return {
    type: ADD_ANNONCE_SUCCESS,
    annonce: payload,
  };
}

export function add_annonce(titre,
                            tarif,
                            name_shop,
                            location,
                            description,
                            lundi,
                            mardi,
                            mercredi,
                            jeudi,
                            vendredi,
                            samedi,
                            dimanche,
                            wifi,
                            telephone,
                            client_gerant,
                            photo,
                            phone_number) {
  return dispatch => {

    if (!titre || titre.length === 0) {
      return dispatch(add_error_notification('Vous devez renseigner un titre'));
    }

    tarif = Number.parseInt(tarif);
    if (!tarif || tarif < 1) {
      return dispatch(add_error_notification('Le tarif doit être supèrieur à 0'));
    }

    if (!name_shop || name_shop.length === 0) {
      return dispatch(add_error_notification('Vous devez renseigner le nom de votre salon'));
    }

    if (!location || !location.lat || !location.lon || location.lat === 0 || location.lon === 0) {
      return dispatch(add_error_notification('Vous devez renseigner l\'adresse de votre salon'));
    }

    if (!phone_number || phone_number.length === 0) {
      return dispatch(add_error_notification('Vous devez renseigner un numéro de telephone'));
    }

    //On récup l'adresse
    gpsToAddress(location.lat, location.lon)
      .then(function (address) {
        postApi('/api/annonce', {
          _source: {
            titre: titre,
            tarif: tarif,
            name_shop: name_shop,
            location: location,
            description: description,
            lundi: lundi,
            mardi: mardi,
            mercredi: mercredi,
            jeudi: jeudi,
            vendredi: vendredi,
            samedi: samedi,
            dimanche: dimanche,
            wifi: wifi,
            telephone: telephone,
            client_gerant: client_gerant,
            photo: photo,
            address: address,
            phone_number: phone_number,
          }
        })
          .then((response) => {
            dispatch(add_success_notification('Votre annonce a bien été ajoutée'));
            return dispatch(add_annonce_success(response));
          })
          .catch((response) => {
            if (response && response.error) {
              return dispatch(add_error_notification(response.error));
            }
            return false;
          });
      })
      .catch(function (err) {
        console.log("error get address");
        return false;
      });
  };
}

function removed_annonce_success(_id) {
  return {
    type: REMOVED_ANNONCE_SUCCESS,
    _id: _id,
  };
}

function removed_annonce_error() {
  return {
    type: REMOVED_ANNONCE_ERROR,
  }
}

export function remove_annonce(_id) {
  return dispatch => {
    if (!_id || _id.length === 0) {
      return false;
    }

    removeApi('/api/annonce/' + _id)
      .then((response) => {
        dispatch(add_success_notification('Votre annonce a bien été supprimée'));
        return dispatch(removed_annonce_success(_id));
      })
      .catch((response) => {
        if (response && response.error) {
          return dispatch(add_error_notification(response.error));
        }
        return dispatch(removed_annonce_error());
      });
  };
}

function update_annonce_success(annonceUpdated) {
  return {
    type: UPDATE_ANNONCE_SUCCESS,
    annonceUpdated: annonceUpdated,
  }
}

function update_annonce_error() {
  return {
    type: UPDATE_ANNONCE_ERROR
  }
}

export function update_annonce(_id,
                               titre,
                               tarif,
                               name_shop,
                               location,
                               description,
                               lundi,
                               mardi,
                               mercredi,
                               jeudi,
                               vendredi,
                               samedi,
                               dimanche,
                               wifi,
                               telephone,
                               client_gerant,
                               photo,
                               phone_number) {
  return dispatch => {

    if (!_id || _id.length === 0) {
      return false;
    }


    if (!titre || titre.length === 0) {
      return dispatch(add_error_notification('Vous devez renseigner un titre'));
    }

    tarif = Number.parseInt(tarif);
    if (!tarif || tarif < 1) {
      return dispatch(add_error_notification('Le tarif doit être supèrieur à 0'));
    }

    if (!name_shop || name_shop.length === 0) {
      return dispatch(add_error_notification('Vous devez renseigner le nom de votre salon'));
    }

    if (!location || !location.lat || !location.lon || location.lat === 0 || location.lon === 0) {
      return dispatch(add_error_notification('Vous devez renseigner l\'adresse de votre salon'));
    }

    if (!phone_number || phone_number.length === 0) {
      return dispatch(add_error_notification('Vous devez renseigner un numéro de telephone'));
    }

    //On récup l'adresse
    gpsToAddress(location.lat, location.lon)
      .then(function (address) {
        const _source = {
          _source: {
            titre: titre,
            tarif: tarif,
            name_shop: name_shop,
            location: location,
            description: description,
            lundi: lundi,
            mardi: mardi,
            mercredi: mercredi,
            jeudi: jeudi,
            vendredi: vendredi,
            samedi: samedi,
            dimanche: dimanche,
            wifi: wifi,
            telephone: telephone,
            client_gerant: client_gerant,
            photo: photo,
            address: address,
            phone_number: phone_number,
          }
        };

        putApi('/api/annonce/' + _id, _source)
          .then(() => {
            dispatch(add_success_notification('Votre annonce a bien été modifiée'));
            return dispatch(update_annonce_success(
              {
                _id: _id,
                _source: _source._source,
              }
            ));
          })
          .catch((response) => {
            if (response && response.error) {
              return dispatch(add_error_notification(response.error));
            }
            return false;
          });
      })
      .catch(function (err) {
        return dispatch(add_error_notification('Erreur lors de la récupération de votre adresse'));
      });
  };
}

function set_annonce_to_update_success(payload) {
  return {
    type: SET_ANNONCE_TO_UPDATE_SUCCESS,
    annonceToUpdate: payload,
  };
}

export function set_annonce_to_update(_id) {
  return dispatch => {
    if (!_id || _id.length === 0) {
      return false;
    }

    get('/api/annonce/' + _id)
      .then((response) => {
        return dispatch(set_annonce_to_update_success(response));
      })
      .catch((response) => {
        return false;
      });
  }
}