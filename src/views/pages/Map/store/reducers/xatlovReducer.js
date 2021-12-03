const initialState = {
  cond: false,
  loading: false,
  latlng: [],
  houses: [],
  business: []
}

const xatlov = (state = initialState, action) => {
  switch (action.type) {
    case "XATLOV_LOADING":
      return { ...state, loading: action.val }
    case "XATLOV_ACTIVATE":
      return { ...state, cond: true }
    case "XATLOV_SET_POSITION":
      return { ...state, latlng: action.val }
    case "XATLOV_INACTIVATE":
      return { ...state, cond: false }
    case "INSERT_XATLOV_TURAR":
      return { ...state, houses: action.val }
    case "INSERT_XATLOV_NOTURAR":
      return { ...state, business: action.val }
    default:
      return state
  }
}

export default xatlov
