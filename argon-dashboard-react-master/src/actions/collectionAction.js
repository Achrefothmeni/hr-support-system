import {
  LIST_COLLECTIONS_REQUEST,
  LIST_COLLECTIONS_SUCCESS,
  LIST_COLLECTIONS_FAIL,
  LIST_CONTENT_SUCCESS,
  LIST_CONTENT_REQUEST,
  LIST_CONTENT_FAIL,
  ADD_COLLECTION_REQUEST,
  ADD_COLLECTION_SUCCESS,
  ADD_COLLECTION_FAIL,
  ADD_RATE_REQUEST,
  ADD_RATE_SUCCESS,
  ADD_RATE_FAIL,
  UPDATE_RATE_SUCCESS,
  UPDATE_RATE_REQUEST,
  UPDATE_RATE_FAIL,
} from '../constants/collectionConstants'
import axios from 'axios'
export const getCollections = () => async (dispatch) => {
  try {
    dispatch({
      type: LIST_COLLECTIONS_REQUEST,
    })

    const { data } = await axios.get('/collections')
    dispatch({ type: LIST_COLLECTIONS_SUCCESS, payload: [...data.collection] })
  } catch (err) {
    dispatch({
      type: LIST_COLLECTIONS_FAIL,
      payload:
        err.response && err.response.data.errMessage
          ? err.response.data.errMessage
          : err.message,
    })
  }
}
export const getContent = (c) => async (dispatch) => {
  try {
    dispatch({
      type: LIST_CONTENT_REQUEST,
    })

    const { data } = await axios.get(`/selection/${c._id}`)
    dispatch({ type: LIST_CONTENT_SUCCESS, payload: [...data.selected] })
  } catch (err) {
    dispatch({
      type: LIST_CONTENT_FAIL,
      payload:
        err.response && err.response.data.errMessage
          ? err.response.data.errMessage
          : err.message,
    })
  }
}

export const addCol = (c) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_COLLECTION_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post('/collections', c, config)
    dispatch({ type: ADD_COLLECTION_SUCCESS, payload: data.collection })
  } catch (err) {
    dispatch({
      type: ADD_COLLECTION_FAIL,
      payload:
        err.response && err.response.data.errMessage
          ? err.response.data.errMessage
          : err.message,
    })
  }
}

export const subRate = (r, id) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_RATE_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(`/ratings/${id}`, r, config)

    dispatch({ type: ADD_RATE_SUCCESS, payload: data.selected })
  } catch (err) {
    dispatch({
      type: ADD_RATE_FAIL,
      payload:
        err.response && err.response.data.errMessage
          ? err.response.data.errMessage
          : err.message,
    })
  }
}

export const updateRate = (r, id) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_RATE_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.put(`/ratings/${id}/${r._id}`, r, config)

    dispatch({ type: LIST_CONTENT_REQUEST, payload: data.selected })
  } catch (err) {
    dispatch({
      type: UPDATE_RATE_FAIL,
      payload:
        err.response && err.response.data.errMessage
          ? err.response.data.errMessage
          : err.message,
    })
  }
}
