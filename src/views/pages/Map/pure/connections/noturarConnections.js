import "../fizmasoft/fizmasoft.noturar"

const connectToMap = (map) => {
  const noturarObj = F.noturar().addTo(map)
  function addNoturarPoint(data, typeId) {
    noturarObj.addPoint(data, typeId)
  }
  function removeAllNoturarPoints() {
    noturarObj.removePoints()
  }

  return { addNoturarPoint, removeAllNoturarPoints }
}

const noturarConnections = { connectToMap }

export default noturarConnections
