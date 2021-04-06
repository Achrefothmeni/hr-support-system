import { SETTINGS_LIST_REQUEST, SETTINGS_LIST_FAIL , SETTINGS_LIST_SUCCESS , SETTINGS_ADD_REQUEST , SETTINGS_ADD_FAIL, SETTINGS_ADD_SUCCESS} from '../constants/settingsConstants'
export const settingReducer = (state= {settings: []}, action) => {

    switch(action.type){
        case SETTINGS_LIST_REQUEST:
            return {loading: true, settings: []}
        case SETTINGS_LIST_SUCCESS:
            return    {loading: false, settings: action.payload}
        case SETTINGS_LIST_FAIL:
            return {loading: false , error: action.payload }
        default:
            return state        
    }
}

export const settingAddReducer = (state = {}, action) => {

    switch(action.type){
        case SETTINGS_ADD_REQUEST:
            return {loading: true }
        case SETTINGS_ADD_SUCCESS:
            return    {loading: false, settings: action.payload}
        case SETTINGS_ADD_FAIL:
            return {loading: false , error: action.payload }
        default:
            return state        
    }
}