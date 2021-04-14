import {
  ADD_MEET_REQUEST,
  ADD_MEET_SUCCESS,
  ADD_MEET_FAIL,
} from '../constants/meetConstant'

export const meetReducer = (state = { meets: [] }, action) => {
  switch (action.type) {
    case ADD_MEET_REQUEST:
      return { ...state, loading: true }
    case ADD_MEET_SUCCESS:
      return {
        ...state,
        meets: [action.payload, ...state.meets],
        loading: false,
      }
    case ADD_MEET_FAIL:
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}
