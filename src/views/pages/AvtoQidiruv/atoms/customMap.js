import React from "react"
import { Marker, Polyline, Popup } from "react-leaflet"
import { Card } from "reactstrap"
import ReactBasicMap from "../../Map/utils/ReactBasicMap"
import moment from "moment"

import L from "leaflet"
import icon from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -25]
})
L.Marker.prototype.options.icon = DefaultIcon

const CustomMap = ({ resize, carOnMap }) => {
  const constructLine = (data) => {
    return data.map((d) => d.coordinates)
  }

  return (
    <Card style={{ height: 425, width: "100%" }}>
      <ReactBasicMap resize1={resize} fullscreen={true}>
        <Polyline positions={constructLine(carOnMap)} />
        {carOnMap.map((d, i) => (
          <Marker key={i} position={d.coordinates}>
            <Popup>{`${i + 1}) ${d.object_title} ${moment(d.the_date).format("DD.MM.YYYY HH:mm")}`}</Popup>
          </Marker>
        ))}
      </ReactBasicMap>
    </Card>
  )
}

export default CustomMap
