import { createControlComponent } from "@react-leaflet/core"
import L from "leaflet"

L.Control.ZoomLabel = L.Control.extend({
  options: {
    position: "bottomleft"
  },

  onAdd(map) {
    this._container = L.DomUtil.create("div", "leaflet-control-zoomlabel")
    L.DomEvent.disableClickPropagation(this._container)
    map.on("zoomend", this._onZoomend, this)
    this._container.innerHTML = map.getZoom()
    return this._container
  },

  onRemove(map) {
    map.off("zoomend", this._onZoomend)
  },

  _onZoomend(e) {
    const scale = this._Scale[e.target._zoom]
    this._container.innerHTML = `${e.target._zoom}`
  },

  _Scale: [
    "500 million",
    "250 million",
    "150 million",
    "70 million",
    "35 million",
    "15 million",
    "10 million",
    "4 million",
    "2 million",
    "1 million",
    "500 thousand",
    "250 thousand",
    "150 thousand",
    "70 thousand",
    "35 thousand",
    "15 thousand",
    "8 thousand",
    "4 thousand",
    "2 thousand",
    "1 thousand",
    "5 hundred"
  ]
})

const MapZoomLabel = createControlComponent(
  (props) => new L.Control.ZoomLabel(props)
)
export default MapZoomLabel
