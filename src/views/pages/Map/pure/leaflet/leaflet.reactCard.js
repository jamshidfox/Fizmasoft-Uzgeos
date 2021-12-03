import ReactDOM from "react-dom"
import React, { useState, useEffect } from "react"
import { Card, CardHeader, CardBody } from "reactstrap"

const ReactCard = ({ options }) => {
  return (
    <Card style={{ margin: 0, padding: 0, width: 200, height: "9000px", margin: -15, background: "transparent" }}>
      <CardBody style={{ marginTop: -17 }}>{options.content}</CardBody>
    </Card>
  )
}

export default ReactCard

/*eslint-disable*/
import L from "leaflet"
L.Control.ReactCard = L.Control.extend({
  options: {
    position: "topright"
  },
  initialize: function (options) {
    L.setOptions(this, options)
  },
  onAdd: function (map) {
    this._map = map
    this._container = L.DomUtil.create("div", "")
    this._container.style.cssText = `
        border-radius: 5px;
        background: transparent;
    `
    ReactDOM.render(<ReactCard options={this.options} />, this._container)
    return this._container
  },

  changeContent: function (options) {
    ReactDOM.render(<ReactCard options={options} />, this._container)
  }
})
L.control.reactCard = function (options) {
  return new L.Control.ReactCard(options)
}
