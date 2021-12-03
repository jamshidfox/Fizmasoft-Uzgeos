import "../fizmasoft/fizmasoft.xatlov"

const connectToMap = (map) => {
  const xatlovObj = F.xatlov().addTo(map)

  function pointIcon(latlng) {
    xatlovObj.addPoint(latlng)
  }
  function removeXatlov() {
    xatlovObj.removePoints()
  }
  function renderIcon(is_dom, address) {
    xatlovObj.changeIcon(is_dom, address)
  }
  function renderBusiness(data) {
    xatlovObj.addBusinessPoints(data)
  }

  return { pointIcon, renderIcon, renderBusiness, removeXatlov }
}

const xatlovConnections = { connectToMap }

export default xatlovConnections
