import useJwt from "@src/auth/jwt/useJwt"
import axios from "axios"

const config = useJwt.jwtConfig

// ** GET GROUP

export const getGroup = (limit, offset) => {
  return (dispatch) => {
    return axios.get(`${config.url}/configurations/groups?limit=${limit}&offset=${offset}`).then((res) => {
      dispatch({ type: "GET_GROUPS", data: res.data })
    })
  }
}

// ** GET LIST OF GROUPS

export const getRegionList = () => {
  return (dispatch) => {
    return axios.get(`${config.url}/configurations/groups/regions`).then((res) => {
      dispatch({ type: "GET_REGION_LIST", data: res.data.data })
    })
  }
}

// ** ADD GROUP

export const addGroup = (user) => {
  return (dispatch) => {
    return axios.post(`${config.url}/configurations/groups`, user).then((res) => {
      dispatch({ type: "ADD_GROUP", res })
    })
  }
}

// ** UPDATE GROUP

export const updateGroup = (user, id) => {
  return (dispatch) => {
    return axios.put(`${config.url}/configurations/groups`, user).then((res) => {
      dispatch({ type: "UPDATE_GROUP", res })
    })
  }
}

// ** DELETE GROUP

export const deleteGroup = (id) => {
  return (dispatch) => {
    return axios
      .delete(`${config.url}/configurations/groups`, {
        data: {
          groupId: id
        }
      })
      .then((res) => {
        dispatch({ type: "DELETE_GROUP", res })
      })
  }
}

// ** Loading
export const loadingData = (val) => {
  return (dispatch) => {
    return dispatch({ type: "LOADING", val })
  }
}