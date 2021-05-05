
import {
    PROFILE_LIST_FAIL,
    PROFILE_LIST_REQUEST,
    PROFILE_LIST_SUCCESS,
    SAME_PROFILE_SUCCESS,
    SAME_PROFILE_REQUEST,
    SAME_PROFILE_FAIL,
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL
} from '../constants/profileConstants'
import axios from 'axios'



export const listProfiles = () => async (dispatch) => {
    try {
        dispatch({ type: PROFILE_LIST_REQUEST })
        const { data } = await axios.get('/api/profiles')
        await console.log(data);
        dispatch({ type: PROFILE_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: PROFILE_LIST_FAIL, payload: error.response.data.errMessage }
        )
    }
}
export const listProfilesJs = () => async (dispatch) => {
    try {
        dispatch({ type: PROFILE_LIST_REQUEST })
        const { data } = await axios.get('/api/profiles/js')
        await console.log(data);
        dispatch({ type: PROFILE_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: PROFILE_LIST_FAIL, payload: error.response.data.errMessage }
        )
    }
}
export const listProfilesPhp = () => async (dispatch) => {
    try {
        dispatch({ type: PROFILE_LIST_REQUEST })
        const { data } = await axios.get('/api/profiles/php')
        await console.log(data);
        dispatch({ type: PROFILE_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: PROFILE_LIST_FAIL, payload: error.response.data.errMessage }
        )
    }
}
export const listProfilesJava = () => async (dispatch) => {
    try {
        dispatch({ type: PROFILE_LIST_REQUEST })
        const { data } = await axios.get('/api/profiles/java')
        await console.log(data);
        dispatch({ type: PROFILE_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: PROFILE_LIST_FAIL, payload: error.response.data.errMessage }
        )
    }
}
export const listProfilesSwift = () => async (dispatch) => {
    try {
        dispatch({ type: PROFILE_LIST_REQUEST })
        const { data } = await axios.get('/api/profiles/swift')
        await console.log(data);
        dispatch({ type: PROFILE_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: PROFILE_LIST_FAIL, payload: error.response.data.errMessage }
        )
    }
}
export const listProfilesAndroid = () => async (dispatch) => {
    try {
        dispatch({ type: PROFILE_LIST_REQUEST })
        const { data } = await axios.get('/api/profiles/android')
        await console.log(data);
        dispatch({ type: PROFILE_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: PROFILE_LIST_FAIL, payload: error.response.data.errMessage }
        )
    }
}
export const listProfilesPython = () => async (dispatch) => {
    try {
        dispatch({ type: PROFILE_LIST_REQUEST })
        const { data } = await axios.get('/api/profiles/python')
        await console.log(data);
        dispatch({ type: PROFILE_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: PROFILE_LIST_FAIL, payload: error.response.data.errMessage }
        )
    }
}

//version testing

export const SameProfiles = (name) => async (dispatch) => {
    try {
        dispatch({ type: SAME_PROFILE_REQUEST })
        const { data } = await axios.get('/api/getAllProfilesByName', {
            params: {
                name: name
            }
        })


        dispatch({ type: SAME_PROFILE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: SAME_PROFILE_FAIL, payload: error.response.data.errMessage }
        )
    }
}








export const getProfileDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_PROFILE_REQUEST })
        const { data } = await axios.get(`/api/profileDetail/${id}`)


        dispatch({ type: GET_PROFILE_SUCCESS, payload: data.profile })
    } catch (error) {
        dispatch({ type: GET_PROFILE_FAIL, payload: error }
        )
    }
}












