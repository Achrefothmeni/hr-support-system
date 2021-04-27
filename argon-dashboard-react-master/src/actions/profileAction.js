
import { PROFILE_LIST_FAIL, PROFILE_LIST_REQUEST , PROFILE_LIST_SUCCESS } from '../constants/profileConstants'
import axios from 'axios'



export const listProfiles = () => async(dispatch) => {
 try {
     dispatch({type: PROFILE_LIST_REQUEST})
     const {data} = await axios.post('http://127.0.0.1:8000/recommendation')
     await console.log(data);
     dispatch({type: PROFILE_LIST_SUCCESS, payload: data})
 } catch (error) {
     dispatch({type: PROFILE_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message: error.message}
        )
 }
}




    
