const initialState = {
  data: {},
  idList: []
}

const noturar = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_NOTURAR_ID_LIST":
      return { ...state, idList: action.data }
    case "ADD_NOTURAR_DATA":
      return { ...state, data: action.data }
    case "CHANGE_NOTURAR_DATA":
      return { ...state, data: action.data }
    default:
      return state
  }
}

export default noturar
