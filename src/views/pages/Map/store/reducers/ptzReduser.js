const initialState = {
  data: []
}

const ptz = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PTZ":
      return { ...state, data: action.data }
    case "SET_ALL_PTZ_VISIBLE":
      return { ...state, data: action.data }
    case "DELETE_ALL_PTZ":
      return { ...state, data: action.data }
    case "ZOOM_PTZ":
      return { ...state, data: action.data }
    case "ZOOM_PTZ_CANCEL":
      return { ...state, data: action.state }
    case "ALL_PTZ_ZOOM_CANCEL":
      return { ...state, data: state.data.map((ptz) => ({ ...ptz, zoomed: false })) }
    case "FILTER_PTZ":
      return { ...state, data: action.data }
    default:
      return state
  }
}

export default ptz
