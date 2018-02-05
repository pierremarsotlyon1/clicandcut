import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';

import searchAnnonce from '../reducers/searchAnnonce';
import auth from '../reducers/auth';
import profile from '../reducers/profile';
import manageAnnonce from '../reducers/manageAnnonce';
import notification from '../reducers/notification';

import reduxReset from 'redux-reset'

const logger = createLogger();
const rootReducer = combineReducers(
  {
    searchAnnonce,
    auth,
    profile,
    manageAnnonce,
    notification
  }
);

const initialState = {};

export default function configureStore() {
  let store;

  if (module.hot) {
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(thunkMiddleware, logger),
      reduxReset(),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
  } else {
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(thunkMiddleware),
      reduxReset(),
      f=>f
    ));
  }

  return store;
}
