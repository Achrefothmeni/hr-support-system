import {
  LIST_AGENT_REQUEST,
  LIST_AGENT_SUCCESS,
  LIST_AGENT_FAIL,
  ADD_AGENT_FAIL,
  ADD_AGENT_REQUEST,
  ADD_AGENT_SUCCESS,
  BAN_AGENT_REQUEST,
  BAN_AGENT_SUCCESS,
  BAN_AGENT_FAIL,
  UNBAN_AGENT_REQUEST,
  UNBAN_AGENT_SUCCESS,
  UNBAN_AGENT_FAIL,
  REMOVE_AGENT_REQUEST,
  REMOVE_AGENT_SUCCESS,
  REMOVE_AGENT_FAIL,
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

export const banHr = (id) => async (dispatch) => {
  try {
    dispatch({
      type: BAN_AGENT_REQUEST,
    })

    const { data } = await axios.put(`/ban-hr-test/${id}`)
    if (data.msg === 'hr baned')
      dispatch({ type: BAN_AGENT_SUCCESS, payload: id })
  } catch (err) {
    dispatch({
      type: BAN_AGENT_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const unbanHr = (id) => async (dispatch) => {
  try {
    dispatch({
      type: UNBAN_AGENT_REQUEST,
    })

    const { data } = await axios.put(`/unban-hr-test/${id}`)
    if (data.msg === 'hr unbaned')
      dispatch({ type: UNBAN_AGENT_SUCCESS, payload: id })
  } catch (err) {
    dispatch({
      type: UNBAN_AGENT_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const removeHr = (id) => async (dispatch) => {
  try {
    dispatch({
      type: REMOVE_AGENT_REQUEST,
    })

    const { data } = await axios.delete(`/remove-hr-test/${id}`)

    dispatch({ type: REMOVE_AGENT_SUCCESS, payload: data.removed._id })
  } catch (err) {
    dispatch({
      type: REMOVE_AGENT_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}
