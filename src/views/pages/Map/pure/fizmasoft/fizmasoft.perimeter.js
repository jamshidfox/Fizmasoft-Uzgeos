/*eslint-disable*/
import F from "./fizmasoft"
import "../leaflet/leaflet.awesome-markers"
import "../leaflet/leaflet.bounce"
import "../fizmasoft/fizmasoft.stream"

F.Perimeter = F.Class.extend({
  options: {},
  initialize: function (options) {
    F.setOptions(this, options)
  },

  addTo: function (map) {
    this._map = map
    this._fg = L.featureGroup().addTo(this._map)
    return this
  },

  getMarkerIcon: function (online) {
    return L.AwesomeMarkers.icon({
      prefix: "flaticon",
      icon: "flaticon-barrier-and-car",
      markerColor: online ? "#0d47a1" : "red"
    })
  },

  addPoint: function (data) {
    this.removePoints()
    this._idList = []
    let marker
    data.forEach((d) => {
      if (d.selected && d.coordinates) {
        marker = L.marker(d.coordinates, { icon: this.getMarkerIcon(d.is_online) })
          .addTo(this._fg)
          .bindPopup(() => this.preparePopup(d))
          .bindTooltip(() => this.prepareTooltip(d))
        this._idList.push({ id: d.id, leaflet: marker._leaflet_id })
      }
    })
    this._map.on("zoomend", (e) => {
      if (this._map.getZoom() >= 15)
        this._idList.forEach(({ leaflet }) => {
          this._fg.getLayer(leaflet)?.openTooltip()
        })
      else
        this._idList.forEach(({ leaflet }) => {
          this._fg.getLayer(leaflet)?.closeTooltip()
        })
    })
  },

  prepareTooltip: function (d) {
    const container = L.DomUtil.create("div")
    container.style.cssText = `
    background: ${d.is_online ? "#0d47a1" : "red"} ;
    margin: -5px;
    display: flex;
    width: 180px;
    opacity: 0.9;
    justify-content: space-around;
    `

    const kirish = L.DomUtil.create("h6", "", container)
    kirish.innerText = `K : ${d.kirish}`
    kirish.style.cssText = `
    margin-top: 5px;
    `
    const vl = L.DomUtil.create("div", "", container)
    vl.style.cssText = `
    border-left: 2px solid white;
    margin-left: -1px;
    `
    const chiqish = L.DomUtil.create("h6", "", container)
    chiqish.innerText = `CH : ${d.chiqish}`
    chiqish.style.cssText = `
    margin-top: 5px;
    `
    return container
  },

  preparePopup: function (d) {
    let tr, th, td, btn
    const table = L.DomUtil.create("table", "table")

    const thead = L.DomUtil.create("thead", "", table)
    tr = L.DomUtil.create("tr", "", thead)
    th = L.DomUtil.create("th", "", tr)
    th.innerText = d.title
    th.setAttribute("colspan", "3")
    tr = L.DomUtil.create("tr", "", thead)
    L.DomUtil.create("th", "", tr).innerText = "ip"
    L.DomUtil.create("th", "", tr).innerText = "camera"
    L.DomUtil.create("th", "", tr).innerText = "video"
    if (!d.cameras) return table
    const tbody = L.DomUtil.create("tbody", "", table)

    d.cameras.forEach((camera, i) => {
      tr = L.DomUtil.create("tr", "", tbody)
      L.DomUtil.create("td", "", tr).innerText = i + 1
      L.DomUtil.create("td", "", tr).innerText = camera.ip_address
      td = L.DomUtil.create("td", "", tr)
      btn = L.DomUtil.create("button", "btn fa fa-play  btn-sm", td)
      // btn.innerText = i + 1
      if (!camera.is_online) {
        btn.setAttribute("disabled", true)
        L.DomUtil.addClass(btn, "btn-danger")
      } else {
        L.DomUtil.addClass(btn, "btn-primary")
        L.DomEvent.on(btn, "click", () => this.hanndleStreamBtnClick(camera), this)
      }
    })
    return table
  },

  hanndleStreamBtnClick: function (d) {
    F.stream({
      title: `${d.title}`.replaceAll("Қ", "К").replaceAll("қ", "к").replaceAll("Ғ", "Г").replaceAll("ғ", "г").replaceAll("ў", "у").replaceAll("Ў", "У"),
      ipAddress: d.ip_address,
      password: "parol12345",
      path: "/cam/realmonitor?channel=1&subtype=0"
    }).play()
  },

  removePoints: function () {
    this._fg.clearLayers()
  },

  bounceMarker: function (id) {
    const [marker] = this._idList.filter((i) => i.id === id)
    if (marker) this._fg.getLayer(marker.leaflet)?.bounce(1)
  }
})

F.perimeter = function (options) {
  return new F.Perimeter(options)
}
