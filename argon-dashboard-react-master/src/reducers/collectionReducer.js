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

export const collectionReducer = (
  state = { collections: [], content: [] },
  action
) => {
  switch (action.type) {
    case LIST_COLLECTIONS_REQUEST:
      return { ...state, loading: true, error: null }
    case LIST_COLLECTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        collections: action.payload,
        error: null,
      }

    case LIST_COLLECTIONS_FAIL:
      return { ...state, loading: false, error: action.payload }
    case LIST_CONTENT_REQUEST:
      return { ...state, loading: true, error: null }
    case LIST_CONTENT_SUCCESS:
      return { ...state, loading: false, content: action.payload, error: null }
    case LIST_CONTENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case ADD_COLLECTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case ADD_COLLECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        collections: [action.payload, ...state.collections],
        error: null,
      }
    case ADD_COLLECTION_FAIL:
      return { ...state, loading: false, error: action.payload }
    case ADD_RATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case ADD_RATE_SUCCESS:
      return {
        ...state,
        loading: false,
        content: [
          ...state.content.map((e) => {
            if (e._id == action.payload._id) e = action.payload
            return e
          }),
        ],
        error: null,
      }
    case ADD_RATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case UPDATE_RATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case UPDATE_RATE_SUCCESS:
      return {
        ...state,
        loading: false,
        content: [
          ...state.content.map((e) => {
            if (e.id == action.payload._id) e = action.payload
            return e
          }),
        ],
      }
    case UPDATE_RATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
