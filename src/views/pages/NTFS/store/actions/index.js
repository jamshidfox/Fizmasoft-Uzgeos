import useJwt from "@src/auth/jwt/useJwt"
import axios from "axios"

const config = useJwt.jwtConfig

// ** NTFS Search action's **

export const searchUser = (image) => {
  return (dispatch) => {
    return axios.post(`${config.url}/foreign/ntface`, image).then((res) => {
      dispatch({
        type: "SEARCH_USER",
        data: res.data.data
      })
    })
  }
}

// export const handleLoading = (val) => (dispatch) => dispatch({ type: "NTFS_LOADING", val })
// ** NTFS User action's **
