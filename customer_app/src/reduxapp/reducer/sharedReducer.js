export const sharedTypes = {
  FETCHING: '@SHARE/FETCHING',
  DONE: '@SHARE/DONE',
  FETCH_PREVIEW: '@SHARE/FETCH_PREVIEW',
  FETCH_PREVIEW_SUCCESS: '@SHARE/FETCH_PREVIEW_SUCCESS',
  FETCH_SLUG: '@SHARE/FETCH_SLUG',
  FETCH_SLUG_SUCCESS: '@SHARE/FETCH_SLUG_SUCCESS',
  FETCH_FOODS_PREVIEW: '@SHARE/FETCH_FOODS_PREVIEW',
  FETCH_FOODS_SUCCESS: '@SHARE/FETCH_FOODS_SUCCESS',
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
    type: sharedTypes.FETCH_SLUG,
    payload: slugName,
  };
};
const fetchFoodPreview = () => {
  return {
    type: sharedTypes.FETCH_FOODS_PREVIEW,
  };
};

export const sharedActions = {
  fetchPreview,
  fetchSlugFoods,
  fetchFoodPreview,
};

const initialState = {
  isFetching: false,
  categories: {},
  slugFoods: [],
  foods: [],
};

export const sharedReducer = (state = initialState, action) => {
  switch (action.type) {
    case sharedTypes.FETCHING:
      return {
        ...state,
        isFetching: true,
      };
    case sharedTypes.FETCH_FOODS_SUCCESS:
      return {
        ...state,
        foods: action.payload,
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
