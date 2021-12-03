import useJwt from "@src/auth/jwt/useJwt"
import axios from "axios"

const config = useJwt.jwtConfig

export const handleGetTower = () => {
  return async (dispatch) => {
    const { data } = await axios.get(`${config.url}/df-datas/object-cameras`)
    const readyData = data.map((d) => ({ ...d, selected: true }))
    return dispatch({ type: "ADD_TOWER", data: readyData })
  }
}

export const handleSelectedTower = (data) => (dispatch) => dispatch({ type: "SELECTED_TOWER", data })

export const handleAllVisibility = (data) => (dispatch) => dispatch({ type: "SET_ALL_TOWER_VISIBLE", data })

export const handleDeleteAll = () => (dispatch) => dispatch({ type: "DELETE_ALL_TOWER", data: [] })

export const handleZoomed = (data) => (dispatch) => dispatch({ type: "ZOOM_TOWER", data })

export const handleZoomCancel = (state) => (dispatch) => dispatch({ type: "ZOOM_TOWER_CANCEL", state })

export const handleAllTowerZoomCancel = () => (dispatch) => dispatch({ type: "ALL_TOWER_ZOOM_CANCEL" })

export const handleAllSelectedTowerZoomCancel = () => (dispatch) => dispatch({ type: "ALL_SELECTED_TOWER_ZOOM_CANCEL" })

export const handleFilterTowerData = (data) => (dispatch) => dispatch({ type: "FILTER_TOWER", data })
