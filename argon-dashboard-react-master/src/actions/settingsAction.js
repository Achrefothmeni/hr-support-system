
import { SETTINGS_EDIT_FAIL,SETTINGS_UPDATE_RESET,SETTINGS_EDIT_SUCCESS,SETTINGS_EDIT_REQUEST,SETTINGS_DELETE_FAIL,SETTINGS_DELETE_REQUEST,SETTINGS_DELETE_SUCCESS,SETTINGS_LIST_FAIL, SETTINGS_LIST_REQUEST , SETTINGS_LIST_SUCCESS , SETTINGS_ADD_FAIL, SETTINGS_ADD_REQUEST , SETTINGS_ADD_SUCCESS } from '../constants/settingsConstants'
import axios from 'axios'



export const listSettings = () => async(dispatch) => {
 try {
     dispatch({type: SETTINGS_LIST_REQUEST})
     const {data} = await axios.get('/api/settings')

     dispatch({type: SETTINGS_LIST_SUCCESS, payload: data})
 } catch (error) {
     dispatch({type: SETTINGS_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message: error.message}
        )
 }
}


export const addSettings = (settingName,city,postalCode, country,skills) => async(dispatch) => {
    try {
        dispatch({type: SETTINGS_ADD_REQUEST})
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        const {data} = await axios.post('/api/settings/add' , {settingName,city,postalCode, country,skills} )
   
        dispatch({type: SETTINGS_ADD_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: SETTINGS_ADD_FAIL, payload: error.response && error.response.data.message ? error.response.data.message: error.message}
           )
    }
   }


   export const deleteSettings = (id) => async(dispatch) => {
    try {
        dispatch({type: SETTINGS_DELETE_REQUEST})
        const {data} = await axios.delete(`/api/settings/delete/${id}`)
   
        dispatch({type: SETTINGS_DELETE_SUCCESS})
    } catch (error) {
        dispatch({type: SETTINGS_DELETE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message: error.message}
           )
    }
   }

   export const updateSettings = (setting) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SETTINGS_EDIT_REQUEST,
      })
  
  
  
 
  
      const { data } = await axios.put(
        `/api/settings/edit/${setting._id}`,
        setting
      )
  
      dispatch({
        type: SETTINGS_EDIT_SUCCESS,
        payload: data,
      })
      dispatch({ type: SETTINGS_EDIT_SUCCESS, payload: data })
    } catch (error) {
      
      dispatch({
        type: SETTINGS_EDIT_FAIL,
       
      })
    }
  }

    
