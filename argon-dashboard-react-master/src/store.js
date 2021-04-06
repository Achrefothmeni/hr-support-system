import { createStore, combineReducers, applyMiddleware } from 'redux'
import { listAgentsReducer } from './reducers/agentReducer'
import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  listAgents: listAgentsReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
