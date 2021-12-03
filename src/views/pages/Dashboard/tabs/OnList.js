import React from "react"
import { useSelector } from "react-redux"
import OnListChartPie from "../maleculas/OnListChartPie"

const OnList = ({ active }) => {
  const skin = useSelector((state) => state.layout.isSkinChange)
  return (
    <div>
      <OnListChartPie skin={skin} active={active} />
    </div>
  )
}

export default OnList
