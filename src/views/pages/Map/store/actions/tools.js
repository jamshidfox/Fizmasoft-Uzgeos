// ** Update & Get Updated Bookmarks Array
// export const updateBookmarked = id => {
//     return dispatch => {
//       return axios.post('/api/bookmarks/update', { id }).then(() => {
//         dispatch({ type: 'UPDATE_BOOKMARKED', id })
//       })
//     }
//   }
import useJwt from "@src/auth/jwt/useJwt"
import axios from "axios"

const config = useJwt.jwtConfig

export const handleXududlarOn = (val) => {
  return async (dispatch) => {
    const { data } = await axios.get(`${config.url}/districts`)
    return dispatch({ type: "HANDLE_XUDUDLAR_ACTIONS", val: true, data: data.data })
  }
}
export const handleXududlarOff = () => (dispatch) => {
  return dispatch({ type: "HANDLE_XUDUDLAR_ACTIONS", val: false, data: [] })
}
//** Handle Ruler Button
export const handleRulerAction = (val) => (dispatch) => dispatch({ type: "HANDLE_RULER_ACTIONS", val })

//** Handle Eraser Button
export const handleEraserAction = (val) => (dispatch) => dispatch({ type: "HANDLE_ERASER_ACTIONS", val })

//** Handle Polygon Button
export const handlePolygonAction = (val) => (dispatch) => dispatch({ type: "HANDLE_POLYGON_ACTION", val })

//** Handle Line Button
export const handleLineAction = (val) => (dispatch) => dispatch({ type: "HANDLE_LINE_ACTION", val })

export const handleCircleAction = (val) => (dispatch) => dispatch({ type: "HANDLE_CIRCLE_ACTION", val })
