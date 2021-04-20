import {
  ADD_MUSIC_REQUEST,
  ADD_MUSIC_SUCCESS,
  ADD_MUSIC_FAIL,
  REMOVE_MUSIC,
} from '../constants/playlistConstant'

export const playlistReducer = (state = { playlist: [] }, action) => {
  switch (action.type) {
    case ADD_MUSIC_REQUEST:
      return { ...state, loading: true, error: null }
    case ADD_MUSIC_SUCCESS:
      return {
        ...state,
        loading: false,
        playlist: [...state.playlist, action.payload],
        error: null,
      }
    case ADD_MUSIC_FAIL:
      return { ...state, loading: false, error: action.payload }
    case REMOVE_MUSIC:
      return { ...state, loading: false, playlist: [...action.payload] }
    default:
      return state
  }
}
