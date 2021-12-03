import useJwt from "@src/auth/jwt/useJwt"
import axios from "axios"

const config = useJwt.jwtConfig

// ** GET USERS

export const getUsers = (limit, offset) => {
  return (dispatch) => {
    return axios.get(`${config.url}/configurations/users?limit=${limit}&offset=${offset}`).then((res) => {
      dispatch({ type: "GET_USERS", data: res.data })
    })
  }
}

// ** GET GROUP

export const getGroup = () => {
  return (dispatch) => {
    return axios.get(`${config.url}/configurations/groups`).then((res) => {
      dispatch({ type: "GET_GROUP", data: res.data.data })
    })
  }
}

// ** GET SERVICES

export const getService = () => {
  return (dispatch) => {
    return axios.get(`${config.url}/configurations/services`).then((res) => {
      dispatch({ type: "GET_SERVICES", data: res.data.data })
    })
  }
}

// ** GET GROUP LEADER

export const getGroupLeader = () => {
  return (dispatch) => {
    return axios.get(`${config.url}/configurations/groups/leader`).then((res) => {
      dispatch({ type: "GET_GROUP_LEADER", data: res.data })
    })
  }
}

// ** ADD USERS

export const addUsers = (user) => {
  return (dispatch) => {
    return axios.post(`${config.url}/configurations/users`, user).then((res) => {
      dispatch({ type: "ADD_USER", res })
    })
  }
}

// ** UPDATE USERS

export const updateUsers = (user, id) => {
  return (dispatch) => {
    return axios.put(`${config.url}/configurations/users/`, user).then((res) => {
      dispatch({ type: "UPDATE_USERS", res })
    })
  }
}

// ** UPDATE USER IMAGE

export const updateUserImage = (avatar, avatarId) => {
  return (dispatch) => {
    return axios.put(`${config.url}/configurations/users/avatar/${avatarId}`, avatar).then((res) => {
      dispatch({ type: "UPDATE_USER_IMAGE", res })
    })
  }
}

// ** DELETE USERS

export const deleteUsers = (id) => {
  return (dispatch) => {
    return axios
      .delete(`${config.url}/configurations/users`, {
        data: {
          userId: id
        }
      })
      .then((res) => {
        dispatch({ type: "DELETE_USERS", id })
      })
  }
}

// ** Loading
export const loadingData = (val) => {
  return (dispatch) => {
    return dispatch({ type: "LOADING", val })
  }
}

