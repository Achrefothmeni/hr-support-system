import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,

    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,

    CLEAR_ERRORS,
    GET_TAGS_SUCCESS,
    GET_TAGS_REQUEST,
    GET_TAGS_FAIL,

} from '../constants/userConstants'


export const authReducer = (state = { user: {} }, action) => {

    switch (action.type) {

        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
        case NEW_PASSWORD_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
            }
        case UPDATE_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: true,
                user: action.payload

            }

        case NEW_PASSWORD_SUCCESS:
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:

            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }

        case UPDATE_USER_SUCCESS:
            return {

                loading: false,
                isAuthenticated: true,
                user: action.payload
            }

        case NEW_PASSWORD_FAIL:
        case LOAD_USER_FAIL:
        case UPDATE_USER_FAIL:

            return {

                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }


        case LOGIN_FAIL:
        case REGISTER_FAIL:

            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                errorAuth: action.payload
            }


        case LOGOUT_REQUEST:
            return {

                loading: true,
                isAuthenticated: true,

            }

        case LOGOUT_SUCCESS:
            return {

                loading: false,
                isAuthenticated: false,
                user: null,

            }

        case LOGOUT_FAIL: {
            return {
                ...state,
                error: action.payload
            }
        }


        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }


        /* case GET_TAGS_REQUEST:
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
                error: action.payload
            }
 */

        default:
            return state
    }
}


export const forgotPasswordReducer = (state = {}, action) => {

    switch (action.type) {


        case FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null

            }


        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            }


        case FORGOT_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }



        default:
            return state
    }
}