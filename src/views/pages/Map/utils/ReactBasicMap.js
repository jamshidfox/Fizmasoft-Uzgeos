import { MapContainer, TileLayer, LayersControl, ScaleControl, Marker } from "react-leaflet"
import MapZoomLabel from "./MapZoomLabel"
import MapRuler from "./MapRuler"
import { useState, useEffect } from "react"
import styled from "styled-components"
import "leaflet-fullscreen/dist/Leaflet.fullscreen.js"
import "leaflet-fullscreen/dist/leaflet.fullscreen.css"
import "leaflet/dist/leaflet.css"

import "react-contexify/dist/ReactContexify.min.css"
import "@styles/react/libs/context-menu/context-menu.scss"

// ** JWT config
import useJwt from "@src/auth/jwt/useJwt"
const config = useJwt.jwtConfig

const preLayers = [
  {
    name: "OpenStreetMap.Mapnik",
    url: config.ligth_map_tile,
    selected: true
  }
]
const prePos = { center: [41.31, 69.29], zoom: 10 }

const ReactBasicMap = ({ getMap = null, enableZoom = true, center, zoom, layers, fullscreen, children, ruler, resize1, resize2 }) => {
  const renderLayers = layers || preLayers
  const pos = { center: center || prePos.center, zoom: zoom || prePos.zoom }

  const [map, setMap] = useState()

  useEffect(() => {
    if (map && typeof getMap === "function") getMap(map)
  }, [map])

  useEffect(() => {
    if (!map) return
    map.setView(center ? center : map.getCenter(), zoom ? zoom : map.getZoom())
  }, [zoom, center])

  useEffect(() => {
    if (map) {
      setTimeout(() => {
        map.invalidateSize()
      }, 550)
    }
  }, [resize1, resize2])

  return (
    <CustomMap zoomControl={enableZoom} style={{ width: "100%", height: "100%" }} center={pos.center} zoom={pos.zoom} className="leaflet-map" whenCreated={setMap} fullscreenControl={fullscreen}>
      <LayersControl>
        {renderLayers.map((layer, i) => (
          <LayersControl.BaseLayer checked={layer.selected} name={layer.name} key={layer.name}>
            <TileLayer url={layer.url} />
          </LayersControl.BaseLayer>
        ))}
      </LayersControl>
      <MapZoomLabel />
      <ScaleControl metric={true} imperial={false} />
      {children}
      {ruler ? <MapRuler /> : null}
    </CustomMap>
  )
}

export default ReactBasicMap

const CustomMap = styled(MapContainer)`
  .leaflet-control-zoomlabel {
    background-color: red;
    box-shadow: 0 0 5px #bbb;
    padding: 0 5px;
    margin: 0;
    color: #333;
    font: 11px/1.5 "Helvetica Neue", Arial, Helvetica, sans-serif;
  }
  .leaflet-control-buttons {
    margin-left: 0px !important;
    margin-top: 0px !important;
  }

  .leaflet-selected {
    background-color: #675ed5 !important;
    color: #fff !important;
  }

  .leaflet-control-buttons .leaflet-control-buttons-item:focus {
    outline: none;
  }

  .leaflet-control-buttons-item {
    position: relative;
    display: inline-block;
  }

  .leaflet-control-buttons-item .leaflet-control-buttons-tooltip {
    visibility: hidden;
    white-space: nowrap;
    margin-top: -1px;
    left: 30px;
    width: auto;
    background-color: white;
    color: #000000;
    text-align: center;
    border-radius: 4px;
    padding: 0px 5px;
    position: absolute;
    opacity: 0.8;
    z-index: 1;
    border: 1px solid #989898;
  }

  .leaflet-control-buttons-item:hover .leaflet-control-buttons-tooltip {
    visibility: visible;
  }
  .leaflet-control {
    background-color: white;
  }
  .result-tooltip {
    background-color: white;
    border-width: medium;
    border-color: #675ed5;
    font-size: smaller;
  }
  .moving-tooltip {
    background-color: rgba(255, 255, 255, 0.7);
    background-clip: padding-box;
    opacity: 0.5;
    border: dotted;
    border-color: #675ed5;
    font-size: smaller;
  }
  .plus-length {
    padding-left: 45px;
    display: none;
  }
`
