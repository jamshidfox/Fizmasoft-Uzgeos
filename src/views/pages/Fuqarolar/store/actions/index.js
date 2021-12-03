import useJwt from "@src/auth/jwt/useJwt"
import axios from "axios"

const config = useJwt.jwtConfig

// ** SEARCH FUQAROLAR
export const handleSearchFuqarolar = (searchData, limit, offset) => {
  return async (dispatch) => {
    const { data } = await axios.post(`${config.url}/foreign/xatlov/search`, {
      ...searchData,
      limit,
      offset
    })
    return dispatch({ type: "SEARCH_FUQAROLAR", data })
  }
}

// ** GET USERS DETAILS **
export const handleGetUserDetails = (params) => {
  return async (dispatch) => {
    const { data } = await axios.post(`${config.url}/foreign/xatlov/forma1`, params)
    return dispatch({ type: "GET_USERS_DETAILS", data })
  }
}

// ** GET USERS AGE **
export const handleGetUserAge = () => {
  return async (dispatch) => {
    const { data } = await axios.get(`${config.url}/foreign/xatlov/age-category`)
    return dispatch({ type: "GET_USERS_AGE", data })
  }
}

export const handleGetFuqaroLocation = (params) => {
  return async (dispatch) => {
    const { data } = await axios.get(`${config.url}/foreign/xatlov/kadastr-info?kadastr=${params}`)
    return dispatch({ type: "GET_USERS_LOCATION", data })
  }
}
