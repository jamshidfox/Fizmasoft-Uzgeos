// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'

const config = useJwt.jwtConfig

// ** Handle User Login
export const handleLogin = data => {
  return (dispatch) => {
    console.log(config)
    dispatch({
      type: "LOGIN",
      data,
      config,
      [config.storageTokenKeyName]: data.access_token[config.storageTokenKeyName],
      [config.storageRefreshTokenKeyName]: data.access_token[config.storageRefreshTokenKeyName]
    })

    // ** Add to user, accessToken & refreshToken to localStorage
    localStorage.setItem("userData", JSON.stringify(data.user))
    localStorage.setItem(config.storageTokenKeyName, JSON.stringify(data.access_token))
    localStorage.setItem(config.storageRefreshTokenKeyName, JSON.stringify(data.access_token))
  }
}

// ** Handle User Logout
export const handleLogout = () => {
  return dispatch => {
    dispatch({ type: 'LOGOUT', [config.storageTokenKeyName]: null, [config.storageRefreshTokenKeyName]: null })

    // ** Remove user, accessToken & refreshToken from localStorage
    localStorage.removeItem('userData')
    localStorage.removeItem(config.storageTokenKeyName)
    localStorage.removeItem(config.storageRefreshTokenKeyName)
  }
}
