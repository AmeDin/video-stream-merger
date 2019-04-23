import configReducer from './configReducer'
import videoReducer from './videoReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  config: configReducer,
  video: videoReducer
});

export default rootReducer