import "../fizmasoft/fizmasoft.geoms"

let geomObj

function getShapes() {
  return geomObj.getShapes()
}
function drawLine(cond) {
  if (cond) geomObj.drawLine()
}
function drawPolygon(cond) {
  if (cond) geomObj.drawPolygon()
}
function drawCircle(cond) {
  if (cond) geomObj.drawCircle()
}

function removeDraw(cond) {
  geomObj.removeDraw(cond)
}

const connectToMap = (map, onListForma1) => {
  geomObj = F.geoms({ onListForma1 }).addTo(map)
  return { drawLine, getShapes, drawPolygon, drawCircle, removeDraw }
}

const geomConnections = { connectToMap, drawLine, getShapes, drawPolygon, drawCircle, removeDraw }

export default geomConnections
