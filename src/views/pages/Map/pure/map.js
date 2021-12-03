import L from "leaflet"
import F from "./fizmasoft/fizmasoft"

/* Leaflet modules */
import "./leaflet/leaflet.ruler"
import "./leaflet/leaflet.geometryutil"
import "./leaflet/leaflet.zoomlabel"
import "./leaflet/leaflet.loader"
import "./leaflet/leaflet.search"
import "./leaflet/leaflet.buttons"

import "./fizmasoft/fizmasoft.address"

/* Connections */
import contextConnections from "./connections/contextConnections"
import geomConnections from "./connections/geomConnections"
import rulerConnections from "./connections/rulerConnections"
import videoEffectConnections from "./connections/videoEffectConnection"

/* Leaflet CSS */
import "leaflet/dist/leaflet.css"
import "./styles/leaflet/leaflet.css"
import "./styles/leaflet/leaflet.ruler.css"
import "./styles/leaflet/leaflet.zoomlabel.css"
import "./styles/others/flaticon.css"
import "./styles/leaflet/leaflet.search.css"
import "./styles/leaflet/leaflet.buttons.css"
import "./styles/fizmasoft/fizmasoft.sparklingMarker.css"

import "./styles/others/fontawesome.css"
import "./styles/leaflet/leaflet.awesome-markers.css"
import "./styles/leaflet/leaflet.loader.css"
import "./styles/leaflet/leaflet.markercluster.css"
import "./styles/leaflet/leaflet.markercluster.default.css"

import radarConnections from "./connections/radarConnections"
import perimeterConnections from "./connections/perimeter.Connections"
import crossroadConnections from "./connections/crossroadConnection"
import xatlovConnections from "./connections/xatlovConnections"
import ptzConnections from "./connections/ptzConnections"
import xududConnections from "./connections/xududConnections"
import alarmConnections from "./connections/alarmConnections"
import onListConnections from "./connections/onlistConnections"
import inspektorConnections from "./connections/inspektorConnections"

// ** JWT config
import useJwt from "@src/auth/jwt/useJwt"
import noturarConnections from "./connections/noturarConnections"
import towerConnections from "./connections/towerConnections"
const config = useJwt.jwtConfig

/* eslint-disable */

const initMap = (map, callbacks) => {
  const attr = { maxZoom: 18, attribution: `&copy; ABL-Soft&SS 2014-${new Date().getFullYear()}` }
  const light = L.tileLayer(config.ligth_map_tile, L.Util.extend({}, attr))
  const dark = L.tileLayer(config.dark_map_tile, L.Util.extend({}, attr))
  // const light = L.tileLayer(`http://${window.location.hostname}/osm_tiles/{z}/{x}/{y}.png`, L.Util.extend({}, attr))
  // const dark = L.tileLayer(`http://${window.location.hostname}/dark_matter/{z}/{x}/{y}.png`, L.Util.extend({}, attr))

  const google = L.tileLayer(`http://mt{s}.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}`, L.Util.extend({}, attr, { subdomains: "0123" }))

  const baseMaps = {
    // Карта: osm,
    Google: google
  }

  L.control.zoomLabel().addTo(map)

  L.control.scale({ imperial: false }).addTo(map)
  F.address().addTo(map)
  L.control
    .buttons([
      [
        {
          id: 0,
          title: "Харитани кайтариш",
          iconCls: "fa fa-map",
          callback: (e) => {
            e.target.click()
            map.flyTo([41.31, 69.29], 12)
          }
        }
      ]
    ])
    .addTo(map)

  const videoEffect = (title) => {
    videoEffectConnections.initVideEffect(title, map)
  }
  const alarmFuncs = alarmConnections.connectToMap(map)

  // TOOLS
  const rulerFuncs = rulerConnections.connectToMap(map)
  const xududFuncs = xududConnections.connectToMap(map)
  const geomFuncs = geomConnections.connectToMap(map, callbacks.onListForma1)

  // GPS
  const inspektorFuncs = inspektorConnections.connectToMap(map)

  // CAMERA
  const radarFuncs = radarConnections.connectToMap(map)
  const perimeterFuncs = perimeterConnections.connectToMap(map)
  const crossroadFuncs = crossroadConnections.connectToMap(map)
  const ptzFuncs = ptzConnections.connectToMap(map)
  const towerFuncs = towerConnections.connectToMap(map)

  // NOTURARLAR
  const noturarFuncs = noturarConnections.connectToMap(map)

  // RO'YXATDAGILAR
  const onListFuncs = onListConnections.connectToMap(map)

  const xatlov = xatlovConnections.connectToMap(map)

  contextConnections.initMapContext(map)
  contextConnections.addXatlovContext(map, callbacks.xatlov)

  return {
    xatlov,
    light,
    dark,
    videoEffect,
    ...videoEffectConnections,
    ...onListFuncs,
    ...alarmFuncs,
    ...inspektorFuncs,
    ...xududFuncs,
    ...rulerFuncs,
    ...geomFuncs,
    ...radarFuncs,
    ...perimeterFuncs,
    ...crossroadFuncs,
    ...ptzFuncs,
    ...towerFuncs,
    ...noturarFuncs
  }
}

export default initMap
