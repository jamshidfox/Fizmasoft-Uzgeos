const initialState = {
  data: [],
  video_effect: false,
  finished: false
}

const radar = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_RADAR":
      return { ...state, data: action.data, finished: action.finished }
    case "SET_ALL_RADAR_VISIBLE":
      return { ...state, data: action.data }
    case "DELETE_ALL_RADAR":
      return { ...state, data: action.data, video_effect: false }
    case "ZOOM_RADAR":
      return { ...state, data: action.data }
    case "ZOOM_RADAR_CANCEL":
      return { ...state, data: action.state }
    case "RADAR_VIDEO_EFFECT":
      return { ...state, video_effect: action.val }
    case "ALL_RADAR_ZOOM_CANCEL":
      return { ...state, data: state.data.map((r) => ({ ...r, zoomed: false })) }
    case "RADAR_FINAL_FINISHED":
      return { ...state, finished: action.finished }
    case "FILTER_RADAR":
      return { ...state, data: action.data }
    default:
      return state
  }
}

export default radar
