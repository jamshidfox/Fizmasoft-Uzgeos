const connectToMap = (map) => {
  const rulerObj = L.control.ruler({ angleUnit: true }).addTo(map)
  function ruler(cond) {
    if (rulerObj.options.rulerOn !== cond) rulerObj.clickBtn()
  }
  return { ruler }
}

const rulerConnections = { connectToMap }

export default rulerConnections
