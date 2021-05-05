import { SETTINGS_UPDATE_RESET,SETTINGS_EDIT_FAIL,SETTINGS_EDIT_REQUEST,SETTINGS_EDIT_SUCCESS,SETTINGS_DELETE_FAIL,SETTINGS_DELETE_REQUEST,SETTINGS_DELETE_SUCCESS,SETTINGS_LIST_REQUEST, SETTINGS_LIST_FAIL , SETTINGS_LIST_SUCCESS , SETTINGS_ADD_REQUEST , SETTINGS_ADD_FAIL, SETTINGS_ADD_SUCCESS} from '../constants/settingsConstants'
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

export const settingDeleteReducer = (state= {}, action) => {

    switch(action.type){
        case SETTINGS_DELETE_REQUEST:
            return {loading: true, }
        case SETTINGS_DELETE_SUCCESS:
            return    {loading: false, success: true}
        case SETTINGS_DELETE_FAIL:
            return {loading: false , error: action.payload }
        default:
            return state        
    }
}


export const settingUpdateReducer = (state = { setting: {} }, action) => {
    switch (action.type) {
      case SETTINGS_EDIT_REQUEST:
        return { loading: true }
      case SETTINGS_EDIT_SUCCESS:
        return { loading: false, success: true, setting: action.payload }
      case SETTINGS_EDIT_FAIL:
        return { loading: false, error: action.payload }
      case SETTINGS_UPDATE_RESET:
        return { setting: {} }
      default:
        return state
    }
  }