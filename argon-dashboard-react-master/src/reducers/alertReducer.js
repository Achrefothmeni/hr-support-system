import { ADD_ALERT, REMOVE_ERROR } from '../constants/alertConstant'

export const alertsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ALERT:
      return { ...state, error: action.payload }
    case REMOVE_ERROR:
      return { ...state, error: null }
    default:
      return state
  }
}
