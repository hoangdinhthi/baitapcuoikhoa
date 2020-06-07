export const sharedTypes = {
  FETCHING: '@SHARE/FETCHING',
  DONE: '@SHARE/DONE',
};

const requestLogin = data => {
  return {
    type: 'DE_QUANTITY',
    payload: data,
  };
};

const initialState = {
  isFetching: false,
};

export const sharedReducer = (state = initialState, action) => {
  switch (action.type) {
    case sharedTypes.FETCHING:
      return {
        ...state,
        isFetching: true,
      };
    case sharedTypes.DONE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};
