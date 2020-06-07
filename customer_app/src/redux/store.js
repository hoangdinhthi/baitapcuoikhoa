import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import AsyncStorage from '@react-native-community/async-storage'
import { persistReducer, persistStore } from 'redux-persist'

import reducer from './reducer'
import saga from './saga'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  keyPrefix: '',
  whitelist: ['infoApp', 'user'],
}

const logger = store => next => action => {
  console.log('dispatching', action)
  const result = next(action)
  console.log('next state list Place', store.getState().newSearchReducer)
  return result
}

const persistedReducer = persistReducer(persistConfig, reducer)

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware, logger]
const store = createStore(persistedReducer, applyMiddleware(...middlewares))
sagaMiddleware.run(saga)
export default store
export const persistor = persistStore(store)
