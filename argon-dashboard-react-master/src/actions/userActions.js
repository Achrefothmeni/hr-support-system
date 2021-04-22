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
    GET_TAGS_SUCCESS,
    GET_TAGS_REQUEST,
    GET_TAGS_FAIL,
    CLEAR_ERRORS

} from '../constants/userConstants'
import { ToastContainer, toast } from 'react-toastify';


//login request

export const register = (name, organisationName, email, password, phoneNumber) => async (dispatch) => {

    try {

        dispatch({
            type: REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/register', { name, organisationName, email, password, phoneNumber }, config)


        if (data.user) {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: data.user
            })
        }

        toast.success(`🦄 Weclome to HR support `, {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,

        });




    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data.errMessage
        })

        const customId = "custom-id-yes";
        toast.error(error.response.data.errMessage, {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: customId
        });


    }

}




export const login = (email, password) => async (dispatch) => {

    try {

        dispatch({
            type: LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/login', { email, password }, config)


        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })



        toast.success(`🦄 Weclome Back ${data.user.name} `, {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,

        });







    } catch (error) {
        console.log(error.response.data);
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.errMessage
        })
        const customId = "custom-id-yes";
        toast.error(error.response.data.errMessage, {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: customId

        });

    }

}

//laad user

export const loadUser = () => async (dispatch) => {

    try {

        dispatch({
            type: LOAD_USER_REQUEST
        })



        const { data } = await axios.get('/me')

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


        const { data } = await axios.get('/logout')

        dispatch({
            type: LOGOUT_SUCCESS
        })

        toast.success(`👋 Logout successful `, {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,

        });




    } catch (error) {
        console.log(error.response.data);
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.errMessage
        })

    }

}



export const updateUser = (user, name, organisationName, email, phoneNumber) => async (dispatch) => {

    try {

        dispatch({
            type: UPDATE_USER_REQUEST,
            payload: user
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put('/me/update', { name, organisationName, email, phoneNumber }, config)


        if (data.user) {
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: data.user
            })
        }




    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.errMessage
        })
    }

}



//clear errors

export const clearErrors = () => async (dispatch) => {

    dispatch({
        type: CLEAR_ERRORS
    })

}


export const getTags = (startDate,endDate) => async (dispatch) => {

    try {

        dispatch({
            type: GET_TAGS_REQUEST
        })

        

        const { data } = await axios.get('https://api.stackexchange.com/2.2/tags?order=desc&sort=popular&site=stackoverflow', {
           params: {
                fromdate: startDate,
                todate : endDate
            }
        })


        //const {data} = await axios.get('https://api.stackexchange.com/2.2/tags?fromdate='+{startDate},'&todate='+{endDate},'&order=desc&sort=popular&site=stackoverflow')

        dispatch({
            type: GET_TAGS_SUCCESS,
            payload: data.items
        })











    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_TAGS_FAIL,
            payload: error
        })
        


    }

}

/* export const getUsersByName = () => async (name) => {
    try {


      const { data } = await axios.get('admin/usersByName?name=amineee')
      dispatch({ type: LIST_AGENT_SUCCESS, payload: [...data.users] })
    } catch (err) {
      dispatch({
        type: LIST_AGENT_FAIL,
        payload:
          err.response && err.response.data.errMessage
            ? err.response.data.errMessage
            : err.message,
      })
    }
  } */
