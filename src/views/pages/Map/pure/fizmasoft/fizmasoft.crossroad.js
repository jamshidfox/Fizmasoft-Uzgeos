/*eslint-disable*/
import F from "./fizmasoft"
import "../leaflet/leaflet.reactwindow"
import svg from "../fonts/Choraxa-minor.svg"
import choraxa from "../fonts/choraxa.json"
import { ReactSVG } from "react-svg"

F.Crossroad = F.Class.extend({
  options: {},
  initialize: function (options) {
    F.setOptions(this, options)
  },
  addTo: function (map) {
    this._map = map
    this._fg = L.featureGroup().addTo(this._map)
    this._icon = L.AwesomeMarkers.icon({
      prefix: "flaticon",
      icon: "flaticon-traffic-light",
      markerColor: "darkgreen"
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
  removePoints: function () {
    this._fg.clearLayers()
  },
  bounceMarker: function (id) {
    const [marker] = this._idList.filter((i) => i.id === id)
    this._fg.getLayer(marker.leaflet).bounce(1)
  },
  _popupContent: function (d) {
    if (d.id !== 12) return `Chorraxa - ${d.title}`
    const container = L.DomUtil.create("div", "table")
    L.DomUtil.create("p", "", container).innerHTML = `Chorraxa - ${d.title}`
    const btn = L.DomUtil.create("button", "btn-primary", container)
    btn.innerHTML = "Sxemani korish"
    L.DomEvent.on(btn, "click", this._schemeModal, this)
    return container
  },
  _schemeModal: function () {
    const ip = "10.4.66."
    L.control.reactWindow({
      modalCls: "modal-dialog-centered modal-lg",
      title: <h2>Схема</h2>,
      content: (
        <div>
          <ReactSVG
            afterInjection={(err, svg) => {
              choraxa.forEach((ch) => {
                document.querySelector(ch.query).addEventListener("click", () => {
                  const i = `${ip}${ch.id}`
                  F.stream({
                    title: i,
                    ipAddress: i,
                    password: "parol12345",
                    path: "/cam/realmonitor?channel=1&subtype=0",
                    ptz: ch.id === 210 ? 1 : 0
                  }).play()
                })
              })
            }}
            beforeInjection={(svg) => {
              svg.setAttribute("style", "width: 120%")
              svg.setAttribute("style", "margin-left:-150px")
            }}
            src={svg}
          />
        </div>
      ),
      visible: true
    })
  }
})

F.crossroad = function (options) {
  return new F.Crossroad(options)
}
