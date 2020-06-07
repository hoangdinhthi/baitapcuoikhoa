export const authTypes = {
  REQUEST_LOGIN: '@AUTH/REQUEST_LOGIN',
  REQUEST_LOGIN_SUCCESS: '@AUTH/REQUEST_LOGIN_SUCCESS',
  REQUEST_LOGOUT: '@AUTH/REQUEST_LOGOUT',
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

export const authActions = {
  requestLogin,
  loginSuccess,
  requestLogout,
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
    default:
      return state;
  }
};
