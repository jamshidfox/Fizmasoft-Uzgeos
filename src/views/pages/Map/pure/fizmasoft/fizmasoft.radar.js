/*eslint-disable*/
import F from "./fizmasoft"
import "../leaflet/leaflet.awesome-markers"
import "../leaflet/leaflet.bounce"

F.Radar = F.Class.extend({
  options: {},
  initialize: function (options) {
    F.setOptions(this, options)
  },
  addTo: function (map) {
    this._map = map
    this._fg = L.featureGroup().addTo(this._map)
    this._icon = L.AwesomeMarkers.icon({
      prefix: "flaticon",
      icon: "flaticon-speed-radar",
      markerColor: "cadetblue"
    })
    return this
  },
  addPoint: function (data) {
    this.removePoints()
    this._idList = []
    let marker
    data.forEach((d) => {
      if (d.selected) {
        marker = L.marker(d.coordinates, { icon: this._icon }).addTo(this._fg).bindPopup(`Radar - ${d.title}`)
        this._idList.push({ id: d.id, leaflet: marker._leaflet_id })
      }
    })
  },
  removePoints: function () {
    this._fg.clearLayers()
  },
  bounceMarker: function (id) {
    const [marker] = this._idList.filter((i) => i.id === id)
    this._fg.getLayer(marker.leaflet).bounce(1)
  }
})

F.radar = function (options) {
  return new F.Radar(options)
}
