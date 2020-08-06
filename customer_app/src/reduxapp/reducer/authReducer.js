export const authTypes = {
  REQUEST_LOGIN: '@AUTH/REQUEST_LOGIN',
  REQUEST_LOGIN_SUCCESS: '@AUTH/REQUEST_LOGIN_SUCCESS',
  REQUEST_LOGOUT: '@AUTH/REQUEST_LOGOUT',
  REQUEST_SIGNUP: '@AUTH/REQUEST_SIGNUP',
  REQUEST_SIGNUP_SUCCESS: '@AUTH/REQUEST_SIGNUP_SUCCESS',
};

const requestLogin = data => {
  return {
    type: authTypes.REQUEST_LOGIN,
    payload: data,
  };
};

const loginSuccess = data => {
  return {
    type: authTypes.REQUEST_LOGIN_SUCCESS,
    payload: data,
  };
};

const requestLogout = data => {
  return {
    type: authTypes.REQUEST_LOGOUT,
    payload: data,
  };
};

const requestSignup = data => {
  return {
    type: authTypes.REQUEST_SIGNUP,
    payload: data,
  };
};
const signupSuccess = data => {
  return {
    type: authTypes.REQUEST_SIGNUP_SUCCESS,
    payload: data,
  };
};

export const authActions = {
  requestLogin,
  loginSuccess,
  requestLogout,
  requestSignup,
  signupSuccess,
};

const initialState = {
  profile: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authTypes.REQUEST_LOGOUT:
      return {
        ...initialState,
      };
    case authTypes.REQUEST_LOGIN_SUCCESS:
      return {
        ...state,
        profile: action.payload,
      };
    case authTypes.REQUEST_SIGNUP_SUCCESS:
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
};
