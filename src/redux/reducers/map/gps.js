const initialGps = {
  ypx: false,
  pps: false,
  inspektor: false,
  fire: false,
  ambulance: false,
  bus: false
}

const gps = (state = initialGps, action) => {
  switch (action.type) {
    case "YPX":
      return { ...state, ypx: action.val }
    case "PPS":
      return { ...state, pps: action.val }
    case "INSPEKTOR":
      return { ...state, inspektor: action.val }
    case "FIRE":
      return { ...state, fire: action.val }
    case "AMBULANCE":
      return { ...state, ambulance: action.val }
    case "BUS":
      return { ...state, bus: action.val }
    default:
      return state
  }
}

export default gps
