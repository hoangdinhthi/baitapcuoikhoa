import { combineReducers } from 'redux'
import userReducer from './user/reducer'
import appInfoReducer from './appInfo/reducer'

const rootReducer = combineReducers({
  user: userReducer,
  appInfo: appInfoReducer,
})

export default rootReducer 
