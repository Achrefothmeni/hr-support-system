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
        case SAME_PROFILE_REQUEST:
            return { loading: true, profiles: [] }
        case PROFILE_LIST_SUCCESS:
        case SAME_PROFILE_SUCCESS:
            return { loading: false, profiles: action.payload }
        case PROFILE_LIST_FAIL:
        case SAME_PROFILE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}