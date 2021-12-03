import "../fizmasoft/fizmasoft.crossroad"

const connectToMap = (map) => {
  const crossroadObj = F.crossroad().addTo(map)
  function addCrossroadPoint(data) {
    crossroadObj.addPoint(data)
  }
  function removeAllCrossroadPoints() {
    crossroadObj.removePoints()
  }
  function bounceCrossroadMarker(id) {
    crossroadObj.bounceMarker(id)
  }
  return { addCrossroadPoint, removeAllCrossroadPoints, bounceCrossroadMarker }
}

const crossroadConnections = { connectToMap }

export default crossroadConnections
