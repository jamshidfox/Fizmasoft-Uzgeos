/* eslint-disable*/
import F from "./fizmasoft"
import iconsList from "../fonts/flaticon.json"

F.Xatlov = F.Class.extend({
  options: {},
  initialize: function (options) {
    F.setOptions(this, options)
  },
  addTo: function (map) {
    this._map = map
    this._fg = L.featureGroup().addTo(this._map)
    this._spinIcon = L.AwesomeMarkers.icon({
      prefix: "fa",
      icon: "fa-cog",
      markerColor: "red",
      spin: true
    })
    return this
  },
  addPoint: function (latlng) {
    this._fg.clearLayers()
    this._pointMarker = L.marker(latlng, { icon: this._spinIcon }).addTo(this._fg)
  },
  removePoints: function () {
    this._fg.clearLayers()
  },
  changeIcon: function (latlng, is_dom, address) {
    const icon = L.AwesomeMarkers.icon({
      prefix: "fa",
      icon: `fa-${is_dom}`,
      markerColor: "#9c27b0"
    })
    if (this._pointMarker) {
      this._pointMarker.setIcon(icon)
    } else {
      this._pointMarker = L.marker(latlng, { icon }).addTo(this._fg)
    }
    if (address) this._pointMarker.bindPopup(address)
    else this._pointMarker.bindPopup("Turar joy manzili xaqida ma'lumot yoq")
  },

  addBusinessPoints: function (data) {
    data.forEach((d) => {
      L.marker(d.coordinates, {
        icon: L.AwesomeMarkers.icon({
          prefix: "fa",
          icon: `fa-briefcase`,
          markerColor: "#ff9800"
        })
      })
        .addTo(this._fg)
        .bindPopup(() => this.popupContent(d.companies))
    })
  },

  popupContent: function (companies) {
    const div = L.DomUtil.create("div")
    const ol = L.DomUtil.create("ol", "", div)
    let li, i
    companies.forEach((company) => {
      li = L.DomUtil.create("li", "", ol)
      li.style.cssText = "display: flex; justify-content: space-between;margin-left: -45px"
      i = L.DomUtil.create("i", this._getIcon(company.company_type_id), li)
      i.style.cssText = "padding-top: 5px; color: #ff9800;  transform: scale(1.5); margin-right: 10px"
      L.DomUtil.create("p", "", li).innerHTML = company.company_name
    })
    return div
  },

  _getIcon: function (id) {
    let iconText = ""
    iconsList.forEach((icon) => {
      if (icon.id === id) iconText = icon.icon
    })
    return `flaticon ${iconText}`
  }
})

F.xatlov = function (options) {
  return new F.Xatlov(options)
}
