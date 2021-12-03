import useJwt from "@src/auth/jwt/useJwt"
import axios from "axios"
import { pd } from "./newperimertre"
const config = useJwt.jwtConfig

export const handleGetPerimeters = (val) => {
  if (val && val.length !== 0) {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(`${config.url}/foreign/perimeter`)
        const result = []
        data.data.forEach((d) => {
          val.forEach((v) => {
            if (d.id === v.id) {
              result.push({ ...d, selected: v.selected, zoomed: v.zoomed, hovered: v.hovered })
            }
          })
        })
        // pd.forEach((d) => {
        //   val.forEach((v) => {
        //     if (d.title === v.title) {
        //       result.push({
        //         title: d.title,
        //         kirish: 0,
        //         chiqish: 0,
        //         is_online: false,
        //         last_update: "2021-01-01T00:00:00.363Z",
        //         selected: true,
        //         coordinates: d.coordinates,
        //         notInstalled: v.notInstalled,
        //         selected: v.selected,
        //         hovered: v.hovered
        //       })
        //     }
        //   })
        // })

        return dispatch({ type: "ADD_PERIMETER", data: result, finished: true })
      } catch (error) {
        dispatch({ type: "FINAL_PERIMETER_FINISHED", finished: false })
      }
    }
  } else {
    return async (dispatch) => {
      try {
        const newP = []
        const { data } = await axios.get(`${config.url}/foreign/perimeter`)
        data.data.map((d) => newP.push({ ...d, selected: true }))
        // pd.map((pd) => newP.push(pd))
        return dispatch({ type: "ADD_PERIMETER", data: newP, finished: true })
      } catch (error) {
        dispatch({ type: "FINAL_PERIMETER_FINISHED", finished: false })
      }
    }
  }
}

export const handleSelectedPerimetr = (data) => (dispatch) => dispatch({ type: "SELECTED_PERIMETRE", data })

export const handleAllVisibility = (data) => (dispatch) => dispatch({ type: "SET_ALL_PERIMETER_VISIBLE", data })

export const handleDeleteAll = () => (dispatch) => dispatch({ type: "DELETE_ALL_PERIMETER", data: [] })

export const handleZoomed = (data) => (dispatch) => dispatch({ type: "ZOOM_PERIMETER", data })

export const handleZoomCancel = (state) => (dispatch) => dispatch({ type: "ZOOM_PERIMETER_CANCEL", state })

export const handleVideoEffect = (val) => (dispatch) => dispatch({ type: "PERIMETRE_VIDEO_EFFECT", val })

export const handleAllPerimetreZoomCancel = () => (dispatch) => dispatch({ type: "ALL_PERIMETRE_ZOOM_CANCEL" })

export const handleAllSelectedPerimetreZoomCancel = () => (dispatch) => dispatch({ type: "ALL_SELECTED_PERIMETRE_ZOOM_CANCEL" })

export const handlePerimetreFinalStatus = () => (dispatch) => dispatch({ type: "FINAL_PERIMETER_FINISHED", finished: false })

export const handleFilterPerimeterData = (data) => (dispatch) => dispatch({ type: "FILTER_PERIMETER", data })
