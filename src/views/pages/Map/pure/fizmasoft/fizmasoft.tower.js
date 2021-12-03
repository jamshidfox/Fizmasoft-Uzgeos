/*eslint-disable*/
import axios from "axios"
import F from "./fizmasoft"
import useJwt from "@src/auth/jwt/useJwt"
const config = useJwt.jwtConfig

F.Tower = F.Class.extend({
  options: {},
  initialize: async function (options) {
    F.setOptions(this, options)
    const { data } = await axios.get(`${config.url}/df-datas/protocols`)
    this.protocols = data
  },
  addTo: function (map) {
    this._map = map
    this._fg = L.featureGroup().addTo(this._map)
    this._icon = L.AwesomeMarkers.icon({
      prefix: "fa",
      icon: "fa-hotel",
      markerColor: "#37474f"
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
    let tr, th, td, btn
    const table = L.DomUtil.create("table", "table table-sm")

    const thead = L.DomUtil.create("thead", "", table)
    tr = L.DomUtil.create("tr", "", thead)
    th = L.DomUtil.create("th", "", tr)
    th.innerText = d.object_name
    th.setAttribute("colspan", "3")
    tr = L.DomUtil.create("tr", "", thead)
    L.DomUtil.create("th", "", tr).innerText = "ip"
    L.DomUtil.create("th", "", tr).innerText = "camera"
    L.DomUtil.create("th", "", tr).innerText = "video"
    if (!d.cameras) return table
    const tbody = L.DomUtil.create("tbody", "", table)

    d.cameras.forEach((camera, i) => {
      if (!camera.status) return
      tr = L.DomUtil.create("tr", "", tbody)
      L.DomUtil.create("td", "", tr).innerText = camera.camera_ip
      L.DomUtil.create("td", "", tr).innerText = camera.camera_type
      td = L.DomUtil.create("td", "", tr)
      btn = L.DomUtil.create("button", "btn fa fa-play  btn-sm", td)
      L.DomUtil.addClass(btn, "btn-primary")
      L.DomEvent.on(btn, "click", () => this.hanndleStreamBtnClick(camera), this)
    })
    return table
  },
  hanndleStreamBtnClick: function (d) {
    console.log({
      title: `${d.camera_ip}`.replaceAll("Қ", "К").replaceAll("қ", "к").replaceAll("Ғ", "Г").replaceAll("ғ", "г").replaceAll("ў", "у").replaceAll("Ў", "У"),
      ipAddress: d.camera_ip,
      password: d.password,
      login: d.login,
      path: this.protocols.filter((type) => d.camera_type.toLowerCase() === type.title.toLowerCase())?.[0].url
    })
    F.stream({
      title: `${d.camera_ip}`.replaceAll("Қ", "К").replaceAll("қ", "к").replaceAll("Ғ", "Г").replaceAll("ғ", "г").replaceAll("ў", "у").replaceAll("Ў", "У"),
      ipAddress: d.camera_ip,
      password: d.password,
      login: d.login,
      path: this.protocols.filter((type) => d.camera_type.toLowerCase() === type.title.toLowerCase())?.[0].url
    }).play()
  },
  removePoints: function () {
    this._fg.clearLayers()
  },
  bounceMarker: function (id) {
    const [marker] = this._idList.filter((i) => i.id === id)
    this._fg.getLayer(marker.leaflet).bounce(1)
  }
})

F.tower = function (options) {
  return new F.Tower(options)
}
