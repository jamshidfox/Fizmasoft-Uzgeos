// ** Initialize State
const initialState = {
  userData: []
}

const NTFS_STORE = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_USER":
      return { ...state, userData: action.data }

    default:
      return state
  }
}

export default NTFS_STORE
