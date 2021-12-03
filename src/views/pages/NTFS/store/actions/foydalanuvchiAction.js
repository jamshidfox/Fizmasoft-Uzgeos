import useJwt from "@src/auth/jwt/useJwt"
import axios from "axios"

const config = useJwt.jwtConfig

// **  GET_NTFC_INSPEKTORS

export const handleGetNtfcInspektors = () => {
  return (dispatch) => {
    return axios.get(`${config.url}/configurations/users/ntface`).then((res) => {
      dispatch({
        type: "GET_NTFC_INSPEKTORS",
        data: res.data.data
      })
    })
  }
}

export const handleGetNtfsLogs = (userId) => {
  return (dispatch) => {
    return axios.post(`${config.url}/foreign/ntface/user-logs`, { userId }).then((res) => {
      dispatch({
        type: "GET_NTFC_INSPEKTORS_LOGS",
        data: res.data.data
      })
    })
  }
}

export const handleGetNtfsLogsDetail = (logId) => {
  return (dispatch) => {
    return axios.post(`${config.url}/foreign/ntface/user-logs/details`, { logId }).then((res) => {
      dispatch({
        type: "GET_NTFC_LOGS_DETAILS",
        data: res.data.data
      })
    })
  }
}