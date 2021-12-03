const initialState = {
  connection: null
}

const socket = (state = initialState, action) => {
  switch (action.type) {
    case "INIT_SOCKET":
      return { ...state, connection: action.val }
    default:
      return state
  }
}
export default socket
