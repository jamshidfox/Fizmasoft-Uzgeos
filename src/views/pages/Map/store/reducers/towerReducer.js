const initialState = {
  data: []
}

const tower = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TOWER":
      return { ...state, data: action.data }
    case "SET_ALL_TOWER_VISIBLE":
      return { ...state, data: action.data }
    case "DELETE_ALL_TOWER":
      return { ...state, data: action.data }
    case "ZOOM_TOWER":
      return { ...state, data: action.data }
    case "ZOOM_TOWER_CANCEL":
      return { ...state, data: action.state }
    case "ALL_TOWER_ZOOM_CANCEL":
      return { ...state, data: state.data.map((tower) => ({ ...tower, zoomed: false })) }
    case "FILTER_TOWER":
      return { ...state, data: action.data }
    default:
      return state
  }
}

export default tower
