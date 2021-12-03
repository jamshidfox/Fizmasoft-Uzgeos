const initialCamera = {
  radar: false,
  crossroad: false,
  perimeter: false,
  ntface: false,
  video: false,
  tower: false,
  ptz: false
}

const camera = (state = initialCamera, action) => {
  switch (action.type) {
    case "RADAR":
      return { ...state, radar: action.val }
    case "CROSSROAD":
      return { ...state, crossroad: action.val }
    case "PERIMETER":
      return { ...state, perimeter: action.val }
    case "NTFACE":
      return { ...state, ntface: action.val }
    case "VIDEO":
      return { ...state, video: action.val }
    case "TOWER":
      return { ...state, tower: action.val }
    case "PTZ":
      return { ...state, ptz: action.val }
    default:
      return state
  }
}

export default camera
