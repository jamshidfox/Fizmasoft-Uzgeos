import "../fizmasoft/fizmasoft.onlist"

const connectToMap = (map) => {
  const onlistObj = F.onList().addTo(map)

  function addOnListMarkers(data, types, cb) {
    onlistObj.addPoints(data, types, cb)
  }

  function removeOnListMarkers() {
    onlistObj.removePoints()
  }

  return { addOnListMarkers, removeOnListMarkers }
}

const onListConnections = { connectToMap }

export default onListConnections
