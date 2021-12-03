import "../fizmasoft/fizmasoft.perimeter"

const connectToMap = (map) => {
  const perimerterobj = F.perimeter().addTo(map)
  function addPerimeterPoint(data) {
    perimerterobj.addPoint(data)
  }
  function removeAllPerimeterPoints() {
    perimerterobj.removePoints()
  }
  function bouncePerimeterMarker(id) {
    perimerterobj.bounceMarker(id)
  }
  return { addPerimeterPoint, removeAllPerimeterPoints, bouncePerimeterMarker }
}

const perimeterConnections = { connectToMap }

export default perimeterConnections
