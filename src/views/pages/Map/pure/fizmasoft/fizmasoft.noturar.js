/*eslint-disable*/
import F from "./fizmasoft"
import moment from "moment"
import "../leaflet/leaflet.awesome-markers"
import "../leaflet/leaflet.bounce"
import iconsList from "../fonts/flaticon.json"

F.Noturar = F.Class.extend({
  options: {},
  initialize: function (options) {
    F.setOptions(this, options)
  },
  addTo: function (map) {
    this._map = map
    this._fg = L.featureGroup().addTo(this._map)
    return this
  },

  getIcon: function (id) {
    let iconText = ""
    iconsList.forEach((icon) => {
      if (icon.id == id) iconText = icon.icon
    })
    return L.AwesomeMarkers.icon({
      prefix: "flaticon",
      icon: `${iconText}`,
      markerColor: "#006064"
    })
  },

  addPoint: function (data, iconId) {
    this._idList = []
    let marker
    data.forEach((d) => {
      if (d.selected) {
        marker = L.marker(d.coordinates, { icon: this.getIcon(iconId) })
          .addTo(this._fg)
          .bindPopup(this.popupContent(d))
        this._idList.push({ id: d.id, leaflet: marker._leaflet_id })
      }
    })
  },

  popupContent: function (d) {
    let tr, th
    const table = L.DomUtil.create("table", "table table-sm table-bordered")

    const thead = L.DomUtil.create("thead", "", table)
    tr = L.DomUtil.create("tr", "", thead)
    th = L.DomUtil.create("th", "", tr)
    th.innerText = d.company_name
    th.setAttribute("colspan", "3")

    const tbody = L.DomUtil.create("tbody", "", table)

    tr = L.DomUtil.create("tr", "", tbody)
    L.DomUtil.create("td", "", tr).innerText = "STIR"
    L.DomUtil.create("td", "", tr).innerText = d.company_stir

    tr = L.DomUtil.create("tr", "", tbody)
    L.DomUtil.create("td", "", tr).innerText = "Telefon raqami"
    L.DomUtil.create("td", "", tr).innerText = d.phone_number

    tr = L.DomUtil.create("tr", "", tbody)
    L.DomUtil.create("td", "", tr).innerText = "Xodimlar soni"
    L.DomUtil.create("td", "", tr).innerText = d.number_of_workers

    tr = L.DomUtil.create("tr", "", tbody)
    L.DomUtil.create("td", "", tr).innerText = "Rahbar"
    L.DomUtil.create("td", "", tr).innerText = d.directors_fullname

    tr = L.DomUtil.create("tr", "", tbody)
    L.DomUtil.create("td", "", tr).innerText = "Rahbar tug'ulgan sana"
    L.DomUtil.create("td", "", tr).innerText = moment(d.directors_birthday).format("DD.MM.YYYY")

    tr = L.DomUtil.create("tr", "", tbody)
    L.DomUtil.create("td", "", tr).innerText = "Rahbar passport raqami"
    L.DomUtil.create("td", "", tr).innerText = d.directors_passport_raqami

    tr = L.DomUtil.create("tr", "", tbody)
    L.DomUtil.create("td", "", tr).innerText = "Kadastr raqami"
    L.DomUtil.create("td", "", tr).innerText = d.kadastr_raqami

    tr = L.DomUtil.create("tr", "", tbody)
    L.DomUtil.create("td", "", tr).innerText = "Tashqi kameralar"
    L.DomUtil.create("td", "", tr).innerText = d.number_of_external_cameras

    tr = L.DomUtil.create("tr", "", tbody)
    L.DomUtil.create("td", "", tr).innerText = "Ichki kameralar"
    L.DomUtil.create("td", "", tr).innerText = d.number_of_internal_cameras

    return table
  },

  removePoints: function () {
    this._fg.clearLayers()
  }
})

F.noturar = function (options) {
  return new F.Noturar(options)
}
