/*eslint-disable*/
import F from "./fizmasoft"

F.Ptz = F.Class.extend({
  options: {},
  initialize: function (options) {
    F.setOptions(this, options)
  },
  addTo: function (map) {
    this._map = map
    this._fg = L.featureGroup().addTo(this._map)
    this._icon = L.AwesomeMarkers.icon({
      prefix: "fa",
      icon: "fa-video",
      markerColor: "#311b92"
    })
    return this
  },
  addPoint: function (data) {
    this.removePoints()
    this._idList = []
    let marker
    data.forEach((d) => {
      if (d.selected) {
        marker = L.marker(d.coordinates, { icon: this._icon })
          .addTo(this._fg)
          .bindPopup(() => this._popupContent(d))
        this._idList.push({ id: d.id, leaflet: marker._leaflet_id })
      }
    })
  },
  _popupContent: function (d) {
    if (d.id !== "142") return `PTZ - ${d.title}`
    const container = L.DomUtil.create("div")
    L.DomUtil.create("p", "", container).innerHTML = `PTZ - ${d.title}`
    const btn = L.DomUtil.create("button", "btn-primary", container)
    btn.innerHTML = "video"
    L.DomEvent.on(
      btn,
      "click",
      () => {
        F.stream({
          title: d.ip_address,
          ipAddress: d.ip_address,
          password: "parol12345",
          path: "/cam/realmonitor?channel=1&subtype=0",
          ptz: 1
        }).play()
      },
      this
    )
    return container
  },
  removePoints: function () {
    this._fg.clearLayers()
  },
  bounceMarker: function (id) {
    const [marker] = this._idList.filter((i) => i.id === id)
    this._fg.getLayer(marker.leaflet).bounce(1)
  }
})

F.ptz = function (options) {
  return new F.Ptz(options)
}
