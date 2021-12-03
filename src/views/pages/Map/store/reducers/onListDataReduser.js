const initialState = {
  types: [],
  selecteds: [],
  selectedsData: [],
  loading: false
}

const onListData = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ON_LIST_TYPES":
      return { ...state, types: action.val }
    case "UPDATE_ON_LIST_SELECTEDS":
      return { ...state, selecteds: action.val, loading: true }
    case "UPDATE_ON_LIST_SELECTEDS_DATA":
      return { ...state, selectedsData: action.val, loading: false }
    default:
      return state
  }
}

export default onListData
