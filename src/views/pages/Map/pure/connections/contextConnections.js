import "../leaflet/leaflet.contextmenu"
import "../leaflet/leaflet.reactwindow"
import geomConnections from "./geomConnections"
import F from "../fizmasoft/fizmasoft"
import "../fizmasoft/fizmasoft.stream"
/* eslint-disable */

const addXatlovContext = (map, xatlovCallback) => {
  let inserted = false
  map.on("zoomend", () => {
    let zoom = map.getZoom()
    if (zoom >= 12 && !inserted) {
      inserted = true
      map.contextmenu.insertItem(
        {
          text: "Бу ерда нималар бор",
          iconCls: "fa fa-search",
          callback: (e) => xatlovCallback(e.latlng)
        },
        0
      )
    } else if (zoom < 17 && inserted) {
      inserted = false
      map.contextmenu.removeItem(0)
    }
  })
}

const initMapContext = (map) => {
  if (map.contextmenu instanceof L.Handler) {
    map.contextmenu.enable()
  }
  ;[
    {
      text: "Кординатани кўрсатиш",
      iconCls: "fa fa-map-marked-alt",
      callback: (e) => {
        L.control.reactWindow({
          modalCls: "modal-dialog-centered modal-sm",
          title: "Кординаталар",
          content: (
            <>
              <h6>Долгота: {e.latlng.lat}</h6>
              <h6>Широта: {e.latlng.lng}</h6>
            </>
          ),
          visible: true
        })
      }
    },
    {
      text: "Шу жойни марказга олиш",
      iconCls: "fa fa-crosshairs",
      callback: (e) => map.panTo(e.latlng)
    },
    "-",
    {
      text: "Яқинлаштириш",
      iconCls: "fa fa-search-plus",
      callback: (e) => map.zoomIn()
    },
    {
      text: "Узоқлаштириш",
      iconCls: "fa fa-search-minus",
      callback: (e) => map.zoomOut()
    },
    {
      separator: true
    },
    {
      text: "Полигон",
      iconCls: "fa fa-draw-polygon",
      callback: geomConnections.drawPolygon
    },
    {
      text: "Линия",
      iconCls: "fa fa-wave-square",
      callback: geomConnections.drawLine
    },
    {
      text: "Айлана",
      iconCls: "fa fa-circle-notch",
      callback: geomConnections.drawCircle
    }
  ].forEach((item) => map.contextmenu.addItem(item))
}

const perimeterContext = (fg) => {
  fg.eachLayer((layer) => {
    if (layer.options.ipList === undefined) {
      layer?.bindContextMenu({
        contextmenu: true,
        contextmenuInheritItems: false,
        contextmenuItems: [{ text: "Kameralar topilmadi", iconCls: "fa fa-cog" }]
      })
    } else {
      let kirish = 0
      let chiqish = 0
      layer.bindContextMenu({
        contextmenu: true,
        contextmenuInheritItems: false,
        contextmenuItems: [
          ...layer.options.ipList.map((l) => {
            let text
            if (l.title === "Кириш") {
              kirish += 1
              text = `${layer.options.name} ${l.title}${kirish}`.replaceAll("Қ", "К").replaceAll("қ", "к").replaceAll("Ғ", "Г").replaceAll("ғ", "г")
              return {
                text,
                iconCls: "fa fa-sign-in-alt",
                callback: () => {
                  F.stream({
                    title: text,
                    ipAddress: l.ip_address,
                    password: l.id >= 1000 ? "parol12345" : "fizmasoft7998872",
                    path: l.id >= 1000 ? "/cam/realmonitor?channel=1&subtype=0" : "/Streaming/Channels/2"
                  }).play()
                }
              }
            } else {
              chiqish += 1
              text = `${layer.options.name} ${l.title}${chiqish}`.replaceAll("Қ", "К").replaceAll("қ", "к").replaceAll("Ғ", "Г").replaceAll("ғ", "г")
              return {
                text,
                iconCls: "fa fa-sign-out-alt",
                callback: () => {
                  F.stream({
                    title: text,
                    ipAddress: l.ip_address
                  }).play()
                }
              }
            }
          })
        ]
      })
    }
  })
}

const editDeleteContext = (fg) => {
  fg.eachLayer(
    (layer) =>
      layer.bindContextMenu &&
      layer.bindContextMenu({
        contextmenu: true,
        contextmenuInheritItems: false,
        contextmenuItems: [
          // {
          //   text: "Drag",
          //   iconCls: "fa fa-arrows-alt",
          //   callback: () => {
          //     if (!layer.edit) {
          //       layer.oldCoor = layer._latlngs
          //       layer.edit = true
          //       layer.pm.enableLayerDrag()
          //     }
          //   }
          // },
          // {
          //   text: "Edit",
          //   iconCls: "fa fa-edit",
          //   callback: () => {
          //     if (!layer.edit) {
          //       layer.oldCoor = layer._latlngs
          //       layer.edit = true
          //       layer.pm.enable()
          //     }
          //   }
          // },
          {
            text: "Ўчириш",
            iconCls: "fa fa-trash-alt",
            callback: () => {
              fg.removeLayer(layer)
            }
          }
          // {
          //   separator: true
          // },
          // {
          //   text: "Save",
          //   iconCls: "fa fa-save",
          //   callback: () => {
          //     if (layer.edit) {
          //       layer.pm.disable()
          //       layer.pm.disableLayerDrag()
          //       delete layer.oldCoor
          //       delete layer.edit
          //     }
          //   }
          // },
          // {
          //   text: "Cancel",
          //   iconCls: "fa fa-times-circle",
          //   callback: () => {
          //     if (layer.edit) {
          //       layer.setLatLngs(layer.oldCoor)
          //       layer.pm.disable()
          //       layer.pm.disableLayerDrag()
          //       delete layer.oldCoor
          //       delete layer.edit
          //     }
          //   }
          // }
        ]
      })
  )
}

const contextConnections = { addXatlovContext, initMapContext, editDeleteContext, perimeterContext }

export default contextConnections
