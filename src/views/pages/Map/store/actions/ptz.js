import useJwt from "@src/auth/jwt/useJwt"
import axios from "axios"

const config = useJwt.jwtConfig

export const handleGetPtz = () => {
  return async (dispatch) => {
    const { data } = await axios.get(`${config.url}/df-datas?type=ptz_cameras`)
    const readyData = data.data.map((d) => ({ ...d, selected: true }))
    return dispatch({ type: "ADD_PTZ", data: readyData })
  }
}

export const handleSelectedPtz = (data) => (dispatch) => dispatch({ type: "SELECTED_PTZ", data })

export const handleAllVisibility = (data) => (dispatch) => dispatch({ type: "SET_ALL_PTZ_VISIBLE", data })

export const handleDeleteAll = () => (dispatch) => dispatch({ type: "DELETE_ALL_PTZ", data: [] })

export const handleZoomed = (data) => (dispatch) => dispatch({ type: "ZOOM_PTZ", data })

export const handleZoomCancel = (state) => (dispatch) => dispatch({ type: "ZOOM_PTZ_CANCEL", state })

export const handleAllPtzZoomCancel = () => (dispatch) => dispatch({ type: "ALL_PTZ_ZOOM_CANCEL" })

export const handleAllSelectedPtzZoomCancel = () => (dispatch) => dispatch({ type: "ALL_SELECTED_PTZ_ZOOM_CANCEL" })

export const handleFilterPtzData = (data) => (dispatch) => dispatch({ type: "FILTER_PTZ", data })