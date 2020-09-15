import { call, put, takeLatest, select } from 'redux-saga/effects';
import AppStorage from '../../config/network/storage';
import { navigate, replace } from '../../navigation/helper';
import * as AuthService from '../../service/authService';
import * as MainService from '../../service/mainService';
import * as MoreService from '../../service/moreService';
import * as FoodService from '../../service/foodService';
import * as OrderService from '../../service/orderService';
import { authTypes } from '../reducer/authReducer';
import { sharedTypes } from '../reducer/sharedReducer';
import { showMessage } from 'react-native-flash-message';
import OneSignal from 'react-native-onesignal';
import routes from '../../navigation/Routes';

function* loginWorker(action) {
  try {
    yield put({ type: sharedTypes.FETCHING });
    const res = yield call(AuthService.requestLogin, action.payload);
    yield call(AppStorage.setToken, JSON.stringify(res));

    yield put({
      type: authTypes.REQUEST_LOGIN_SUCCESS,
      payload: res.user,
    });
    yield call(OneSignal.sendTag, 'user_id', res.user._id);
    navigate('MainStack');
    showMessage({
      message: 'Đăng nhập thành công',
      type: 'success',
    });
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

function* signupWorker(action) {
  try {
    yield put({ type: sharedTypes.FETCHING });
    const res = yield call(AuthService.requestSignup, action.payload);
    yield put({
      type: authTypes.REQUEST_SIGNUP_SUCCESS,
      payload: res.user,
    });
    navigate(routes.auth.signIn);
    showMessage({
      message: 'đăng ký tài khoản thành công',
      type: 'success',
    });
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

export function* signupWatcher() {
  yield takeLatest(authTypes.REQUEST_SIGNUP, signupWorker);
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
    yield put({
      type: sharedTypes.CHECK_OUT_SUCCESS,
    });
    navigate('OrderDetail', {
      orderId: res.cart._id,
    });
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

function* getOrdersWorker(action) {
  try {
    yield put({
      type: sharedTypes.FETCHING,
    });
    const orders = yield call(OrderService.fetchAllOrders);
    yield put({
      type: sharedTypes.GET_ORDERS_SUCCESS,
      payload: orders,
    });
    const cOrderId = yield select(state => state.share.orderDetail?._id);

    if (cOrderId && action.payload && cOrderId === action.payload) {
      const cartDetails = yield call(OrderService.fetchOrderDetail, cOrderId);
      yield put({
        type: sharedTypes.GET_ORDER_DETAIL_SUCCESS,
        payload: cartDetails,
      });
    }
  } catch (error) {
    console.log('auth', error);
  } finally {
    yield put({
      type: sharedTypes.DONE,
    });
  }
}

export function* getOrdersWatcher() {
  yield takeLatest(sharedTypes.GET_ORDERS, getOrdersWorker);
}

function* getOrderDetailWorker(action) {
  try {
    yield put({
      type: sharedTypes.FETCHING,
    });
    const detail = yield call(OrderService.fetchOrderDetail, action.payload);
    yield put({
      type: sharedTypes.GET_ORDER_DETAIL_SUCCESS,
      payload: detail,
    });
  } catch (error) {
    console.log('auth', error);
  } finally {
    yield put({
      type: sharedTypes.DONE,
    });
  }
}

export function* getOrderDetailWatcher() {
  yield takeLatest(sharedTypes.GET_ORDER_DETAIL, getOrderDetailWorker);
}

function* cancelOrderwWorker(action) {
  try {
    yield put({
      type: sharedTypes.FETCHING,
    });
    const user_id = yield select(state => state.auth.profile._id);
    console.log(user_id);

    yield call(OrderService.cancelOrder, {
      cart_id: action.payload,
      cart: {
        user_id: user_id,
        status: 4,
      },
    });
  } catch (error) {
    console.log('auth', error);
  } finally {
    yield put({
      type: sharedTypes.DONE,
    });
  }
}

export function* cancelOrderWatcher() {
  yield takeLatest(sharedTypes.CANCEL_ORDER, cancelOrderwWorker);
}
