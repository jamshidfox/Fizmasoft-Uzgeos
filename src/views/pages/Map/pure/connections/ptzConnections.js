import "../fizmasoft/fizmasoft.ptz"

const connectToMap = (map) => {
  const ptzObj = F.ptz().addTo(map)
  function addPtzPoint(data) {
    ptzObj.addPoint(data)
  }
  function removeAllPtzPoints() {
    ptzObj.removePoints()
  }
  function bouncePtzMarker(id) {
    ptzObj.bounceMarker(id)
  }
  return { addPtzPoint, removeAllPtzPoints, bouncePtzMarker }
}

const ptzConnections = { connectToMap }

export default ptzConnections
