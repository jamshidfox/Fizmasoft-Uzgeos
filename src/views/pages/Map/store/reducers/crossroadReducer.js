const initialState = {
  data: [],
  video_effect: false,
  finished: false
}

const crossroad = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CROSSROAD":
      return { ...state, data: action.data, finished: action.finished }
    case "SET_ALL_CROSSROAD_VISIBLE":
      return { ...state, data: action.data }
    case "DELETE_ALL_CROSSROAD":
      return { ...state, data: action.data, video_effect: false }
    case "ZOOM_CROSSROAD":
      return { ...state, data: action.data }
    case "ZOOM_CROSSROAD_CANCEL":
      return { ...state, data: action.state }
    case "CROSSROAD_VIDEO_EFFECT":
      return { ...state, video_effect: action.val }
    case "ALL_CROSSROAD_ZOOM_CANCEL":
      return { ...state, data: state.data.map((c) => ({ ...c, zoomed: false })) }
    case "CROSSROAD_FINAL_FINISHED":
      return { ...state, finished: action.finished }
    case "FILTER_CROSSROAD":
      return { ...state, data: action.data }
    default:
      return state
  }
}

export default crossroad
