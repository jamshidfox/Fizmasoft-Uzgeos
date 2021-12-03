/* eslint-disable */

import F from "./fizmasoft"
F.Xududlar = F.Class.extend({
  options: {},
  initialize: function (options) {
    F.setOptions(this, options)
  },
  addTo: function (map) {
    this._map = map
    this._fg = L.featureGroup().addTo(this._map)
    return this
  },
  drawXududlar: function (data) {
    L.geoJSON(data.way, {
      style: (feature) => {
        return { color: this._getRandColor() }
      }
    })
      .bindPopup(function (layer) {
        return layer.feature.properties.name
      })
      .addTo(this._fg)
  },
  removeXududlar: function () {
    this._fg.clearLayers()
  },
  _getRandColor: function () {
    const letters = "0123456789ABCDEF"
    let color = "#"
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }
})

F.xududlar = function (options) {
  return new F.Xududlar(options)
}
