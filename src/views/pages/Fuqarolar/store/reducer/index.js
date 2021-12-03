// ** Initial state
const initialState = {
  data: [],
  userDetails: [],
  userLocation: [],
  userAge: [],
  count: 0
}

const fuqarolarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_FUQAROLAR":
      return { ...state, data: action.data.data, count: action.data.count }
    case "GET_USERS_DETAILS":
      return { ...state, userDetails: action.data.data }
    case "GET_USERS_AGE":
      return { ...state, userAge: action.data }
    case "GET_USERS_LOCATION":
      return { ...state, userLocation: action.data.data }

    default:
      return state
  }
}

export default fuqarolarReducer
