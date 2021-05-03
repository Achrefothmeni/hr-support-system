import {
    PROFILE_LIST_REQUEST,
    PROFILE_LIST_FAIL,
    PROFILE_LIST_SUCCESS,
    SAME_PROFILE_REQUEST,
    SAME_PROFILE_SUCCESS,
    SAME_PROFILE_FAIL
} from '../constants/profileConstants'
export const profileReducer = (state = { profiles: [] }, action) => {

    switch (action.type) {
        case PROFILE_LIST_REQUEST:
        
            return { loading: true, profiles: [] }
        case PROFILE_LIST_SUCCESS:
        
            return { loading: false, profiles: action.payload }
        case PROFILE_LIST_FAIL:
        
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const SameProfileReducer = (state = { sameProfiles: [] }, action) => {

    switch (action.type) {
        
        case SAME_PROFILE_REQUEST:
            return { 
                loading: true, 
                sameProfiles: [] }
        
        case SAME_PROFILE_SUCCESS:
            return {...state,
                 loading: false,
                 sameProfiles: action.payload }
       
        case SAME_PROFILE_FAIL:
            return { loading: false,
                 error: action.payload }
        default:
            return state
    }
}