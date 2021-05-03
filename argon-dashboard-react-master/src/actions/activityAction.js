import { ACTIVITY_LIST_FAIL, ACTIVITY_LIST_REQUEST , ACTIVITY_LIST_SUCCESS } from '../constants/activityConstants'
import axios from 'axios'



export const listActivity = () => async(dispatch) => {
 try {
     dispatch({type: ACTIVITY_LIST_REQUEST})
     const {data} = await axios.get('/api/activities')

     dispatch({type: ACTIVITY_LIST_SUCCESS, payload: data})
 } catch (error) {
     dispatch({type: ACTIVITY_LIST_FAIL, payload: error.response.data.errMessage}
        )
 }
}
