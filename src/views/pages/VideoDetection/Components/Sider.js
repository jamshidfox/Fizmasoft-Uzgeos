import Card from "reactstrap/lib/Card"
import Map from "./Map"

const Sider = ({ mapHeight, children }) => {
  return (
    <Card style={{ height: 770, width: 240, padding: "7px", position: "fixed" }}>
      {children}
      <Map height={mapHeight} />
    </Card>
  )
}

export default Sider
