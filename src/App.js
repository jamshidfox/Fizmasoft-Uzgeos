// ** Router Import
import Router from "./router/Router"
import "antd/dist/antd.css"
import flatpickr from "flatpickr"
const Russian = require("flatpickr/dist/l10n/ru.js").default.ru
flatpickr.localize(Russian)

const App = (props) => {
  return <Router />
}

export default App
