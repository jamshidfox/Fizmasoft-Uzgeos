import axios from "axios"
import useJwt from "@src/auth/jwt/useJwt"

const config = useJwt.jwtConfig

// ** Get Bookmarks Array from @fakeDB
export const getBookmarks = () => {
  return (dispatch) => {
    return axios.get("/api/bookmarks/data").then((response) => {
      dispatch({
        type: "GET_BOOKMARKS",
        data: response.data.suggestions,
        bookmarks: response.data.bookmarks
      })
    })
  }
}

// ** Update & Get Updated Bookmarks Array
export const updateBookmarked = (id) => {
  return (dispatch) => {
    return axios.post("/api/bookmarks/update", { id }).then(() => {
      dispatch({ type: "UPDATE_BOOKMARKED", id })
    })
  }
}

// ** Handle Bookmarks & Main Search Queries
export const handleSearchQuery = (val) => (dispatch) => dispatch({ type: "HANDLE_SEARCH_QUERY", val })

// ** Handle Get Notifications
export const handleNotifications = () => {
  return async (dispatch) => {
    const { data } = await axios.get(`${config.url}/foreign/ntface/notifications`)
    return dispatch({ type: "HANDLE_GET_NOTIFICATIONS", data: data.data })
  }
}
