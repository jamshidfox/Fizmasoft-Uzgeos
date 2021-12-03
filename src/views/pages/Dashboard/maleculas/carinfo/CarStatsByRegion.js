import React, { useState } from "react"
import CarEntryByType from "./CarEntryByType"
import CarExitByType from "./CarExitByType"

const CarStatsByRegion = ({ skin, sendDate, active, loadingEntry, loadingExit, setLoadingEntry, setLoadingExit, setEntryTimer, setExitTimer, exitTimer, entryTimer }) => {
  return (
    <div style={{ height: "49%" }} className="d-flex justify-content-between">
      <CarEntryByType skin={skin} sendDate={sendDate} active={active} setLoadingEntry={setLoadingEntry} loadingEntry={loadingEntry} setEntryTimer={setEntryTimer} entryTimer={entryTimer} />
      <CarExitByType skin={skin} sendDate={sendDate} active={active} setLoadingExit={setLoadingExit} loadingExit={loadingExit} setExitTimer={setExitTimer} exitTimer={exitTimer} />
    </div>
  )
}

export default CarStatsByRegion
