export const sharedTypes = {
  FETCHING: '@SHARE/FETCHING',
  DONE: '@SHARE/DONE',
  FETCH_PREVIEW: '@SHARE/FETCH_PREVIEW',
  FETCH_PREVIEW_SUCCESS: '@SHARE/FETCH_PREVIEW_SUCCESS',
  FETCH_SLUG: '@SHARE/FETCH_SLUG',
  FETCH_SLUG_SUCCESS: '@SHARE/FETCH_SLUG_SUCCESS',
};

const requestLogin = data => {
  return {
    type: 'DE_QUANTITY',
    payload: data,
  };
};

const fetchPreview = () => {
  return {
    type: sharedTypes.FETCH_PREVIEW,
  };
};

const fetchSlugFoods = slugName => {
  return {
    type: sharedTypes.FETCH_PREVIEW,
    payload: slugName,
  };
};

export const sharedActions = {
  fetchPreview,
  fetchSlugFoods,
};

const initialState = {
  isFetching: false,
  categories: {},
  slugFoods: [],
};

export const sharedReducer = (state = initialState, action) => {
  switch (action.type) {
    case sharedTypes.FETCHING:
      return {
        ...state,
        isFetching: true,
      };
    case sharedTypes.FETCH_SLUG_SUCCESS:
      return {
        ...state,
        slugFoods: action.payload,
      };
    case sharedTypes.FETCH_PREVIEW_SUCCESS:
      const newObject = action.payload.reduce(
        (acc, el) => ({
          ...acc,
          [el.slug]: el.foods,
        }),
        {},
      );

      return {
        ...state,
        categories: newObject,
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
