import { ACTIVITY_LIST_REQUEST, ACTIVITY_LIST_FAIL , ACTIVITY_LIST_SUCCESS , ACTIVITY_ADD_REQUEST , ACTIVITY_ADD_FAIL, ACTIVITY_ADD_SUCCESS} from '../constants/activityConstants'
export const activityReducer = (state= {activities: []}, action) => {

    switch(action.type){
        case ACTIVITY_LIST_REQUEST:
            return {loading: true, activities: []}
        case ACTIVITY_LIST_SUCCESS:
            return    {loading: false, activities: action.payload}
        case ACTIVITY_LIST_FAIL:
            return {loading: false , error: action.payload }
        default:
            return state
    }
}
