import {
  ADD_MEET_REQUEST,
  ADD_MEET_SUCCESS,
  ADD_MEET_FAIL,
  GET_MEETS_SUCCESS,
  GET_MEETS_REQUEST,
  GET_MEETS_FAIL,
} from '../constants/meetConstant'
import axios from 'axios'
import { ADD_ALERT } from '../constants/alertConstant'

export const planforMeet = (meet) => async (dispatch) => {
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

export const getMeets = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_MEETS_REQUEST,
    })

    const { data } = await axios.get('/meets')

    dispatch({ type: GET_MEETS_SUCCESS, payload: data.meets })
  } catch (err) {
    dispatch({
      type: ADD_ALERT,
      payload: { type: 'error', message: 'Fetching meets failed!' },
    })
    dispatch({
      type: GET_MEETS_FAIL,
      payload:
        err.response && err.response.data.errMessage
          ? err.response.data.errMessage
          : err.message,
    })
  }
}
