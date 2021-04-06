import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {settingReducer , settingAddReducer} from './reducers/settingsReducer'
import {profileReducer} from './reducers/profileReducer'
const reducer = combineReducers({settingList : settingReducer, profileList : profileReducer , settingAdd : settingAddReducer })
const middleware = [thunk]
const initialState = {}
const store = createStore(reducer , initialState , composeWithDevTools(applyMiddleware(...middleware)))

export default store