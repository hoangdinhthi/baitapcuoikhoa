import { combineReducers } from 'redux';

import arrWordReducer from './arrWordReducer';
import filterStatusReducer from './filterStatusReducer';
import isAddingReducer from './isAddingReducer';
import cartItemReducer from './cartItemReducer';
import { sharedReducer } from './sharedReducer';
import { authReducer } from './authReducer';

const reducer = combineReducers({
  arrWords: arrWordReducer,
  filterStatus: filterStatusReducer,
  isAdding: isAddingReducer,
  cartItems: cartItemReducer,
  share: sharedReducer,
  auth: authReducer,
});
export default reducer;
