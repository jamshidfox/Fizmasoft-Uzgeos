const initialState = {
  alarmData: {},
  status: false,
  moreInfo: false
}

const socket = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ALARM_DATA":
      return { ...state, status: action.val, data: action.data }
    case "ENABLE_MORE_INFO":
      return { ...state, moreInfo: action.val }
    default:
      return state
  }
}
export default socket
