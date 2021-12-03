const initialState = {
  rules: [],
  crossroad: [],
  computers: [],
  cameras: [],
  data: [],
  count: 0
}

const lochinKoz = (state = initialState, action) => {
  switch (action.type) {
    case "GET_RULES":
      return { ...state, rules: action.data }
    case "GET_CROSSROAD":
      return { ...state, crossroad: action.data }
    case "GET_COMPUTES_BY_CROSSROAD":
      return { ...state, computers: action.data }
    case "GET_CAMERAS_BY_COMPUTER":
      return { ...state, cameras: action.data }
    case "GET_SEARCH":
      return { ...state, data: action.data.data, count: action.data.props }

    default:
      return state
  }
}

export default lochinKoz
