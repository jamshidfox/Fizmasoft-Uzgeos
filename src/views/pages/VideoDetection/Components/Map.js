import { useState, useEffect } from "react"
import ReactBasicMap from "../../Map/utils/ReactBasicMap"
import L from "leaflet"
import "@geoman-io/leaflet-geoman-free"
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css"
import { Button } from "reactstrap"
import { Map as MapIcon } from "react-feather"
import { injectIntl } from "react-intl"

const fg = L.featureGroup()

const Map = ({ intl, height }) => {
  const [map, setMap] = useState(null)
  const addPmController = () => {
    map.pm.addControls({
      position: "topleft",
      drawCircleMarker: false,
      drawMarker: false,
      drawRectangle: false,
      drawPolyline: false,
      editMode: false,
      dragMode: false,
      cutPolygon: false,
      rotateMode: false
    })
    map.pm.setPathOptions({
      color: "#7367f0",
      fillColor: "#7367f0"
    })
    map.on("pm:create", (e) => fg.addLayer(e.layer)).on("pm:remove", (e) => fg.removeLayer(e.layer))
  }

  useEffect(() => {
    if (!map) return
    addPmController()
  }, [map])

  const mapClick = () => {
    map.fullscreenControl._container.firstElementChild.click()
  }

  return (
    <div style={{ height, marginTop: 10 }}>
      <Button onClick={mapClick} outline size="sm">
        <MapIcon /> {"  "}
        {intl.formatMessage({ id: "NavMap" })}
      </Button>
      <div>
        <ReactBasicMap getMap={setMap} enableZoom={false} fullscreen={true} resize1={height} resize2={map}></ReactBasicMap>
      </div>
    </div>
  )
}

export default injectIntl(Map)
