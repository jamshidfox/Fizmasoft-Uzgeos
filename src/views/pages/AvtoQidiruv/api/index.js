import useJwt from "@src/auth/jwt/useJwt"
import axios from "axios"

const config = useJwt.jwtConfig

const getCameras = () => {
  return axios.get(`${config.url}/foreign/avto-qidiruv`)
}

const getFilteredData = (data) => {
  return axios.post(`${config.url}/foreign/${data.name}/auto-search`, { ...data.data }, { timeout: 300000 })
}

const getCarDetails = (carNumber) => {
  return axios.get(`${config.url}/foreign/avto-qidiruv/auto-owner?def=true&car_number=${carNumber}`)
}

const getRuleTypes = () => {
  return axios.get(`${config.url}/foreign/perimeter/rules`)
}

const getColors = () => {
  // 192.168.2.68:8082/foreign/avto-qidiruv/colors
  return axios.get(`${config.url}/foreign/avto-qidiruv/colors`)
}

const avtoQidiruvApi = {
  getCarDetails,
  getCameras,
  getFilteredData,
  getRuleTypes,
  getColors
}

export default avtoQidiruvApi
