import useJwt from "@src/auth/jwt/useJwt"
import axios from "axios"

const config = useJwt.jwtConfig

export const handleXatlovActivate = () => (dispatch) => dispatch({ type: "XATLOV_ACTIVATE" })

export const handleXatlovSetPos = (val) => (dispatch) => dispatch({ type: "XATLOV_SET_POSITION", val })

export const handleXatlovInactive = () => (dispatch) => dispatch({ type: "XATLOV_INACTIVATE" })

export const handleTurarObjects = (lat, long) => {
  return async (dispatch) => {
    const sentData = { lat, long }
    const { data } = await axios.post(`${config.url}/foreign/xatlov/turar`, sentData)
    return dispatch({ type: "INSERT_XATLOV_TURAR", val: data.data })
  }
}

export const handleNoturarObjects = (lat, long) => {
  return async (dispatch) => {
    const sentData = { lat, long }
    const { data } = await axios.post(`${config.url}/foreign/xatlov/noturar`, sentData)
    return dispatch({ type: "INSERT_XATLOV_NOTURAR", val: data.data })
  }
}

export const handleLoading = (val) => (dispatch) => dispatch({ type: "XATLOV_LOADING", val })
