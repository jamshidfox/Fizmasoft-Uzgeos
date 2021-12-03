import useJwt from "@src/auth/jwt/useJwt"
import axios from "axios"

const config = useJwt.jwtConfig

export const handleGetTypes = () => {
  return async (dispatch) => {
    const { data } = await axios.get(`${config.url}/foreign/xatlov/criminal-types`)
    return dispatch({ type: "ADD_ON_LIST_TYPES", val: data.data })
  }
}

export const handleUpdateSelecteds = (val) => (dispatch) => dispatch({ type: "UPDATE_ON_LIST_SELECTEDS", val })

export const handleUpdateSelectedData = (val) => {
  return async (dispatch) => {
    if (val.length === 0) return dispatch({ type: "UPDATE_ON_LIST_SELECTEDS_DATA", val: [] })
    const { data } = await axios.post(`${config.url}/foreign/xatlov/criminals`, { types: val })
    return dispatch({ type: "UPDATE_ON_LIST_SELECTEDS_DATA", val: data.data })
  }
}
