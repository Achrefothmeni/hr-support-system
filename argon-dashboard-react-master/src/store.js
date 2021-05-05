import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { settingReducer, settingAddReducer } from './reducers/settingsReducer'
import { alertsReducer } from './reducers/alertReducer'
import { profileReducer, SameProfileReducer,DetailedProfileReducer } from './reducers/profileReducer'
import { authReducer, forgotPasswordReducer } from './reducers/userReducers'
import { statReducer } from './reducers/statsReducer'
import { listAgentsReducer } from './reducers/agentReducer'
import { meetReducer } from './reducers/meetReducer'
import { playlistReducer } from './reducers/playlistReducer'
import { activityReducer } from './reducers/activityReducer'
import { collectionReducer } from 'reducers/collectionReducer'
const reducer = combineReducers({
  auth: authReducer,
  alerts: alertsReducer,
  listAgents: listAgentsReducer,
  settingList: settingReducer,
  profileList: profileReducer,
  settingAdd: settingAddReducer,
  meet: meetReducer,
  musicList: playlistReducer,
  activityList: activityReducer,
  stats: statReducer,
  forgot: forgotPasswordReducer,
  same: SameProfileReducer,
  detail : DetailedProfileReducer,
  collection: collectionReducer,
})

let initialState = {}

const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
