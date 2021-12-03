export const handleAlarmStatus = (val, data) => (dispatch) => dispatch({ type: "ADD_ALARM_DATA", val, data })
export const handleMoreDetails = (val) => (dispatch) => dispatch({ type: "ENABLE_MORE_INFO", val })
