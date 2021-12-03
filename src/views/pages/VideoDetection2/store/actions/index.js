import videoDetectionApi from "../../api"

export const setSearchFace = (data) => (dispatch) => dispatch({ type: "SET_VIDEODETECTION_FACE", data }) // no need after some time
export const setSearchChannel = (data) => (dispatch) => dispatch({ type: "SET_VIDEODETECTION_CHANNEL", data }) // no need after some time
export const setTabs = (data) => (dispatch) => dispatch({ type: "SET_VIDEOTECTION_TAB", data })

export const setHumanResults = (filters) => {
  return async function (dispatch) {
    const { data } = await videoDetectionApi.getHumanByParams(filters)
    return dispatch({ type: "SET_HUMAN_RESULTS", data: data.Data })
  }
}

export const setFaceImgResults = (filters) => {
  return async function (dispatch) {
    const { data } = await videoDetectionApi.getFaceByImage(filters)
    return dispatch({ type: "SET_FACE_RESULTS", data: data.Data })
  }
}

export const setFaceParamResults = (filters) => {
  return async function (dispatch) {
    const { data } = await videoDetectionApi.getFaceByParams(filters)
    return dispatch({ type: "SET_FACE_RESULTS", data: data.Data })
  }
}

export const setDevices = () => {
  return async function (dispatch) {
    const { data } = await videoDetectionApi.getDevices()
    return dispatch({ type: "SET_VIDEODETECTION_DEVICES", data: data.Data })
  }
}
