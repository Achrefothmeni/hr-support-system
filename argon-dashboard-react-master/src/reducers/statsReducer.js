import {
   
    GET_TAGS_SUCCESS,
    GET_TAGS_REQUEST,
    GET_TAGS_FAIL,

} from '../constants/statsConstants'





export const statReducer = (state = { tags: {} }, action) => {

    switch (action.type) {

        case GET_TAGS_REQUEST:
            return {
                loadingTags: true,
                tags: null
            }
        case GET_TAGS_SUCCESS:
            return {
               
                loadingTags: false,
                tags: action.payload
            }
        case GET_TAGS_FAIL:
            return {
                loadingTags: false,
                tags: null,
                statsError: action.payload
            }


        default:
            return state
    }
}