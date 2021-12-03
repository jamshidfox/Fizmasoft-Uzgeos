import axios from "axios"
import useJwt from "@src/auth/jwt/useJwt"
const config = useJwt.jwtConfig
const token = localStorage.getItem("access_token")?.replaceAll('"', "")

const getDevices = () => {
  return axios.get(`${config.url}/foreign/vs/devices`)
}

const getHumanByParams = (params) => {
  return axios.post(`${config.url}/foreign/vs/byparam`, { ...params }, { crossDomain: true })
}

const getFaceByImage = (params) => {
  const photo = params.photo.replace(/^data:image\/jpeg;base64,/, "").replace(/^data:image\/png;base64,/, "")
  return axios.post(`${config.url}/foreign/vs/byphoto`, { ...params, photo })
}

const getFaceByParams = (params) => {
  return axios.post(`${config.url}/foreign/vs/byfaceparam`, { ...params })
}

const getImageUrl = (image_id) => {
  return `${config.url}/foreign/vs/image?id=${image_id}&token=${token}`
}

const getVideoUrl = (start_time, channel) => {
  return `${config.url}/foreign/vs/video?the_date=${start_time}&channel=${channel}&token=${token}`
}

const getDataQuantity = () => {
  return axios.get(`${config.url}/foreign/vs/count`)
}

const videoDetectionApi = {
  getDevices,
  getHumanByParams,
  getFaceByImage,
  getFaceByParams,
  getImageUrl,
  getVideoUrl,
  getDataQuantity
}

export default videoDetectionApi
