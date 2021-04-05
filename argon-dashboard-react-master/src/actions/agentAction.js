import {
  LIST_AGENT_REQUEST,
  LIST_AGENT_SUCCESS,
  LIST_AGENT_FAIL,
  ADD_AGENT_FAIL,
  ADD_AGENT_REQUEST,
  ADD_AGENT_SUCCESS,
} from '../constants/agentConstants'
import axios from 'axios'

export const getAgents = () => async (dispatch) => {
  try {
    dispatch({
      type: LIST_AGENT_REQUEST,
    })

    const { data } = await axios.get('/get-hrs-test')
    dispatch({ type: LIST_AGENT_SUCCESS, payload: [...data.users] })
  } catch (err) {
    dispatch({
      type: LIST_AGENT_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const addhr = (hr) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_AGENT_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post('/add-hr-test', hr, config)

    dispatch({ type: ADD_AGENT_SUCCESS, payload: data.user })
  } catch (err) {
    dispatch({
      type: ADD_AGENT_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}
