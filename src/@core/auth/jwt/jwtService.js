import axios from "axios"
import jwtDefaultConfig from "./jwtDefaultConfig"
import { toast } from "react-toastify"
import Swal from "sweetalert2"

export default class JwtService {
  // ** jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig }

  // ** For Refreshing Token
  isAlreadyFetchingAccessToken = false

  // ** For Refreshing Token
  subscribers = []

  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    // ** Request Interceptor
    axios.interceptors.request.use(
      (config) => {
        // ** Get token from localStorage
        const accessToken = this.getToken()
        config.headers["X-HOST"] = this.jwtConfig.xHost
        // ** If token is present add it to request's Authorization Header
        if (accessToken) {
          // ** eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${JSON.parse(accessToken)}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // ** Add request/response interceptor
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // ** const { config, response: { status } } = error
        const { config, response } = error
        const originalRequest = config
        const accessToken = this.getToken()
        if (response?.status >= 400 && response?.status <= 500) {
          this.showCorrectErrorMessageToUser(response, config)
        }
        return Promise.reject(error)
      }
    )
  }

  permitionManipulation() {
    const user = JSON.parse(localStorage.getItem("userData"))
    console.log(user.services)
    let services = ""
    user.services.forEach((service) => {
      services += `${service.name}, `
    })
    Swal.fire({
      title: "Sizda ma'lumotdan foydalanish xuquqi mavjud emas",
      text: `Ruxsat berilgan xizmatlar: ${services}`,
      icon: "error",
      confirmButtonText: "Ok",
      allowEscapeKey: false,
      allowOutsideClick: false
    }).then((a) => {
      // window.location.replace("/")
    })
  }

  showCorrectErrorMessageToUser(res, config) {
    switch (res.data.code) {
      case 400:
        toast.error("Notog'ri ma'lumotlar kiritilgan")
        break
      case 401:
        const absoluteUrl = window.location.href
        const absoluteUrlArray = absoluteUrl.split("/")
        const path = absoluteUrlArray[absoluteUrlArray.length - 1]
        localStorage.removeItem("userData")
        localStorage.removeItem(config?.storageTokenKeyName)
        localStorage.removeItem(config?.storageRefreshTokenKeyName)
        path === "/login" ? toast.error("Логин йоки парол xaто киритилган") : window.location.replace("/")
        toast.info("Sizning sessiyangiz tugadi iltimos qaytadan tizimga kiring")

        break
      case 403:
        this.permitionManipulation()
        break
      case 404:
        toast.info("Маълумот топилмади")
        break
      case 500:
        toast.error("Serverda hatolik yuz berdi")
        break
      case 1001:
        toast.error("Yuzni aniqlash serverida xatolik")
        break
      case 1002:
        toast.error("Charraxa serverida xatolik yuz berdi")
        break
      case 1003:
        toast.error("Radar serverida xatolik yuz berdi")
        break
      case 1004:
        toast.error("Perimeter serverida xatolik yuz berdi")
        break
      case 1005:
        toast.error("Video tahlil serverida xatolik yuz berdi")
        break
      case 1006:
        toast.error("ASBT - raqam aniqlash xizmatida xatolik yuz berdi")
        break
      case 1007:
        toast.error("OVIR - Forma 1 xizmatida xatolik yuz berdi")
        break
      case 1008:
        toast.error("ITS - xizmatida xatolik yuz berdi")
        break
    }
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter((callback) => callback(accessToken))
  }

  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value)
  }

  login(...args) {
    return axios.post(this.jwtConfig.loginEndpoint, ...args)
  }

  register(...args) {
    return axios.post(this.jwtConfig.registerEndpoint, ...args)
  }

  refreshToken() {
    return axios.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken()
    })
  }
}

export const onTimerStart = (timer, runFunction) => {
  return setInterval(() => {
    runFunction()
  }, timer)
}
