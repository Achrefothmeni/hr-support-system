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

export const listAgentsReducer = (state = { agents: [] }, action) => {
  switch (action.type) {
    case LIST_AGENT_REQUEST:
      return { ...state, loading: true }
    case LIST_AGENT_SUCCESS:
      return { ...state, loading: false, agents: action.payload }

    case LIST_AGENT_FAIL:
      return { ...state, loading: false, error: action.payload }
    case ADD_AGENT_REQUEST:
      return { ...state, loading: true }
    case ADD_AGENT_SUCCESS:
      return { loading: false, agents: [action.payload, ...state.agents] }
    case ADD_AGENT_FAIL:
      return { ...state, loading: false, error: action.payload }
    case BAN_AGENT_REQUEST:
      return { ...state, loading: true }
    case BAN_AGENT_SUCCESS:
      return {
        ...state,
        loading: false,
        agents: state.agents.map((a) => {
          if (a._id === action.payload) a.baned = true
          return a
        }),
      }

    case BAN_AGENT_FAIL:
      return { ...state, loading: false, error: action.payload }
    case UNBAN_AGENT_REQUEST:
      return { ...state, loading: true }
    case UNBAN_AGENT_SUCCESS:
      return {
        ...state,
        loading: false,
        agents: state.agents.map((a) => {
          if (a._id === action.payload) a.baned = false
          return a
        }),
      }

    case UNBAN_AGENT_FAIL:
      return { ...state, loading: false, error: action.payload }
    case REMOVE_AGENT_REQUEST:
      return { ...state, loading: true }
    case REMOVE_AGENT_SUCCESS:
      return {
        ...state,
        loading: false,
        agents: state.agents.filter((a) => a._id !== action.payload),
      }

    case REMOVE_AGENT_FAIL:
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}
