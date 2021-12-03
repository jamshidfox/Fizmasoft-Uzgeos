import useJwt from "@src/auth/jwt/useJwt"
import axios from "axios"

const config = useJwt.jwtConfig

export const handleGetCrossroads = (val) => {
  if (val && val.length !== 0) {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(`${config.url}/foreign/chorraxa`)
        const result = []
        data.data.forEach((d) => {
          val.forEach((v) => {
            if (d.id === v.id) {
              result.push({ ...d, selected: v.selected, zoomed: v.zoomed, hovered: v.hovered })
            }
          })
        })

        return dispatch({ type: "ADD_CROSSROAD", data: result, finished: true })
      } catch (error) {
        return dispatch({ type: "CROSSROAD_FINAL_FINISHED", finished: false })
      }
    }
  } else {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(`${config.url}/foreign/chorraxa`)
        const readyData = data.data.map((d) => ({ ...d, selected: true }))
        return dispatch({ type: "ADD_CROSSROAD", data: readyData, finished: true })
      } catch (error) {
        return dispatch({ type: "CROSSROAD_FINAL_FINISHED", finished: false })
      }
    }
  }
}

export const handleSelectedCrossroad = (data) => (dispatch) => dispatch({ type: "SELECTED_CROSSROAD", data })

export const handleAllVisibility = (data) => (dispatch) => dispatch({ type: "SET_ALL_CROSSROAD_VISIBLE", data })

export const handleDeleteAll = () => (dispatch) => dispatch({ type: "DELETE_ALL_CROSSROAD", data: [] })

export const handleZoomed = (data) => (dispatch) => dispatch({ type: "ZOOM_CROSSROAD", data })

export const handleZoomCancel = (state) => (dispatch) => dispatch({ type: "ZOOM_CROSSROAD_CANCEL", state })

export const handleVideoEffect = (val) => (dispatch) => dispatch({ type: "CROSSROAD_VIDEO_EFFECT", val })

export const handleAllCrossroadZoomCancel = () => (dispatch) => dispatch({ type: "ALL_CROSSROAD_ZOOM_CANCEL" })

export const handleAllSelectedCrossroadZoomCancel = () => (dispatch) => dispatch({ type: "ALL_SELECTED_CROSSROAD_ZOOM_CANCEL" })

export const handleCrossroadFinalStatus = () => (dispatch) => dispatch({ type: "CROSSROAD_FINAL_FINISHED", finished: false })

export const handleFilterCrossroadData = (data) => (dispatch) => dispatch({ type: "FILTER_CROSSROAD", data })