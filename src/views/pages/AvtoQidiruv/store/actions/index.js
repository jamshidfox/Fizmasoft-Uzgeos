import useJwt from "@src/auth/jwt/useJwt"
import axios from "axios"

const config = useJwt.jwtConfig

//** handle get rules

export const getRules = () => {
  return async (dispatch) => {
    const { data } = await axios.get(`${config.url}/foreign/chorraxa/rules`)
    return dispatch({ type: "GET_RULES", data: data.data })
  }
}

export const getCrossroad = () => {
  return async (dispatch) => {
    const { data } = await axios.get(`${config.url}/foreign/chorraxa/crossroads`)
    return dispatch({ type: "GET_CROSSROAD", data: data.data })
  }
}

export const getComputersByCrossroadId = (crossroad_id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`${config.url}/foreign/chorraxa/computers?crossroad_id=${crossroad_id}`)
    return dispatch({ type: "GET_COMPUTES_BY_CROSSROAD", data: data.data })
  }
}

export const getCamerasByComputerId = (computer_id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`${config.url}/foreign/chorraxa/cameras?computer_id=${computer_id}`)
    return dispatch({ type: "GET_CAMERAS_BY_COMPUTER", data: data.data })
  }
}

export const get_Search = (value) => {
  return async (dispatch) => {
    const { data } = await axios.get(`${config.url}/foreign/chorraxa/search?`, {
      params: {
        ...value
      }
    })
    return dispatch({ type: "GET_SEARCH", data })
  }
}
