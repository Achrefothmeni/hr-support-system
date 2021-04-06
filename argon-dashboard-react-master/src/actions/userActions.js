import axios from 'axios'
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
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    CLEAR_ERRORS

} from '../constants/userConstants'


//login request

export const register = (name,organisationName,email, password,phoneNumber) => async (dispatch) => {

    try {

        dispatch({
            type: REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        const {data} = await axios.post('/register' , {name,organisationName,email, password,phoneNumber},config)


        if(data.user){
        dispatch({
            type: REGISTER_SUCCESS,
            payload: data.user
        })}




    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data.errMessage
        })
    }

}




export const login = (email, password) => async (dispatch) => {

    try {

        dispatch({
            type: LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        const {data} = await axios.post('/login' , {email,password},config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })




    } catch (error) {
        console.log(error.response.data);
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.errMessage
        })

    }

}

//laad user

export const loadUser = () => async (dispatch) => {

    try {

        dispatch({
            type: LOAD_USER_REQUEST
        })

    

        const {data} = await axios.get('/me')

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })




    } catch (error) {
        console.log(error.response.data);
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.errMessage
        })

    }

}




//logout user

export const logout = () => async (dispatch) => {

    try {

        
    

        const {data} = await axios.get('/logout')

        dispatch({
            type: LOGOUT_SUCCESS
        })




    } catch (error) {
        console.log(error.response.data);
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.errMessage
        })

    }

}



export const updateUser = (name,organisationName,email,phoneNumber) => async (dispatch) => {

    try {

        dispatch({
            type: UPDATE_USER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        const {data} = await axios.put('/me/update' , {name,organisationName,email,phoneNumber},config)


        if(data.user){
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.user
        })}




    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.errMessage
        })
    }

}



//clear errors

export const clearErrors = () => async(dispatch) => {

    dispatch({
        type: CLEAR_ERRORS
    })

}