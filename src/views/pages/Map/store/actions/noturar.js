import useJwt from "@src/auth/jwt/useJwt"
import axios from "axios"

const config = useJwt.jwtConfig
const path = `/foreign/xatlov/noturarlar/data?id=`
export const handleGetNoturarData = (id, rest) => {
  return async (dispatch) => {
    const { data } = await axios.get(config.url + path + id)
    return dispatch({ type: "ADD_NOTURAR_DATA", data: { ...rest, [id]: data.map((d) => ({ ...d, hovered: false, zoomed: false, selected: true })) } })
  }
}

export const changeNoturarIdList = (data) => (dispatch) => dispatch({ type: "CHANGE_NOTURAR_ID_LIST", data })

export const handleChangeNoturarData = (data) => (dispatch) => dispatch({ type: "CHANGE_NOTURAR_DATA", data })
