import { all, fork } from 'redux-saga/effects';
/* ------------- Sagas ------------- */
import * as authSagas from './authSaga';

/* ------------- Connect Types To Sagas ------------- */

export default function* rootSaga() {
  yield all([...Object.values(authSagas)].map(fork));
}
