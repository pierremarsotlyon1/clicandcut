/**
 * Created by pierremarsot on 15/05/2017.
 */
import superagent from 'superagent';
import superagentJsonapify from 'superagent-jsonapify';
import {getLocalStorage, ID_TOKEN, getToken} from './localStorage';

superagentJsonapify(superagent);

const url = process.env.NODE_ENV === "development" ?
  "http://localhost:1324" :
    "http://localhost:1324";

export function get(path, query){
  return new Promise((resolve, reject) => {
    const callback = (error, response) => {
      if (!response) {
        return reject({
          error: 'Erreur de connexion avec le serveur'
        }, 404);
      }
      if (response.ok) {
        return resolve(response.body, response.statusCode);
      }

      return reject(response.body, response.statusCode);
    };

    const token = getToken();

    if(token && token.length > 0){
      superagent.get(url + path)
        .query(query)
        .set("Authorization", "Bearer " + token)
        .end(callback);
    }
    else
    {
      superagent.get(url + path)
        .query(query)
        .end(callback);
    }
  });
}

export function postApi(path, data = {}) {
  return new Promise((resolve, reject) => {

    const callback = (error, response) => {
      if (response.ok) {
        return resolve(response.body, response.statusCode);
      }

      return reject(response.body, response.statusCode);
    };

    const token = getToken();

    if(token && token.length > 0){
      superagent.post(url + path)
        .send(data)
        .set("Authorization", "Bearer " + token)
        .end(callback);
    }
    else
    {
      superagent.post(url + path)
        .send(data)
        .end(callback);
    }
  });
}

export function postMultipartApi(path, data = [], file) {
  return new Promise((resolve, reject) => {
    const token = getLocalStorage(ID_TOKEN);
    if (!token) {
      return reject({
        error: 'Erreur lors de la récupération de votre identifiant'
      });
    }

    let req = superagent.post(url + path);
    req.attach(file.name, file.data);

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        req.field(key, data[key]);
      }
    }

    req.field('token', token);

    req.then((response, response2) => {
      return resolve(response);
    })
      .catch((response) => {
        return reject(response);
      });
  });
}

export function putApi(path, data = {}) {
  return new Promise((resolve, reject) => {

    const callback = (error, response) => {
      if (response.ok) {
        return resolve(response.body, response.statusCode);
      }

      return reject(response.body, response.statusCode);
    };

    const token = getToken();

    if(token && token.length > 0){
      superagent.put(url + path)
        .send(data)
        .set("Authorization", "Bearer " + token)
        .end(callback);
    }
    else
    {
      superagent.put(url + path)
        .send(data)
        .end(callback);
    }
  });
}

export function removeApi(path, query = {}) {
  return new Promise((resolve, reject) => {


    const callback = (error, response) => {
      if (response.ok) {
        return resolve(response.body, response.statusCode);
      }

      return reject(response.body, response.statusCode);
    };

    const token = getToken();

    if(token && token.length > 0){
      superagent.delete(url + path)
        .query(query)
        .set("Authorization", "Bearer " + token)
        .end(callback);
    }
    else
    {
      superagent.delete(url + path)
        .query(query)
        .end(callback);
    }
  });
}