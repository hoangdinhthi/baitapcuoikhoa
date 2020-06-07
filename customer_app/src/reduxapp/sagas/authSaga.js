import { call, put, takeLatest, delay } from 'redux-saga/effects';
import AppStorage from '../../config/network/storage';
import { navigate } from '../../navigation/helper';
import * as AuthService from '../../service/authService';
import { authTypes } from '../reducer/authReducer';
import { sharedTypes } from '../reducer/sharedReducer';
import { showMessage } from 'react-native-flash-message';

function* loginWorker(action) {
  try {
    yield put({ type: sharedTypes.FETCHING });
    const res = yield call(AuthService.requestLogin, action.payload);
    yield call(AppStorage.setToken, JSON.stringify(res));
    yield put({
      type: authTypes.REQUEST_LOGIN_SUCCESS,
      payload: res.user,
    });
    navigate('MainStack');
  } catch (error) {
    console.log('auth', error, { ...error });
    if (error?.response?.data?.error) {
      showMessage({
        message: error.response.data.error,
        type: 'danger',
      });
    }
  } finally {
    yield put({ type: sharedTypes.DONE });
  }
}

export function* loginWatcher() {
  yield takeLatest(authTypes.REQUEST_LOGIN, loginWorker);
}

function* logoutWorker(action) {
  try {
    yield call(AppStorage.removeToken);
    navigate('AuthStack');
  } catch (error) {
    console.log('auth', error);
  }
}

export function* logoutWatcher() {
  yield takeLatest(authTypes.REQUEST_LOGOUT, logoutWorker);
}
