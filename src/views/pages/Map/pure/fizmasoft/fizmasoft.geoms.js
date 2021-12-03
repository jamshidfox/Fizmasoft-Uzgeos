import F from "./fizmasoft"
import contextConnections from "../connections/contextConnections"
import "@geoman-io/leaflet-geoman-free"
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css"
import "../leaflet/leaflet.contextmenu"
import "../leaflet/leaflet.reactwindow"
import CustomInput from "reactstrap/lib/CustomInput"
import axios from "axios"
import useJwt from "@src/auth/jwt/useJwt"
import onListConnections from "../connections/onlistConnections"
import Input from "reactstrap/lib/Input"
import { Table } from "reactstrap"
const config = useJwt.jwtConfig
import PerfectScrollbar from "react-perfect-scrollbar"

/* eslint-disable */
F.Geoms = F.Class.extend({
  options: {
    selectedTypes: [],
    onListForma1: () => {},
    left: 50,
    right: 50
  },
  initialize: function (options) {
    F.setOptions(this, options)
    this._fg = L.featureGroup()
    L.DomEvent.on(this._fg, "click", this._ordinaryPeopleModal, this)
    this._types = [
      {
        id: 0,
        title: "Владеет оружием",
        code: ""
      },
      {
        id: 1,
        title: "ОСОБО ОПАСНЫЙ РЕЦИДИВИСТ",
        code: ""
      },
      {
        id: 19,
        title: "НАРКОМАН",
        code: ""
      },
      {
        id: 20,
        title: "НАРКОМАН ПУТЕМ ИНЪЕКЦИИ",
        code: ""
      },
      {
        id: 21,
        title: "ПСИХБОЛЬНОЙ",
        code: ""
      },
      {
        id: 91,
        title: "БЫТОВОЙ СКАНДАЛИСТ",
        code: ""
      }
    ]
  },
  addTo: function (map) {
    this._map = map
    this._fg.addTo(this._map)
    this._initDrawEvents()
    this._initPMOptions()
    this._onListfuncs = onListConnections.connectToMap(this._map)
    return this
  },
  _ordinaryPeopleModal: function (e) {
    if (!e.layer.ordinary || e.layer.ordinary.length === 0) return
    L.control.reactWindow({
      height: "70vh",
      modalCls: "modal-dialog-centered modal-lg",
      title: "Fuqarolar",
      scrollable: true,
      content: (
        <PerfectScrollbar>
          <Table className="table-sm">
            <thead style={{ position: "sticky", top: 0 }}>
              <tr>
                <th style={{ position: "sticky", top: 0 }}>Ismi</th>
                <th style={{ position: "sticky", top: 0 }}>Tug'ulgan kuni</th>
                <th style={{ position: "sticky", top: 0 }}>Passport raqami</th>
              </tr>
            </thead>
            <tbody style={{ height: 100 }}>
              {e.layer.ordinary.map((fuqaro, i) => (
                <tr key={i}>
                  <td>{fuqaro.fullname}</td>
                  <td>{fuqaro.birthday}</td>
                  <td>{fuqaro.passport_raqami}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </PerfectScrollbar>
      ),
      visible: true
    })
  },
  _initPMOptions: function () {
    this._map.pm.setLang("ru")
    this._map.pm.setPathOptions({
      color: "#7367f0",
      fillColor: "#7367f0"
    })
  },
  _addToSelected: function (id) {
    const { selectedTypes } = this.options
    let newSelecteds
    if (!selectedTypes.includes(id)) {
      newSelecteds = [...selectedTypes, id]
    } else {
      const idIndex = selectedTypes.indexOf(id)
      newSelecteds = [...selectedTypes.slice(0, idIndex), ...selectedTypes.slice(idIndex + 1)]
    }
    this.options.selectedTypes = newSelecteds
  },
  _leftRightLine: function (e, left, right) {
    if (left) this.options.left = e.target.value
    if (right) this.options.right = e.target.value
  },
  _getSelectedData: async function (list, layer, isLine, radius, leftRight) {
    const geojson = layer.toGeoJSON()
    this.options.selectedTypes = []
    this._map.spin(true)
    if (!isLine) {
      const { data } = await axios.post(`${config.url}/foreign/xatlov/criminal-in-polygon`, {
        types: list,
        geojson,
        radius
      })
      layer.ordinary = data.ordinary
      this._onListfuncs.addOnListMarkers(data.data, this._types, this.options.onListForma1)
    } else {
      const { data } = await axios.post(`${config.url}/foreign/xatlov/criminal-in-line`, {
        types: list,
        geojson,
        left: leftRight[0],
        right: leftRight[1]
      })
      layer.ordinary = data.ordinary
      this._onListfuncs.addOnListMarkers(data.data, this._types, this.options.onListForma1)
      L.geoJSON(data.polygon.features).addTo(this._fg)
    }
    this._map.spin(false)
  },
  _selectModal: function (layer, isLine, radius) {
    L.control.reactWindow({
      modalCls: "modal-dialog-centered modal-xs",
      okCb: () => this._getSelectedData(this.options.selectedTypes, layer, isLine, radius, [this.options.left, this.options.right]),
      cancelCb: () => this._fg.removeLayer(layer),
      title: "Qidiruv filtrlari",
      content: (
        <>
          {isLine && (
            <div className="d-flex">
              <label htmlFor="left">
                Chapdan:
                <Input placeholder="50" onChange={(e) => this._leftRightLine(e, true, false)} id="left" type="number" bsize="sm" />
              </label>
              <label htmlFor="right">
                Ongdan:
                <Input placeholder="50" onChange={(e) => this._leftRightLine(e, false, true)} id="right" type="number" bsize="sm" />
              </label>
            </div>
          )}
          <div key={-1} className="d-flex mt-1">
            <CustomInput onChange={() => this._addToSelected(-1)} className="ml-2" id={-1 + "f"} type="checkbox" />
            <h5>
              <label htmlFor={-1 + "f"} className="ml-1">
                {"обычные люди".toUpperCase()}
              </label>
            </h5>
          </div>
          {this._types.map((type) => (
            <div key={type.id} className="d-flex mt-1">
              <CustomInput onChange={() => this._addToSelected(type.id)} className="ml-2" id={type.id + "f"} type="checkbox" />
              <h5>
                <label htmlFor={type.id + "f"} className="ml-1">
                  {type.title.toUpperCase()}
                </label>
              </h5>
            </div>
          ))}
        </>
      ),
      visible: true
    })
  },
  _initDrawEvents: function () {
    this._map
      .on("pm:create", (e) => {
        const { layer } = e
        this._fg.addLayer(layer)
        contextConnections.editDeleteContext(this._fg)
        let radius
        layer.pm.getShape() === "Line"
        if (layer.options.radius) {
          radius = layer.options.radius
        }
        this._selectModal(layer, layer.pm.getShape() === "Line", radius)
      })
      .on("pm:remove", (e) => {
        this._fg.removeLayer(e.layer)
        this._onListfuncs.removeOnListMarkers()
      })

    L.DomEvent.on(this._fg, "layerremove", () => this._onListfuncs.removeOnListMarkers())
  },
  drawLine: function () {
    this._map.pm.enableDraw("Line")
  },
  drawPolygon: function () {
    this._map.pm.enableDraw("Polygon")
  },
  drawCircle: function () {
    this._map.pm.enableDraw("Circle")
  },
  removeDraw: function (cond) {
    cond ? this._map.pm.enableGlobalRemovalMode() : this._map.pm.disableGlobalRemovalMode()
  },
  disableDraw: function () {
    this._map.pm.disableDraw()
  },
  getShapes: function () {
    return this._fg.getLayers()
  }
})

F.geoms = function (options) {
  return new F.Geoms(options)
}
