import { call, put, takeLatest, select } from 'redux-saga/effects';
import AppStorage from '../../config/network/storage';
import { navigate } from '../../navigation/helper';
import * as AuthService from '../../service/authService';
import * as MainService from '../../service/mainService';
import * as MoreService from '../../service/moreService';
import * as FoodService from '../../service/foodService';
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

function* fetchPreviewWorker(action) {
  try {
    yield put({
      type: sharedTypes.FETCHING,
    });
    const res = yield call(MainService.fetchPreview);
    yield put({
      type: sharedTypes.FETCH_PREVIEW_SUCCESS,
      payload: res,
    });
  } catch (error) {
    console.log('auth', error);
  } finally {
    yield put({
      type: sharedTypes.DONE,
    });
  }
}

export function* fetchPreviewWatcher() {
  yield takeLatest(sharedTypes.FETCH_PREVIEW, fetchPreviewWorker);
}

function* fetchSlugFoodsWorker(action) {
  try {
    yield put({
      type: sharedTypes.FETCHING,
    });
    console.log(action.payload);
    const res = yield call(MoreService.fetchSlugFoods, action.payload);
    console.log(res);
    yield put({
      type: sharedTypes.FETCH_SLUG_SUCCESS,
      payload: res,
    });
  } catch (error) {
    console.log('auth', error);
  } finally {
    yield put({
      type: sharedTypes.DONE,
    });
  }
}

export function* fetchSlugFoodsWatcher() {
  yield takeLatest(sharedTypes.FETCH_SLUG, fetchSlugFoodsWorker);
}

function* fetchFoodsWorker(action) {
  try {
    yield put({
      type: sharedTypes.FETCHING,
    });
    console.log(action.payload);
    const res = yield call(FoodService.fetchAllFoods);
    console.log(res);
    yield put({
      type: sharedTypes.FETCH_FOODS_SUCCESS,
      payload: res,
    });
  } catch (error) {
    console.log('auth', error);
  } finally {
    yield put({
      type: sharedTypes.DONE,
    });
  }
}

export function* fetchFoodsWatcher() {
  yield takeLatest(sharedTypes.FETCH_FOODS_PREVIEW, fetchFoodsWorker);
}

function* checkoutsWorker(action) {
  try {
    yield put({
      type: sharedTypes.FETCHING,
    });
    const user_id = yield select(state => state.auth.profile._id);
    const res = yield call(FoodService.checkout, user_id, action.payload);
    console.log(res);
  } catch (error) {
    console.log('auth', error);
  } finally {
    yield put({
      type: sharedTypes.DONE,
    });
  }
}

export function* checkoutsWatcher() {
  yield takeLatest(sharedTypes.CHECK_OUT, checkoutsWorker);
}
