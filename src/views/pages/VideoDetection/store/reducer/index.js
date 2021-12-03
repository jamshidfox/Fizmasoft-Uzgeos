const initialState = {
  videoDetectionFace: null
}

const videoDetectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_VIDEODETECTION_FACE":
      return { ...state, videoDetectionFace: action.data }

    default:
      return state
  }
}

export default videoDetectionReducer
