import configReducer from './configReducer'
import videoReducer from './videoReducer'
import usersReducer from './usersReducer'
import messageReducer from './messageReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  config: configReducer,
  video: videoReducer,
  users: usersReducer,
  messages: messageReducer
});

export default rootReducer