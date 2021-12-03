import axios from "axios"
import useJwt from "@src/auth/jwt/useJwt"
const config = useJwt.jwtConfig
const token = localStorage.getItem("access_token")?.replaceAll('"', "")

const getHumanByParams = (params) => {
  return axios.post(`${config.url}/foreign/vs/byparam`, { ...params }, { crossDomain: true })
}

const getFaceByImage = (params) => {
  return axios.post(`${config.url}/foreign/vs/byphoto`, { ...params })
}

const getImageUrl = (image_id) => {
  return `${config.url}/foreign/vs/image?event_id=${image_id}&token=${token}`
}

const getVideoUrl = (start_time, channel) => {
  return `${config.url}/foreign/vs/video?the_date=${start_time}&channel=${channel}&token=${token}`
}

const getDataQuantity = () => {
  return axios.get(`${config.url}/foreign/vs/count`)
}

const videoDetectionApi = {
  getHumanByParams,
  getFaceByImage,
  getImageUrl,
  getVideoUrl,
  getDataQuantity
}

export default videoDetectionApi
