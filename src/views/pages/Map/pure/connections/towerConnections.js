import "../fizmasoft/fizmasoft.tower"

const connectToMap = (map) => {
  const towerObj = F.tower().addTo(map)
  function addTowerPoint(data) {
    towerObj.addPoint(data)
  }
  function removeAllTowerPoints() {
    towerObj.removePoints()
  }
  function bounceTowerMarker(id) {
    towerObj.bounceMarker(id)
  }
  return { addTowerPoint, removeAllTowerPoints, bounceTowerMarker }
}

const towerConnections = { connectToMap }

export default towerConnections
