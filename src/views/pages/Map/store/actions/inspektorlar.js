import useJwt from "@src/auth/jwt/useJwt"
import axios from "axios"

const config = useJwt.jwtConfig

export const handleGetInspektors = (val) => {
  if (val && val.length !== 0) {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(`${config.url}/configurations/users/inspectors`)
        const result = []
        data.data.forEach((d) => {
          val.forEach((v) => {
            if (d.id === v.id) {
              result.push({ ...d, selected: v.selected, zoomed: v.zoomed, hovered: v.hovered })
            }
          })
        })
        return dispatch({ type: "ADD_INSPEKTORS", data: result, finished: true })
      } catch (error) {
        return dispatch({ type: "INSPEKTOR_FINAL_FINISHED", finished: false })
      }
    }
  } else {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(`${config.url}/configurations/users/inspectors`)
        const readyData = data.data.map((d) => ({ ...d, selected: true }))
        return dispatch({ type: "ADD_INSPEKTORS", data: readyData, finished: true })
      } catch (error) {
        return dispatch({ type: "INSPEKTOR_FINAL_FINISHED", finished: false })
      }
    }
  }
}

export const handleSelectedInspektorlar = (data) => (dispatch) => dispatch({ type: "SELECTED_INSPEKTORS", data })

export const handleAllVisibility = (data) => (dispatch) => dispatch({ type: "SET_ALL_INSPEKTORS_VISIBLE", data })

export const handleDeleteAll = (data) => (dispatch) => dispatch({ type: "DELETE_ALL_INSPEKTORS", data: [] })

export const handleZoomed = (data) => (dispatch) => dispatch({ type: "ZOOM_INSPEKTORS", data })

export const handleZoomCancel = (state) => (dispatch) => dispatch({ type: "ZOOM_INSPEKTORS_CANCEL", state })

export const handleAllInspektorZoomCancel = () => (dispatch) => dispatch({ type: "ALL_INSPEKTOR_ZOOM_CANCEL" })

export const handleAllSelectedInspektorZoomCancel = () => (dispatch) => dispatch({ type: "ALL_SELECTED_INSPEKTOR_ZOOM_CANCEL" })

export const handleInspektroFinalStatus = () => (dispatch) => dispatch({ type: "INSPEKTOR_FINAL_FINISHED", finished: false })

export const handleFilterInspektorData = (data) => (dispatch) => dispatch({ type: "FILTER_INSPEKTOR", data })