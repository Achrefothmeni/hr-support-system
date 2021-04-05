import {
  LIST_AGENT_REQUEST,
  LIST_AGENT_SUCCESS,
  LIST_AGENT_FAIL,
  ADD_AGENT_FAIL,
  ADD_AGENT_REQUEST,
  ADD_AGENT_SUCCESS,
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
    default:
      return state
  }
}
