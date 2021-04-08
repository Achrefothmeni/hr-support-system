import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { settingReducer, settingAddReducer } from './reducers/settingsReducer'
import { alertsReducer } from './reducers/alertReducer'
import { profileReducer } from './reducers/profileReducer'
import { authReducer } from './reducers/userReducers'
import { listAgentsReducer } from './reducers/agentReducer'
const reducer = combineReducers({
  auth: authReducer,
  alerts: alertsReducer,
  listAgents: listAgentsReducer,
  settingList: settingReducer,
  profileList: profileReducer,
  settingAdd: settingAddReducer,
})

let initialState = {}

const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
