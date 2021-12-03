/*eslint-disable*/
import F from "./fizmasoft"

const token = localStorage.getItem("access_token")?.replaceAll('"', "")

F.Inspektor = F.Class.extend({
  options: {},
  initialize: function (options) {
    F.setOptions(this, options)
  },
  addTo: function (map) {
    this._map = map
    this._fg = L.featureGroup().addTo(this._map)
    this._icon = L.AwesomeMarkers.icon({
      prefix: "flaticon",
      icon: "flaticon-police-1",
      markerColor: "#004d40"
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
          .bindPopup(() => this._renderPopup(d))
        this._idList.push({ id: d.id, leaflet: marker._leaflet_id })
      }
    })
  },

  _renderPopup: function (d) {
    const container = F.DomUtil.create("div")
    container.style.cssText = `
      display: flex;
     
    `
    const img = F.DomUtil.create("img", "", container)
    img.src = `${d.avatar}?token=${token}`
    img.style.cssText = `
      width: 40px;
      height: 60px;
      object-fit: cover;
      margin-right: 10px;
      border: 1px solid red;
    `
    const text = L.DomUtil.create("div", "", container)
    L.DomUtil.create("span", "", text).innerText = `inspektor - ${d.full_name}`
    L.DomUtil.create("br", "", text)
    L.DomUtil.create("br", "", text)
    L.DomUtil.create("span", "", text).innerText = `jeton - ${d.username}`
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

F.inspektor = function (options) {
  return new F.Inspektor(options)
}
