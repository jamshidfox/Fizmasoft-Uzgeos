/* eslint-disable */
import F from "./fizmasoft"
import "../leaflet/leaflet.bounce"
import "../styles/fizmasoft/fizmasoft.alarm.css"

F.Alarm = F.Class.extend({
  options: {},
  initialize: function (options) {
    F.setOptions(this, options)
  },
  addTo: function (map) {
    this._map = map
    this._fg = L.featureGroup().addTo(this._map)
    this._icon = L.AwesomeMarkers.icon({
      prefix: "fa",
      icon: "fa-user-circle",
      markerColor: "red"
    })
    return this
  },
  startAlarm: function (latlng, result, searchUrl, callback) {
    this._map.flyTo(latlng, 17)
    L.circle(latlng, 100, { color: "red" }).addTo(this._fg)
    L.marker(latlng, { icon: this._icon })
      .addTo(this._fg)
      .bindPopup(() => this._popupContent(result, searchUrl, callback))
      .openPopup()
  },
  endAlarm: function () {
    this._fg.clearLayers()
  },
  _popupContent: function (result, searchUrl, callback) {
    const container = L.DomUtil.create("div", "")
    const imagesDiv = L.DomUtil.create("div", "search-found-div", container)
    let imgDiv
    let details
    imgDiv = L.DomUtil.create("div", "", imagesDiv)
    L.DomUtil.create("h4", "alarm-title", imgDiv).innerHTML = "Qidirilgan"
    const img1 = L.DomUtil.create("img", "image-searched ", imgDiv)
    imgDiv = L.DomUtil.create("div", "", imagesDiv)
    L.DomUtil.create("h4", "alarm-title", imgDiv).innerHTML = "Topilgan"
    const img2 = L.DomUtil.create("img", "image-found ", imgDiv)
    const token = localStorage.getItem("access_token")
    img1.src = `${searchUrl}?token=${JSON.parse(token)}`
    img2.src = `${result[0].img}?token=${JSON.parse(token)}`
    const detailsContainer = L.DomUtil.create("div", "details-container", container)
    L.DomUtil.create("h3", "alarm-title", detailsContainer).innerHTML = "Malumotlar"
    details = L.DomUtil.create("div", "d-flex justify-content-around", detailsContainer)
    L.DomUtil.create("p", "", details).innerHTML = result[0].fullname
    details = L.DomUtil.create("div", "d-flex justify-content-around", detailsContainer)
    L.DomUtil.create("p", "", details).innerHTML = "Tug'ulgan sana:      "
    L.DomUtil.create("p", "", details).innerHTML = result[0].birthday
    details = L.DomUtil.create("div", "d-flex justify-content-around", detailsContainer)
    L.DomUtil.create("p", "", details).innerHTML = "Pasport raqami:      "
    L.DomUtil.create("p", "", details).innerHTML = result[0].passport
    details = L.DomUtil.create("div", "d-flex justify-content-around", detailsContainer)
    L.DomUtil.create("p", "", details).innerHTML = "O'xshashligi:    "
    L.DomUtil.create("p", "", details).innerHTML = result[0].similarity + "%"
    const moreBtn = L.DomUtil.create("button", "btn-primary mx-auto", detailsContainer)
    moreBtn.innerHTML = "To'liq"
    L.DomEvent.on(moreBtn, "click", () => callback())
    return container
  }
})

F.alarm = function (options) {
  return new F.Alarm(options)
}
