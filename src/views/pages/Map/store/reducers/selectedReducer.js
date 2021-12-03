const initialState = {
  selectedRadar: [],
  selectedPerimeter: [],
  selectedCrossroad: [],
  selectedPtz: [],
  selectedInspektor: []
}

const selectedData = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_RADAR":
      return { ...state, selectedRadar: action.data }
    case "SELECTED_PERIMETRE":
      return { ...state, selectedPerimeter: action.data }
    case "SELECTED_CROSSROAD":
      return { ...state, selectedCrossroad: action.data }
    case "SELECTED_INSPEKTORS":
      return { ...state, selectedInspektor: action.data }
    case "SELECTED_PTZ":
      return { ...state, selectedPtz: action.data }
    case "ALL_SELECTED_RADAR_ZOOM_CANCEL":
      return { ...state, selectedRadar: state.selectedRadar.map((z) => ({ ...z, zoomed: false })) }
    case "ALL_SELECTED_PERIMETRE_ZOOM_CANCEL":
      return { ...state, selectedPerimeter: state.selectedPerimeter.map((p) => ({ ...p, zoomed: false })) }
    case "ALL_SELECTED_CROSSROAD_ZOOM_CANCEL":
      return { ...state, selectedCrossroad: state.selectedCrossroad.map((c) => ({ ...c, zoomed: false })) }
    case "ALL_SELECTED_PTZ_ZOOM_CANCEL":
      return { ...state, selectedPtz: state.selectedPtz.map((ptz) => ({ ...ptz, zoomed: false })) }
    case "ALL_SELECTED_INSPEKTOR_ZOOM_CANCEL":
      return { ...state, selectedInspektor: state.selectedInspektor.map((si) => ({ ...si, zoomed: false })) }
    default:
      return state
  }
}

export default selectedData
