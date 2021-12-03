// ** Initialize State
const initialState = {
  data: [],
  logs: [],
  logDetails: []
}

const NTFS_STORE = (state = initialState, action) => {
  switch (action.type) {
    case "GET_NTFC_INSPEKTORS":
      return { ...state, data: action.data }
    case "GET_NTFC_INSPEKTORS_LOGS":
      return { ...state, logs: action.data }
    case "GET_NTFC_LOGS_DETAILS":
      return { ...state, logDetails: action.data }
    default:
      return state
  }
}

export default NTFS_STORE
