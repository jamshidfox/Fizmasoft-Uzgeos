/*eslint-disable*/
import contextConnections from "../connections/contextConnections"
import F from "./fizmasoft"
import "./fizmasoft.stream"

F.Perimeter = F.Class.extend({
  options: {},
  initialize: function (options) {
    F.setOptions(this, options)
  },
  addTo: function (map) {
    this._map = map
    this._fg = L.featureGroup().addTo(this._map)
    this._idList = []
    this._newPerimeterAdded = false
    this._count = 0
    return this
  },
  _getIcon: function (installed) {
    return L.AwesomeMarkers.icon({
      prefix: "flaticon",
      icon: "flaticon-barrier-and-car",
      markerColor: installed ? "gray" : "blue"
    })
  },
  addPoint: function (data) {
    const layers = this._fg.getLayers()
    let flag
    for (let i = 0; i < data.length; i++) {
      if (!data[i].selected) {
        this._removeMarker(data[i])
        continue
      }
      if (this._count === 80) {
        this._newPerimeterAdded = true
        continue
      }
      if (!data[i].id && !this._newPerimeterAdded) {
        this._addMarker(data[i])
        this._count += 1
        continue
      }
      flag = false
      for (let j = 0; j < layers; j++) {
        if (data[i].id !== layers[j].options.id) {
          flag = true
        }
      }
      if (!flag) this._addMarker(data[i])
    }
    contextConnections.perimeterContext(this._fg)
  },

  _addMarker: function (data) {
    if (data.coordinates) {
      const marker = L.marker(data.coordinates, {
        id: data.id,
        icon: this._getIcon(data.notInstalled),
        ipList: data.posts,
        name: data.title
      })
        .addTo(this._fg)
        .bindPopup(data.title)
      this._idList.push({ id: data.id, leaflet: marker._leaflet_id })
    }
  },
  _removeMarker: function (data) {
    const newList = []
    this._idList.filter((d) => {
      if (data.id === undefined) {
        this._count--
        this._newPerimeterAdded = false
      }
      if (d.id === data.id) {
        this._fg.removeLayer(this._fg.getLayer(d.leaflet))
      } else newList.push(d)
    })
    this._idList = newList
  },
  removePoints: function () {
    this._idList = []
    this._newPerimeterAdded = false
    this._count = 0
    this._fg.clearLayers()
  },

  bounceMarker: function (id) {
    const [marker] = this._idList.filter((i) => i.id === id)
    this._fg.getLayer(marker.leaflet).bounce(1)
  }
})

F.perimeter = function (options) {
  return new F.Perimeter(options)
}
