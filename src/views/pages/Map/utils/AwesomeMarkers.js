import React from "react"
import L from "leaflet"
import ReactDOMServer from "react-dom/server"

const AwesomeMarker = () => {
  const renderIcon = (value) => {
    return L.divIcon({
      className: "custom-icon",
      html: ReactDOMServer.renderToString(<MarkerIcon title={value} />)
    })
  }
}

export default AwesomeMarker
