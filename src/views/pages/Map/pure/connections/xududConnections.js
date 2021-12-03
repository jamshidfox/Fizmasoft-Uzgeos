import F from "../fizmasoft/fizmasoft"
import "../fizmasoft/fizmasoft.xududlar"

const connectToMap = (map) => {
  const xududObj = F.xududlar().addTo(map)
  function xududAdd(cond, data) {
    cond ? xududObj.drawXududlar(data) : xududObj.removeXududlar()
  }
  return { xududAdd }
}

const xududConnections = { connectToMap }

export default xududConnections
