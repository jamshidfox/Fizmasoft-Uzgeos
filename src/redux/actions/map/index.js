import useJwt from "@src/auth/jwt/useJwt"
import axios from "axios"

const config = useJwt.jwtConfig

//** Handle GPS
export const handleGpsAction = (name, val) => (dispatch) => dispatch({ type: name.toUpperCase(), val })

//** Handle CAMERA
export const handleCameraAction = (name, val) => (dispatch) => dispatch({ type: name.toUpperCase(), val })

// ** handle Noturar
export const handleGetNoturarTypes = () => {
  return async (dispatch) => {
    const { data } = await axios.get(`${config.url}/foreign/xatlov/noturarlar/types`)
    const val = {}
    data.forEach((d) => {
      val[d.type] = { [d.type]: false, id: d.id }
    })
    return dispatch({ type: "SET_NOTURAR_TYPES_CONTENT", val })
  }
}

export const handleNoturarAction = (name, val, obj) => (dispatch) => {
  const a = { ...obj, [name]: { id: val.id, [name]: val.cond } }
  return dispatch({ type: "SET_NOTURAR_TYPES_CONTENT", val: a })
}

// ** handke OnList(Uchetdegilar)
export const handleOnList = (val) => (dispatch) => dispatch({ type: "ON_LIST", val })
