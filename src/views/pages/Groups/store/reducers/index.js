// **  Initial State
const initialState = {
  groupData: [],
  region_list: [],
  count: 0
}

const GroupSettings = (state = initialState, action) => {
  switch (action.type) {
    case "GET_GROUPS":
      return { ...state, groupData: action.data.data, count: action.data.count }
    case "GET_REGION_LIST":
      return { ...state, region_list: action.data }
    case "ADD_GROUP":
      return { ...state }
    case "UPDATE_GROUP":
      return { ...state }
    case "DELETE_GROUP":
      return { ...state }
    default:
      return state
  }
}

export default GroupSettings
