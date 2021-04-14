import {
  ADD_MEET_REQUEST,
  ADD_MEET_SUCCESS,
  ADD_MEET_FAIL,
} from '../constants/meetConstant'
import axios from 'axios'
import { ADD_ALERT, REMOVE_ERROR } from '../constants/alertConstant'

export const planforMeet = (meet) => async (dispatch) => {
  console.log(meet)
  try {
    dispatch({
      type: ADD_MEET_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post('/schedule', meet, config)
    console.log(data)
    dispatch({ type: ADD_MEET_SUCCESS, payload: data.meet })
    dispatch({
      type: ADD_ALERT,
      payload: { type: 'success', message: 'Meet planed successfully!' },
    })
  } catch (err) {
    dispatch({
      type: ADD_ALERT,
      payload: { type: 'error', message: 'Planning meet failed!' },
    })
    dispatch({
      type: ADD_MEET_FAIL,
      payload:
        err.response && err.response.data.errMessage
          ? err.response.data.errMessage
          : err.message,
    })
  }
}
