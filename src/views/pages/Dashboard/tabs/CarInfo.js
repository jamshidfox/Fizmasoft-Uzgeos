import moment from "moment"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import CarOwnerTypeQuantity from "../maleculas/carinfo/CarOwnerTypeQuantity"
import CarRegionByDay from "../maleculas/carinfo/CarRegionByDay"
import CarStatsByRegion from "../maleculas/carinfo/CarStatsByRegion"
import CarTypeQuantity from "../maleculas/carinfo/CarTypeQuantity"

const CarInfo = ({ active }) => {
  const skin = useSelector((state) => state.layout.isSkinChange)
  const [startDate, setStartDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)))
  const [endDate, setEndDate] = useState(new Date(new Date().setHours(23, 59, 59, 59)))
  const [sendDate, setSendDate] = useState([moment(new Date().setHours(0, 0, 0, 0)).format("DD.MM.YYYY HH:mm:ss"), moment(new Date().setHours(23, 59, 59, 59)).format("DD.MM.YYYY HH:mm:ss")])
  const [loadingOwnerType, setLoadingOwnerType] = useState(false)
  const [loadingByWeek, setLoadingByWeek] = useState(false)
  const [loadingEntry, setLoadingEntry] = useState(false)
  const [loadingExit, setLoadingExit] = useState(false)

  // timers
  const [regionTimer, setRegionTimer] = useState(null)
  const [carOWnerTimer, setCarOwnerTimer] = useState(null)
  const [exitTimer, setExitTimer] = useState(null)
  const [entryTimer, setEntryTimer] = useState(null)

  return (
    <div className="d-flex justify-content-between w-100 h-100">
      <div style={{ width: "11%", height: "100%" }}>
        <CarTypeQuantity
          active={active}
          sendDate={sendDate}
          setSendDate={setSendDate}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setLoadingByWeek={setLoadingByWeek}
          setLoadingOwnerType={setLoadingOwnerType}
          setLoadingEntry={setLoadingEntry}
          setLoadingExit={setLoadingExit}
          setRegionTimer={setRegionTimer}
          setCarOwnerTimer={setCarOwnerTimer}
          setExitTimer={setExitTimer}
          setEntryTimer={setEntryTimer}
        />
      </div>
      <div className="h-100 d-flex flex-column justify-content-between" style={{ width: "88%" }}>
        <CarStatsByRegion
          active={active}
          skin={skin}
          sendDate={sendDate}
          setLoadingEntry={setLoadingEntry}
          setLoadingExit={setLoadingExit}
          loadingExit={loadingExit}
          loadingEntry={loadingEntry}
          setEntryTimer={setEntryTimer}
          setExitTimer={setExitTimer}
          exitTimer={exitTimer}
          entryTimer={entryTimer}
        />
        <div className="d-flex justify-content-between" style={{ height: "49%" }}>
          <CarOwnerTypeQuantity
            carOWnerTimer={carOWnerTimer}
            setCarOwnerTimer={setCarOwnerTimer}
            skin={skin}
            sendDate={sendDate}
            active={active}
            setLoadingOwnerType={setLoadingOwnerType}
            loadingOwnerType={loadingOwnerType}
          />
          <CarRegionByDay regionTimer={regionTimer} setRegionTimer={setRegionTimer} skin={skin} sendDate={sendDate} active={active} setLoadingByWeek={setLoadingByWeek} loadingByWeek={loadingByWeek} />
        </div>
      </div>
    </div>
  )
}

export default CarInfo
