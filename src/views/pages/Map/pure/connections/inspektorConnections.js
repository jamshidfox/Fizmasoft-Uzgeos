import "../fizmasoft/fizmasoft.inspektor"

const connectToMap = (map) => {
  const inspektorObj = F.inspektor().addTo(map)
  function addInspektorPoint(data) {
    inspektorObj.addPoint(data)
  }
  function removeAllInspektorPoints() {
    inspektorObj.removePoints()
  }
  function bounceInspektorMarker(id) {
    inspektorObj.bounceMarker(id)
  }
  return { addInspektorPoint, removeAllInspektorPoints, bounceInspektorMarker }
}

const inspektorConnections = { connectToMap }

export default inspektorConnections
