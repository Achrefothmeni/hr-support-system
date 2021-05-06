import {
  ADD_MEET_REQUEST,
  ADD_MEET_SUCCESS,
  ADD_MEET_FAIL,
  GET_MEETS_SUCCESS,
  GET_MEETS_REQUEST,
  GET_MEETS_FAIL,
  CANCEL_MEET_REQUEST,
  CANCEL_MEET_SUCCESS,
  CANCEL_MEET_FAIL,
  ADD_FOR_MEET,
} from '../constants/meetConstant'

export const meetReducer = (state = { meets: [] }, action) => {
  switch (action.type) {
    case ADD_MEET_REQUEST:
      return { ...state, loading: true, error: null }
    case ADD_MEET_SUCCESS:
      return {
        ...state,
        meets: [action.payload, ...state.meets],
        loading: false,
        error: null,
      }
    case ADD_MEET_FAIL:
      return { ...state, error: action.payload, loading: false }
    case GET_MEETS_SUCCESS:
      return {
        ...state,
        meets: action.payload,
        loading: false,
        error: null,
      }
    case GET_MEETS_REQUEST:
      return { ...state, loading: true, error: null }
    case GET_MEETS_FAIL:
      return { ...state, error: action.payload, loading: false }
    case CANCEL_MEET_REQUEST:
      return { ...state, loading: true, error: null }
    case CANCEL_MEET_SUCCESS:
      return {
        ...state,
        meets: [...state.meets.filter((e) => e._id !== action.payload)],
        loading: false,
        error: null,
      }
    case ADD_FOR_MEET:
      return { ...state, meetProfile: action.payload }
    case CANCEL_MEET_FAIL:
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}
