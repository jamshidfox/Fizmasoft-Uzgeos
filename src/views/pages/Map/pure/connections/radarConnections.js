import "../fizmasoft/fizmasoft.radar"

const connectToMap = (map) => {
  const radarObj = F.radar().addTo(map)
  function addRadarPoint(data) {
    radarObj.addPoint(data)
  }
  function removeAllRadarPoints() {
    radarObj.removePoints()
  }
  function bounceRadarMarker(id) {
    radarObj.bounceMarker(id)
  }
  return { addRadarPoint, removeAllRadarPoints, bounceRadarMarker }
}

const radarConnections = { connectToMap }

export default radarConnections
