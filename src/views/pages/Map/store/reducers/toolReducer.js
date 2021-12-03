// **  Initial State
const toolState = {
  xududlar: { cond: false, data: [] },
  ruler: false,
  eraser: false,
  line: false,
  polygon: false,
  circle: false
}
const toolReducer = (state = toolState, action) => {
  switch (action.type) {
    case "HANDLE_XUDUDLAR_ACTIONS":
      return { ...toolState, xududlar: { cond: action.val, data: action.data } }
    case "HANDLE_RULER_ACTIONS":
      return { ...toolState, ruler: action.val }
    case "HANDLE_ERASER_ACTIONS":
      return { ...toolState, eraser: action.val }
    case "HANDLE_POLYGON_ACTION":
      return { ...toolState, polygon: action.val }
    case "HANDLE_LINE_ACTION":
      return { ...toolState, line: action.val }
    case "HANDLE_CIRCLE_ACTION":
      return { ...toolState, circle: action.val }
    default:
      return state
  }
}

export default toolReducer
