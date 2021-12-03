const initialState = {
  data: [],
  finished: false
}

const inspektor = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_INSPEKTORS":
      return { ...state, data: action.data, finished: action.finished }
    case "SET_ALL_INSPEKTORS_VISIBLE":
      return { ...state, data: action.data }
    case "DELETE_ALL_INSPEKTORS":
      return { ...state, data: action.data }
    case "ZOOM_INSPEKTORS":
      return { ...state, data: action.data }
    case "ZOOM_INSPEKTORS_CANCEL":
      return { ...state, data: action.state }
    case "INSPEKTOR_FINAL_FINISHED":
      return { ...state, finished: action.finished }
    case "ALL_INSPEKTOR_ZOOM_CANCEL":
      return { ...state, data: state.data.map((r) => ({ ...r, zoomed: false })) }
    case "FILTER_INSPEKTOR":
      return { ...state, data: action.data }
    default:
      return state
  }
}

export default inspektor
