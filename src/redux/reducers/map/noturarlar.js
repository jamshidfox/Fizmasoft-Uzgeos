// ** Noturarlar
const initialNoturarlarState = {}

const Noturarlar = (state = initialNoturarlarState, action) => {
  switch (action.type) {
    case "SET_NOTURAR_TYPES_CONTENT":
      return { ...state, ...action.val }
    default:
      return state
  }
}

export default Noturarlar
