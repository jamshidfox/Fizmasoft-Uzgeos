/* eslint-disable*/
import F from "./fizmasoft"
import "../leaflet/leaflet.markercluster"

F.OnList = F.Class.extend({
  options: {},
  initialize: function (options) {
    F.setOptions(this, options)
  },
  addTo: function (map) {
    this._map = map
    this._fg = L.featureGroup().addTo(this._map)
    this._markers = L.markerClusterGroup()
    this._iconCrime = L.AwesomeMarkers.icon({
      prefix: "flaticon",
      icon: "flaticon-wanted-1",
      markerColor: "red"
    })
    this._iconGun = L.AwesomeMarkers.icon({
      prefix: "flaticon",
      icon: "flaticon-gun",
      markerColor: "blue"
    })
    return this
  },
  addPoints: function (data, types, cb) {
    this.removePoints()
    data.forEach((d) => {
      this._markers.addLayer(L.marker(d.coordinates, { icon: d.has_gun ? this._iconGun : this._iconCrime }).bindPopup(() => this._popupContent(d, types, cb)))
    })
    this._map.addLayer(this._markers)
  },

  removePoints: function () {
    this._markers?.clearLayers()
  },

  _popupContent: function (content, types, cb) {
    const container = L.DomUtil.create("div")
    L.DomUtil.create("h6", "", container).innerHTML = content.fullname
    const div = L.DomUtil.create("div", "d-flex justify-content-between", container)
    L.DomUtil.create("em", "", div).innerHTML = "ro'yxat turlari:"
    let t = ``
    if (content.has_gun) t += `${types[0].title}`
    types.forEach((type) => {
      if (content.criminal_types?.includes(+type.id)) {
        t += `${type.title}, `
      }
    })
    L.DomUtil.create("strong", "", div).innerHTML = t
    const btn = L.DomUtil.create("button", "btn-primary mt-1", container)
    btn.innerHTML = "to'liq"
    L.DomEvent.on(btn, "click", () => cb(content))
    return container
  }
})

F.onList = function (options) {
  return new F.OnList(options)
}
