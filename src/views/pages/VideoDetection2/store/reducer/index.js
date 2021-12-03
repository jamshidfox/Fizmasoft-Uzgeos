const initialState = {
  videoDetectionFace: null, // no need after some time
  channel: null,
  humanResults: null,
  faceResults: null,
  activeTab: null,
  devices: null
}

const videoDetectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_VIDEODETECTION_FACE":
      return { ...state, videoDetectionFace: action.data }
    case "SET_VIDEODETECTION_CHANNEL":
      return { ...state, channel: action.data }
    case "SET_VIDEODETECTION_DEVICES":
      return { ...state, devices: action.data }
    case "SET_HUMAN_RESULTS":
      return { ...state, humanResults: action.data }
    case "SET_FACE_RESULTS":
      return { ...state, faceResults: action.data }
    case "SET_VIDEOTECTION_TAB":
      return { ...state, activeTab: action.data }
    default:
      return state
  }
}

export default videoDetectionReducer
