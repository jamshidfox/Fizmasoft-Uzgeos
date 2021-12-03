import XatlovChartjsDoughnutChart from "../maleculas/XatlovChartjsDoughnutChart"
import GenderChartjsPolarAreaChart from "../maleculas/gender/GenderChartjsPolarAreaChart"
import GenderByType from "../maleculas/gender/GenderByType"
const Hatlov = ({ active }) => {
  return (
    <div style={{ height: "100%", display: "flex" }}>
      <div style={{ width: "50%" }}>
        <XatlovChartjsDoughnutChart active={active} />
        <GenderChartjsPolarAreaChart active={active} />
      </div>
      <GenderByType active={active} />
    </div>
  )
}

export default Hatlov
