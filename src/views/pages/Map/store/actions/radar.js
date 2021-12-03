import useJwt from "@src/auth/jwt/useJwt"
import axios from "axios"

const config = useJwt.jwtConfig


export const handleGetRadars = (val) => {
  if (val && val.length !== 0) {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(`${config.url}/foreign/radar`)
        const result = []
        data.data.forEach((d) => {
          val.forEach((v) => {
            if (d.id === v.id) {
              result.push({ ...d, selected: v.selected, zoomed: v.zoomed, hovered: v.hovered })
            }
          })
        })

        return dispatch({ type: "ADD_RADAR", data: result, finished: true })
      } catch (err) {
        return dispatch({ type: "RADAR_FINAL_FINISHED", finished: false })
      }
    }
  } else {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(`${config.url}/foreign/radar`)
        const readyData = data.data.map((d) => ({ ...d, selected: true }))
        return dispatch({ type: "ADD_RADAR", data: readyData, finished: true })
      } catch (err) {
        return dispatch({ type: "RADAR_FINAL_FINISHED", finished: false })
      }
    }
  }
}

export const handleSelectedRadar = (data) => (dispatch) => dispatch({ type: "SELECT_RADAR", data })

export const handleAllVisibility = (data) => (dispatch) => dispatch({ type: "SET_ALL_RADAR_VISIBLE", data })

export const handleDeleteAll = () => (dispatch) => dispatch({ type: "DELETE_ALL_RADAR", data: [] })

export const handleZoomed = (data) => (dispatch) => dispatch({ type: "ZOOM_RADAR", data })

export const handleZoomCancel = (state) => (dispatch) => dispatch({ type: "ZOOM_RADAR_CANCEL", state })

export const handleRadarVideoEffect = (val) => (dispatch) => dispatch({ type: "RADAR_VIDEO_EFFECT", val })

export const handleAllRadarZoomCancel = () => (dispatch) => dispatch({ type: "ALL_RADAR_ZOOM_CANCEL" })

export const handleAllSelectedRadarZoomCancel = () => (dispatch) => dispatch({ type: "ALL_SELECTED_RADAR_ZOOM_CANCEL" })

export const handleRadarFinalStatus = () => (dispatch) => dispatch({ type: "RADAR_FINAL_FINISHED", finished: false })
 
export const handleFilterRadarData = (data) => (dispatch) => dispatch({ type: "FILTER_RADAR", data })