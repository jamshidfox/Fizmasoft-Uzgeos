import { Card } from "reactstrap"
import CarInOut from "../maleculas/carCharts/CarInOut"
import CarPenaltyType from "../maleculas/carCharts/CarPenaltyType"
const Car = ({ active }) => {
  return (
    <>
      <div style={{ height: "100%", display: "flex", justifyContent: "space-between" }}>
        <CarPenaltyType active={active} />
      </div>
    </>
  )
}

export default Car
