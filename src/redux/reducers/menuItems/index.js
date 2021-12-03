// ** Inital state
const initialState = {
  isLayersOpen: false,
  isDatabaseOpen: false,
  isIntegrationOpen: false
}

const menuItems = (state = initialState, action) => {
  switch (action.type) {
    case "HANDLE_LAYER_MENU":
      return { ...initialState, isLayersOpen: action.menu }
    case "HANDLE_DATABASE_MENU":
      return { ...initialState, isDatabaseOpen: action.menu }
    case "HANDLE_INTEGRATION_MENU":
      return { ...initialState, isIntegrationOpen: action.menu }
    case "HANDLE_FEEDBACK_MENU":
      return { ...initialState, isFeedbackOpen: action.menu }
    default:
      return state
  }
}
export default menuItems
