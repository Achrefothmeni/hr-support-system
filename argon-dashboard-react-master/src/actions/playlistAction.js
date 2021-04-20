import {
  ADD_MUSIC_REQUEST,
  ADD_MUSIC_SUCCESS,
  ADD_MUSIC_FAIL,
} from '../constants/playlistConstant'
import { ADD_ALERT } from '../constants/alertConstant'
import axios from 'axios'
export const addSong = (song) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_MUSIC_REQUEST,
    })

    const { data } = await axios.get(`/get-mp3?vid=${song.id.videoId}`)
    console.log(data)
    dispatch({ type: ADD_MUSIC_SUCCESS, payload: data })
  } catch (err) {
    dispatch({
      type: ADD_ALERT,
      payload: { type: 'error', message: 'Failed to add Song!' },
    })
    dispatch({
      type: ADD_MUSIC_FAIL,
      payload:
        err.response && err.response.data.errMessage
          ? err.response.data.errMessagee
          : err.message,
    })
  }
}
