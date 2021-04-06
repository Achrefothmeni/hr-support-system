import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';


import{authReducer} from './reducers/userReducers'
import { listAgentsReducer } from './reducers/agentReducer'
const reducer = combineReducers({

auth:authReducer,listAgents: listAgentsReducer,

})

let initialState = {}

const middleware = [thunk];
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

export default store;

