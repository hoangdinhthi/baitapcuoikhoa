export const sharedTypes = {
  FETCHING: '@SHARE/FETCHING',
  DONE: '@SHARE/DONE',
  FETCH_PREVIEW: '@SHARE/FETCH_PREVIEW',
  FETCH_PREVIEW_SUCCESS: '@SHARE/FETCH_PREVIEW_SUCCESS',
  FETCH_SLUG: '@SHARE/FETCH_SLUG',
  FETCH_SLUG_SUCCESS: '@SHARE/FETCH_SLUG_SUCCESS',
  FETCH_FOODS_PREVIEW: '@SHARE/FETCH_FOODS_PREVIEW',
  FETCH_FOODS_SUCCESS: '@SHARE/FETCH_FOODS_SUCCESS',
  CHECK_OUT: '@SHARE/CHECK_OUT',
  CHECK_OUT_SUCCESS: '@SHARE/CHECK_OUT_SUCCESS',
  GET_ORDERS: '@SHARE/GET_ORDERS',
  GET_ORDERS_SUCCESS: '@SHARE/GET_ORDERS_SUCCESS',
  GET_ORDER_DETAIL: '@SHARE/GET_ORDER_DETAIL',
  GET_ORDER_DETAIL_SUCCESS: '@SHARE/GET_ORDER_DETAIL_SUCCESS',
  CANCEL_ORDER: '@SHARE/CANCEL_ORDER',
  CANCEL_ORDER_SUCCESS: '@SHARE/CANCEL_ORDER_SUCCESS',
};

const checkout = data => {
  return {
    type: sharedTypes.CHECK_OUT,
    payload: data,
  };
};
const cancelOrder = idCart => {
  return {
    type: sharedTypes.CANCEL_ORDER,
    payload: idCart,
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
const fetchOrders = () => {
  return {
    type: sharedTypes.GET_ORDERS,
  };
};
const fetchOrderDetail = orderId => {
  return {
    type: sharedTypes.GET_ORDER_DETAIL,
    payload: orderId,
  };
};

export const sharedActions = {
  fetchPreview,
  fetchSlugFoods,
  fetchFoodPreview,
  checkout,
  fetchOrders,
  fetchOrderDetail,
  cancelOrder,
};

const initialState = {
  isFetching: false,
  categories: {},
  slugFoods: [],
  foods: [],
  cartDetail: null,
  orders: [],
  orderDetail: null,
};

export const sharedReducer = (state = initialState, action) => {
  switch (action.type) {
    case sharedTypes.FETCHING:
      return {
        ...state,
        isFetching: true,
      };
    case sharedTypes.GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
      };
    case sharedTypes.GET_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        orderDetail: action.payload,
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
