import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

import reducers from './reducer/reducer';
// creates the store
const configureStore = (rootReducer, rootSagaa) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = [];
  const enhancers = [];

  /* ------------- Saga Middleware ------------- */

  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  /* ------------- Redux Logger ------------- */

  if (__DEV__) middleware.push(require('redux-logger').logger);

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware));

  const store = createStore(rootReducer, compose(...enhancers));

  // kick off root saga
  let sagasManager = sagaMiddleware.run(rootSagaa);

  return {
    store,
    sagasManager,
    sagaMiddleware,
  };
};

const creatStore = () => {
  let finalReducers = reducers;
  // If rehydration is on use persistReducer otherwise default combineReducers
  let { store, sagasManager, sagaMiddleware } = configureStore(
    finalReducers,
    rootSaga,
  );
  // @ts-ignore
  if (module.hot) {
    // @ts-ignore
    module.hot.accept(() => {
      const newYieldedSagas = require('./sagas').default;
      sagasManager.cancel();
      // @ts-ignore
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas);
      });
    });
  }

  return store;
};

const store = creatStore();

export default store;
