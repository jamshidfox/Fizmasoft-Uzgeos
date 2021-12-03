import "../fizmasoft/fizmasoft.alarm"

const connectToMap = (map) => {
  const alarmObj = F.alarm().addTo(map)

  function startAlarm(latlng, results, img, cb) {
    alarmObj.startAlarm(latlng, results, img, cb)
  }
  function removeAlarm() {
    alarmObj.endAlarm()
  }

  return { startAlarm, removeAlarm }
}

const alarmConnections = { connectToMap }

export default alarmConnections
