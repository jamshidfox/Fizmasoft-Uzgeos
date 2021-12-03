// ** OnList
const initialState = {
  onList: false
}

const onList = (state = initialState, action) => {
  switch (action.type) {
    case "ON_LIST":
      return { ...state, onList: action.val }
    default:
      return state
  }
}

export default onList
