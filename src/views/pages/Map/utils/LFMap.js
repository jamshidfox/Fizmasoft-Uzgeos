import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import { MapContainer } from "react-leaflet"
import initMap from "../pure/map"
import styled from "styled-components"
import useJwt from "@src/auth/jwt/useJwt"
const config = useJwt.jwtConfig
const token = localStorage.getItem("access_token")
import L from "leaflet"
import _ from "lodash"

// ** Store & Actions
import { useSelector, useDispatch } from "react-redux"

import { handleTurarObjects, handleXatlovActivate, handleNoturarObjects, handleLoading, handleXatlovSetPos } from "../store/actions/xatlov"
import "../pure/styles/leaflet/leaflet.contextmenu.css"
import AlarmModal from "../routes/AlarmModal"
import axios from "axios"
import moment from "moment"
import Passport from "../../../components/Passport/Passport"

const zoom = 12
const center = [41.31, 69.29]

const LFMap = ({ resize1, resize2, children, history }) => {
  const alarm = useSelector((state) => state.alarm)
  const [alarmModal, setAlarmModal] = useState(false)

  const tools = useSelector((state) => state.tools)
  const camera = useSelector((state) => state.camera)
  const gps = useSelector((state) => state.gps)
  const skin = useSelector((state) => state.layout.isSkinChange)
  const radar = useSelector((state) => state.radar)
  const perimeter = useSelector((state) => state.perimeter)
  const crossroad = useSelector((state) => state.crossroad)
  const noturar = useSelector((state) => state.noturar)

  const ptz = useSelector((state) => state.ptz)
  const tower = useSelector((state) => state.tower)
  const selecteds = useSelector((state) => state.selectedReducer)

  const inspektor = useSelector((state) => state.inspektor)

  const xatlovData = useSelector((state) => state.xatlov)
  const onListData = useSelector((state) => state.onListData)
  const [forma1Modal, setForma1Modal] = useState(false)
  const [forma1Data, setForma1Data] = useState(null)
  const [loading, setLoading] = useState(false)
  const [hotkeysInit, setHotkeysInit] = useState(false)

  const dispatch = useDispatch()

  const [map, setMap] = useState()
  const [lfMap, setLFMap] = useState(null)
  const [radarZoom, setRadarZoom] = useState({ cond: false, id: -1 })
  const [crossroadZoom, setCrossroadZoom] = useState({ cond: false, id: -1 })
  const [perimeterZoom, setPerimeterZoom] = useState({ cond: false, id: -1 })
  const [ptzZoom, setPtzZoom] = useState({ cond: false, id: -1 })
  const [towerZoom, setTowerZoom] = useState({ cond: false, id: -1 })

  const [inspektorZoom, setInspektorZoom] = useState(false)

  const [videoEffect, setVideoEffect] = useState(false)
  const [videEffectTime, setVideoEffectTime] = useState({ crossroad: 0, radar: 0, perimeter: 0, interval: 1200 })

  const initKeyup = (e) => {
    const keyEvent = e.originalEvent
    if (keyEvent.altKey && keyEvent.keyCode === 88) {
      map.flyTo([41.35111628045694, 69.21974122524263], 17)
    } else if (keyEvent.altKey && keyEvent.keyCode === 72) {
      map.flyTo([41.31, 69.29], 12)
    } else if (keyEvent.altKey && keyEvent.keyCode === 82) {
      history.push("/lochinkoz")
    }
  }
  // HOT-KEYS
  useEffect(() => {
    if (map && !hotkeysInit) {
      setHotkeysInit(true)
      L.DomEvent.on(map, "keyup", initKeyup)
    }
  }, [map])

  // ALARM
  const toggleAlarmModal = (status) => {
    setAlarmModal(status)
  }

  useEffect(() => {
    if (alarm.status && !alarm.moreInfo && lfMap) {
      toggleAlarmModal(false)
      lfMap.startAlarm(alarm.data.alertData.location, alarm.data.alertData.results, alarm.data.alertData.takenImg, () => {
        toggleAlarmModal(true)
      })
    } else if (!alarm.status) {
      lfMap?.removeAlarm()
    }
  }, [alarm, lfMap])

  // ON LIST
  const handleShowPassportModal = (params) => {
    if (params.pcitizen) {
      setLoading(true)
      axios.post(`${config.url}/foreign/xatlov/forma1`, { pcitizen: params.pcitizen }).then((res) => {
        if (res.status === 200) {
          setForma1Data(res.data.data)
          setLoading(false)
        }
      })
      setForma1Modal(true)
    } else {
      toast.info("Fuqaro haqida malumot mavjud emas")
    }
  }
  useEffect(() => {
    if (onListData.loading) map?.spin(true)
    else map?.spin(false)
    if (onListData.selectedsData.length > 0) {
      lfMap?.addOnListMarkers(onListData.selectedsData, onListData.types, (data) => handleShowPassportModal(data))
    } else {
      lfMap?.removeOnListMarkers()
    }
  }, [onListData.selectedsData, onListData.loading])

  // XATLOV
  const xatlov = async (latlng) => {
    dispatch(handleXatlovActivate())
    dispatch(handleLoading(true))
    dispatch(handleXatlovSetPos([latlng.lat, latlng.lng]))
    await dispatch(handleTurarObjects(latlng.lat, latlng.lng))
    await dispatch(handleNoturarObjects(latlng.lat, latlng.lng))
    dispatch(handleLoading(false))
  }
  useEffect(() => {
    if (!lfMap) return
    if (xatlovData.cond && xatlovData.latlng.length > 0) {
      const coords = xatlovData.latlng
      if (xatlovData.loading) {
        lfMap.xatlov.pointIcon(coords)
      } else {
        if (xatlovData.business.length > 0) {
          lfMap.xatlov.renderBusiness(xatlovData.business)
        }
        if (xatlovData.houses[0]) {
          const { address, is_dom } = xatlovData.houses[0]
          is_dom ? lfMap.xatlov.renderIcon(coords, "hotel", address) : lfMap.xatlov.renderIcon(coords, "home", address)
        } else lfMap.xatlov.renderIcon(coords, "circle")
      }
    } else {
      lfMap.xatlov.removeXatlov()
    }
  }, [xatlovData])

  // MAP
  useEffect(() => {
    if (map) {
      setTimeout(() => {
        map.invalidateSize()
      }, 300)
    }
  }, [resize1, resize2])
  useEffect(() => {
    if (map && !lfMap) {
      setLFMap(initMap(map, { xatlov, onListForma1: (data) => handleShowPassportModal(data) }))
    }
  }, [map])

  // TOOLS
  useEffect(() => {
    if (lfMap) {
      lfMap.xududAdd(tools.xududlar.cond, tools.xududlar.data)
      lfMap.ruler(tools.ruler)
      lfMap.removeDraw(tools.eraser)
      lfMap.drawLine(tools.line)
      lfMap.drawPolygon(tools.polygon)
      lfMap.drawCircle(tools.circle)
    }
  }, [tools])

  // Noturar
  useEffect(() => {
    lfMap?.removeAllNoturarPoints()
    _.each(noturar.data, (value, key) => {
      lfMap.addNoturarPoint(value, key)
    })
  }, [noturar])
  useEffect(() => {
    let zoomCoords
    _.each(noturar.data, (value, key) => {
      value.forEach((val) => {
        if (val.zoomed) zoomCoords = val.coordinates
      })
    })
    zoomCoords ? map?.flyTo(zoomCoords, 17) : map?.flyTo(center, zoom)
  }, [noturar.data])

  // RADAR
  useEffect(() => {
    const isChanged = { coords: [] }
    if (!camera.radar) lfMap?.removeAllRadarPoints()
    if (radar.data.length > 0) lfMap?.addRadarPoint(radar.data)
    radar.data.forEach((p) => {
      if (p.zoomed) {
        isChanged.coords = p.coordinates
        isChanged.id = p.id
      }
    })
    if (map && isChanged.coords.length !== 0 && radarZoom.id !== isChanged.id) {
      map.flyTo(isChanged.coords, 17)
      setRadarZoom({ cond: true, id: isChanged.id })
    } else if (map && isChanged.coords.length === 0 && radarZoom.cond && radarZoom.id !== -1) {
      setRadarZoom({ cond: false, id: -1 })
      map.flyTo(center, zoom)
    }
  }, [radar.data, camera.radar])
  useEffect(() => {
    selecteds.selectedRadar.forEach((radar) => {
      if (radar.selected && radar.hovered && !radar.zoomed) lfMap.bounceRadarMarker(radar.id)
    })
  }, [selecteds.selectedRadar])

  // PERIMETER
  useEffect(() => {
    const isChanged = { coords: [] }
    if (!camera.perimeter) lfMap?.removeAllPerimeterPoints()
    if (perimeter.data.length > 0) {
      lfMap?.addPerimeterPoint(perimeter.data)
    }
    perimeter.data.forEach((p) => {
      if (p.zoomed) {
        isChanged.coords = p.coordinates
        isChanged.id = p.id
      }
    })
    if (map && isChanged.coords.length !== 0 && perimeterZoom.id !== isChanged.id) {
      setPerimeterZoom({ cond: true, id: isChanged.id })
      map.flyTo(isChanged.coords, 17)
    } else if (map && isChanged.coords.length === 0 && perimeterZoom.cond && perimeterZoom.id !== -1) {
      setPerimeterZoom({ cond: false, id: -1 })
      map.flyTo(center, zoom)
    }
  }, [perimeter.data, camera.perimeter])
  useEffect(() => {
    selecteds.selectedPerimeter.forEach((perimeter) => {
      if (perimeter.selected && perimeter.hovered && !perimeter.zoomed) lfMap.bouncePerimeterMarker(perimeter.id)
    })
  }, [selecteds.selectedPerimeter])

  // CROSSROAD
  useEffect(() => {
    const isChanged = { coords: [] }
    if (!camera.crossroad) lfMap?.removeAllCrossroadPoints()
    if (crossroad.data.length > 0) lfMap?.addCrossroadPoint(crossroad.data)
    crossroad.data.forEach((p) => {
      if (p.zoomed) {
        isChanged.coords = p.coordinates
        isChanged.id = p.id
      }
    })
    if (map && isChanged.coords.length !== 0 && crossroadZoom.id !== isChanged.id) {
      setCrossroadZoom({ cond: true, id: isChanged.id })
      map.flyTo(isChanged.coords, 17)
    } else if (map && isChanged.coords.length === 0 && crossroadZoom.cond && crossroadZoom.id !== -1) {
      setCrossroadZoom({ cond: false, id: -1 })
      map.flyTo(center, zoom)
    }
  }, [crossroad.data, camera.crossroad])
  useEffect(() => {
    selecteds.selectedCrossroad.forEach((crossroad) => {
      if (crossroad.selected && crossroad.hovered && !crossroad.zoomed) lfMap.bounceCrossroadMarker(crossroad.id)
    })
  }, [selecteds.selectedCrossroad])

  // PTZ
  useEffect(() => {
    const isChanged = { coords: [] }
    if (!camera.ptz) lfMap?.removeAllPtzPoints()
    if (ptz.data.length > 0) lfMap?.addPtzPoint(ptz.data)
    ptz.data.forEach((p) => {
      if (p.zoomed) {
        isChanged.id = p.id
        isChanged.coords = p.coordinates
      }
    })
    if (map && isChanged.coords.length !== 0 && ptzZoom.id !== isChanged.id) {
      setPtzZoom({ cond: true, id: isChanged.id })
      map.flyTo(isChanged.coords, 17)
    } else if (map && isChanged.coords.length === 0 && ptzZoom.cond && ptzZoom.id !== -1) {
      setPtzZoom({ cond: false, id: -1 })
      map.flyTo(center, zoom)
    }
  }, [ptz.data, camera.ptz])
  useEffect(() => {
    selecteds.selectedPtz.forEach((ptz) => {
      if (ptz.selected && ptz.hovered && !ptz.zoomed) lfMap.bouncePtzMarker(ptz.id)
    })
  }, [selecteds.selectedPtz])

  // Tower
  useEffect(() => {
    const isChanged = { coords: [] }
    if (!camera.tower) lfMap?.removeAllTowerPoints()
    if (tower.data.length > 0) lfMap?.addTowerPoint(tower.data)
    tower.data.forEach((p) => {
      if (p.zoomed) {
        isChanged.id = p.id
        isChanged.coords = p.coordinates
      }
    })
    if (map && isChanged.coords.length !== 0 && towerZoom.id !== isChanged.id) {
      setTowerZoom({ cond: true, id: isChanged.id })
      map.flyTo(isChanged.coords, 17)
    } else if (map && isChanged.coords.length === 0 && towerZoom.cond && towerZoom.id !== -1) {
      setTowerZoom({ cond: false, id: -1 })
      map.flyTo(center, zoom)
    }
  }, [tower.data, camera.tower])
  // useEffect(() => {
  //   selecteds.selectedTower.forEach((tower) => {
  //     if (tower.selected && tower.hovered && !tower.zoomed) lfMap.bounceTowerMarker(tower.id)
  //   })
  // }, [selecteds.selectedTower])

  // INSPEKTOR
  useEffect(() => {
    const isChanged = { coords: [] }
    if (!gps.inspektor) lfMap?.removeAllInspektorPoints()
    if (inspektor.data.length > 0) lfMap?.addInspektorPoint(inspektor.data)
    inspektor.data.forEach((p) => {
      if (p.zoomed) {
        isChanged.id = p.id
        isChanged.coords = p.coordinates
      }
    })
    if (map && isChanged.coords.length !== 0 && inspektorZoom.id !== isChanged.id) {
      setInspektorZoom({ cond: true, id: isChanged.id })
      map.flyTo(isChanged.coords, 17)
    } else if (map && isChanged.coords.length === 0 && inspektorZoom.cond && inspektorZoom.id !== -1) {
      setInspektorZoom({ cond: false, id: -1 })
      map.flyTo(center, zoom)
    }
  }, [gps.inspektor, inspektor.data])
  useEffect(() => {
    selecteds.selectedInspektor.forEach((inspektor) => {
      if (inspektor.selected && inspektor.hovered && !inspektor.zoomed) lfMap.bounceInspektorMarker(inspektor.id)
    })
  }, [selecteds.selectedInspektor])

  // VIDEO EFFECTS WITH HTTP
  useEffect(() => {
    let cl = moment().subtract(5, "minutes").format("YYYY-MM-DD HH:mm:ss")
    if (radar.video_effect) {
      let rl = 0,
        event_photo
      const time = setInterval(() => {
        axios.get(`${config.url}/foreign/radar/last-event?the_date=${encodeURIComponent(cl)}`).then(({ data }) => {
          if (data.data[0]) {
            rl = data.data[0].event_id
            cl = data.data[0].the_date
            event_photo = data.data[0].event_photo
            lfMap?.videoEffectPhotos(`${event_photo}?token=${JSON.parse(token)}`, data.data[0].last_coordinate)
          }
        })
      }, videEffectTime.interval)
      setVideoEffectTime({ ...videEffectTime, radar: time })
    } else {
      clearInterval(videEffectTime.radar)
    }
  }, [radar.video_effect])

  useEffect(() => {
    if (crossroad.video_effect) {
      let cl = moment().subtract(5, "minutes").format(`YYYY-MM-DD HH:mm:ss`)
      const time = setInterval(() => {
        axios.get(`${config.url}/foreign/chorraxa/last-event?the_date=${encodeURIComponent(cl)}`).then(({ data }) => {
          if (data.data[0]) {
            const { the_date, camera_id, coordinates, event_photo } = data.data[0]
            cl = the_date
            lfMap?.videoEffectPhotos(`${event_photo}&token=${JSON.parse(token)}`, coordinates)
          }
        })
        setVideoEffectTime({ ...videEffectTime, crossroad: time })
      }, videEffectTime.interval)
    } else {
      clearInterval(videEffectTime.crossroad)
    }
  }, [crossroad.video_effect])

  useEffect(() => {
    if (perimeter.video_effect) {
      let pl = moment().subtract(5, "minutes").format(`YYYY-MM-DD HH:mm:ss`)
      const time = setInterval(() => {
        axios.get(`${config.url}/foreign/perimeter/last-event?the_date=${encodeURIComponent(pl)}`).then(({ data }) => {
          if (data.data.length > 0) {
            data.data.forEach((d, i) => {
              const { the_date, camera_id, coordinates, event_photo } = d
              if (i === data.data.length - 1) pl = the_date
              lfMap?.videoEffectPhotos(`${event_photo}&token=${JSON.parse(token)}`, coordinates)
            })
          }
        })
        setVideoEffectTime({ ...videEffectTime, perimeter: time })
      }, videEffectTime.interval)
    } else {
      clearInterval(videEffectTime.perimeter)
    }
  }, [perimeter.video_effect])

  useEffect(() => {
    if (crossroad.video_effect || radar.video_effect || perimeter.video_effect) {
      if (!videoEffect) {
        lfMap?.videoEffect()
        setVideoEffect(true)
      }
    } else {
      lfMap?.rmVideoEffect()
      setVideoEffect(false)
    }
  }, [camera, radar, crossroad, perimeter])

  //SKIN CHANGE MAP TILES
  useEffect(() => {
    if (!map || !lfMap) return
    setTimeout(() => {
      map.invalidateSize()
    }, 300)
    if (skin === "light") {
      lfMap.dark.removeFrom(map)
      lfMap.light.addTo(map)
    } else if (skin === "dark") {
      lfMap.dark.removeFrom(map)
      lfMap.light.addTo(map)
    }
  }, [skin, map, lfMap])

  return (
    <>
      {forma1Data && <Passport openModal={forma1Modal} setOpenModal={setForma1Modal} data={forma1Data} loading={loading} />}
      {alarm.status && <AlarmModal open={alarmModal} toggle={() => toggleAlarmModal(false)} alarm={alarm.data} />}
      <CustomMap skin={skin === "light"} whenCreated={setMap} style={{ width: "100%", height: "100%" }} center={center} zoom={zoom}>
        {children}
      </CustomMap>
    </>
  )
}

export default withRouter(LFMap)

const CustomMap = styled(MapContainer)`
  cursor: default !important;
  .leaflet-contextmenu {
    background-color: ${(props) => (props.skin ? "white" : "#161d31")} !important;
  }
  .leaflet-contextmenu a.leaflet-contextmenu-item {
    color: ${(props) => (props.skin ? "#222" : "white")};
  }
`
