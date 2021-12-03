const initialState = {
  data: [],
  video_effect: false,
  finished: false
}

const perimeter = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PERIMETER":
      return { ...state, data: action.data, finished: action.finished }
    case "SET_ALL_PERIMETER_VISIBLE":
      return { ...state, data: action.data }
    case "DELETE_ALL_PERIMETER":
      return { ...state, data: action.data, video_effect: false }
    case "ZOOM_PERIMETER":
      return { ...state, data: action.data }
    case "ZOOM_PERIMETER_CANCEL":
      return { ...state, data: action.state }
    case "PERIMETRE_VIDEO_EFFECT":
      return { ...state, video_effect: action.val }
    case "ALL_PERIMETRE_ZOOM_CANCEL":
      return { ...state, data: state.data.map((p) => ({ ...p, zoomed: false })) }
    case "FINAL_PERIMETER_FINISHED":
      return { ...state, finished: action.finished }
    case "FILTER_PERIMETER":
      return { ...state, data: action.data }
    default:
      return state
  }
}

export default perimeter
