// **  Initial State
const initialState = {
  userData: [],
  groupData: [],
  services: [],
  leader: [],
  user_count: 0
}

const UsersSettings = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        userData: action.data.data,
        user_count: action.data.count
      }
    case "GET_GROUP":
      return { ...state, groupData: action.data }
    case "GET_SERVICES":
      return { ...state, services: action.data }
    case "GET_GROUP_LEADER":
      return { ...state, leader: action.data }
    case "ADD_USER":
      return { ...state }
    case "UPDATE_USER_IMAGE":
      return { ...state }
    case "UPDATE_USERS":
      return { ...state }
    case "DELETE_USERS":
      return { ...state }
    case "LOADING":
      return { ...state, loading: action.val }
    default:
      return state
  }
}

export default UsersSettings
