import styled from "styled-components"
import { MapContainer, TileLayer, LayersControl, Marker } from "react-leaflet"
import { CardBody } from "reactstrap"
import "@styles/react/libs/maps/map-leaflet.scss"
const CustomMap = styled(MapContainer)`
  width: 100%;
  height: calc(100vh- 300px);
`

const UserMap = ({ location }) => {
  const zoom = 14

  return (
    <CustomMap center={location} zoom={zoom} className="leaflet-map">
      <LayersControl>
        <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
          <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="OpenStreetMap.BlackWhite">
          <TileLayer url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png" />
        </LayersControl.BaseLayer>
      </LayersControl>
      <Marker position={location} />
    </CustomMap>
  )
}
export default UserMap
