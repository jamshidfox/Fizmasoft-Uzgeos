// ** Auth Endpoints
const isDev = process.env.NODE_ENV === "development"
const hostname = window.location.hostname
const host = isDev ? `http://192.168.2.68:8082` : `http://${window.location.host}:8082`
const ligth_map_tile = isDev ? process.env.REACT_APP_DEVELOPMENT_MAP_URL_LIGHT : hostname === "25.1.1.40" ? `http://25.1.1.40:8081/tile/{z}/{x}/{y}.png` : `http://10.2.1.2/tile/{z}/{x}/{y}.png`
export default {
  url: host,
  loginEndpoint: `${host}/auth`,
  registerEndpoint: "/jwt/register",
  refreshEndpoint: `${host}/auth`,
  logoutEndpoint: "/jwt/logout",
  xHost: isDev ? "192.168.2.68" : hostname,
  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: "Bearer",

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: "access_token",
  storageRefreshTokenKeyName: "access_token",
  timer: 30000,
  ligth_map_tile: `${isDev ? process.env.REACT_APP_DEVELOPMENT_MAP_URL_LIGHT : ligth_map_tile}`
  // dark_map_tile: `${process.env.NODE_ENV === "development" ? process.env.REACT_APP_DEVELOPMENT_MAP_URL_DARK : `http://${window.location.hostname}/dark_matter/{z}/{x}/{y}.png`}`
}
