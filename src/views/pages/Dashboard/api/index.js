import axios from "axios"
import useJwt from "@src/auth/jwt/useJwt"
const config = useJwt.jwtConfig
const url = config.url

const getPerimeterDistricts = (date) => {
  return axios.get(`${url}/foreign/perimeter/districts-stat?start=${date[0]}&end=${date[1]}`)
}
const getPerimeterDaily = (date) => {
  return axios.get(`${url}/foreign/perimeter/stat-minute?start=${date[0]}&end=${date[1]}`)
}
const getDataTurar = () => {
  return axios.get(`${url}/foreign/xatlov/turar/total`)
}
const getDataAgeRange = () => {
  return axios.get(`${url}/foreign/xatlov/people`)
}
const getDataGender = () => {
  return axios.get(`${url}/foreign/xatlov/gender`)
}
const getDataOnList = () => {
  return axios.get(`${url}/foreign/xatlov/list`)
}
const getDataByPenalty = (date) => {
  return axios.get(`${url}/foreign/chorraxa/penalty?from=${date[0]}&to=${date[1]}`)
}
const getDataByCarType = (date) => {
  return axios.get(`${url}/foreign/perimeter/stat/model?start=${date[0]}&end=${date[1]}`)
}
const getCarDataByRegion = (date) => {
  return axios.get(`${url}/foreign/perimeter/stat-cars-region?start=${date[0]}&end=${date[1]}`)
}
const getDataByCarOwnerType = (date) => {
  return axios.get(`${url}/foreign/perimeter/stat-cars-plate?start=${date[0]}&end=${date[1]}`)
}
const getCarDataByDay = (date1, date2) => {
  return axios.get(`${url}/foreign/perimeter/stat/day?start=${date1}&end=${date2}`)
}
const dashboardApi = {
  getDataTurar,
  getDataAgeRange,
  getDataGender,
  getDataOnList,
  getDataByPenalty,
  getPerimeterDistricts,
  getPerimeterDaily,
  getDataByCarType,
  getCarDataByRegion,
  getDataByCarOwnerType,
  getCarDataByDay
}

export default dashboardApi
