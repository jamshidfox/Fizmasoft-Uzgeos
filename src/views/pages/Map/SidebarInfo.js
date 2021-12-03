import { useEffect, useState } from "react"
import { CardBody, TabContent, TabPane, Nav, NavItem, NavLink, Button } from "reactstrap"
import PerfectScrollbar from "react-perfect-scrollbar"

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux"
import { FormattedMessage } from "react-intl"

import GpsRoute from "./routes/GpsRoute"
import NTFSRoute from "./routes/NTFSRoute"
import VideoRoute from "./routes/VideoRoute"
import RadarRoute from "./routes/RadarRoute"
import PerimeterRoute from "./routes/PerimetrRoute"
import XatlovRoute from "./routes/XatlovRoute"
import CrossRoad from "./routes/CrossroadRoute"
import InspektorRoute from "./routes/InspektorlarRoute"
import Tools from "./Tools"
import TowerRoute from "./routes/TowerRoute"
import PtzRoute from "./routes/PtzRoute"
import OnListRoute from "./routes/OnListRoute"
import { X } from "react-feather"
import { handleXatlovInactive } from "./store/actions/xatlov"
import { handleCameraAction, handleNoturarAction, handleOnList } from "../../../redux/actions/map"
import _ from "lodash"
import NoturarRoute from "./routes/NoturarRoute"
import { changeNoturarIdList, handleChangeNoturarData } from "./store/actions/noturar"

const SidebarInfo = ({ toggleSidebar }) => {
  const dispatch = useDispatch()
  const gpsState = useSelector((state) => state.gps)
  const cameraState = useSelector((state) => state.camera)
  const noturarState = useSelector((state) => state.noturarlar)
  const noturarData = useSelector((state) => state.noturar)
  const xatlovState = useSelector((state) => state.xatlov.cond)
  const onListState = useSelector((state) => state.onList)

  const renderTab = (data, current, toggle) => {
    const readyTabs = []
    for (const key in data) {
      if (data[key]) {
        readyTabs.push(
          <NavItem key={key} onClick={() => toggle(key.includes("NOTURAR") ? key.slice(0, -7) : key)} className="animate__animated animate__backInRight">
            <NavLink active={current === (key.includes("NOTURAR") ? key.slice(0, -7) : key)}>
              {key ? (
                <div>
                  <span>{key.includes("NOTURAR") ? key.slice(0, -7) : <FormattedMessage id={`Nav${key.toUpperCase()}`} />}</span>
                  <X
                    style={{ marginLeft: "0.5em" }}
                    size={16}
                    onClick={() => {
                      dispatch(
                        key.includes("NOTURAR")
                          ? handleNoturarAction(key.slice(0, -7), noturarState[key.slice(0, -7)], noturarState)
                          : key === "xatlov"
                          ? handleXatlovInactive()
                          : key === "onList"
                          ? handleOnList(false)
                          : handleCameraAction(key, false)
                      )
                    }}
                  />
                </div>
              ) : (
                <FormattedMessage id={`Nav${key.toUpperCase()}`} />
              )}
            </NavLink>
          </NavItem>
        )
      }
    }
    return readyTabs
  }

  const [active, setActive] = useState("")

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  // Toggle sidebar on state of content changes
  useEffect(() => {
    let openSidebar = false
    _.each(gpsState, (value, key) => {
      if (value) openSidebar = true
    })
    _.each(cameraState, (value, key) => {
      if (value) openSidebar = true
    })
    _.each(noturarState, (value, key) => {
      if (value[key]) openSidebar = true
    })
    if (onListState.onList) openSidebar = true
    toggleSidebar(openSidebar)
  }, [gpsState, cameraState, noturarState, onListState])

  // ** GPS
  useEffect(() => {
    _.each(gpsState, (value, key) => {
      if (value) setActive(key)
    })
  }, [gpsState])

  // ** Camera
  useEffect(() => {
    _.each(cameraState, (value, key) => {
      if (value) setActive(key)
    })
  }, [cameraState])

  //** Noturar
  useEffect(() => {
    const activeNoturars = []
    _.each(noturarState, (value, key) => {
      if (value[key]) {
        setActive(key)
        activeNoturars.push(value.id)
      }
      dispatch(changeNoturarIdList(activeNoturars))
    })
  }, [noturarState])
  useEffect(() => {
    const tmp = {}
    _.each(noturarData.data, (val, key) => {
      if (noturarData.idList.includes(+key)) {
        tmp[key] = val
      }
    })
    dispatch(handleChangeNoturarData(tmp))
  }, [noturarData.idList])

  // ** Xatlov
  useEffect(() => {
    if (xatlovState) {
      setActive("xatlov")
      toggleSidebar(true)
    }
  }, [xatlovState])

  // ** Uchetdegilar
  useEffect(() => {
    if (onListState) setActive("onList")
  }, [onListState])

  const noturarPrepareForTab = () => {
    const n = {}
    _.each(noturarState, (value, key) => {
      n[`${key}NOTURAR`] = value[key]
    })
    return n
  }

  return (
    <>
      <PerfectScrollbar>
        <CardBody>
          <Tools />
          <hr />
          <Nav tabs>{renderTab({ ...gpsState, ...cameraState, xatlov: xatlovState, ...onListState, ...noturarPrepareForTab() }, active, toggle)}</Nav>
          <TabContent activeTab={active}>
            {gpsState?.ypx && (
              <TabPane tabId="ypx">
                <GpsRoute />
              </TabPane>
            )}
            {gpsState?.pps && (
              <TabPane tabId="pps">
                <GpsRoute />
              </TabPane>
            )}

            <TabPane tabId="inspektor">
              <InspektorRoute />
            </TabPane>

            {gpsState?.fire && (
              <TabPane tabId="fire">
                <GpsRoute />
              </TabPane>
            )}
            {gpsState?.ambulance && (
              <TabPane tabId="ambulance">
                <GpsRoute />
              </TabPane>
            )}
            {gpsState?.bus && (
              <TabPane tabId="bus">
                <GpsRoute />
              </TabPane>
            )}
            <TabPane tabId="crossroad">
              <CrossRoad />
            </TabPane>
            <TabPane tabId="radar">
              <RadarRoute />
            </TabPane>
            <TabPane tabId="perimeter">
              <PerimeterRoute />
            </TabPane>
            {cameraState?.ntface && (
              <TabPane tabId="ntface">
                <NTFSRoute />
              </TabPane>
            )}
            {cameraState?.video && (
              <TabPane tabId="video">
                <VideoRoute />
              </TabPane>
            )}
            <TabPane tabId="tower">
              <TowerRoute />
            </TabPane>
            {_.map(noturarState, (value, key) => {
              return (
                value[key] && (
                  <TabPane key={value.id} tabId={key}>
                    <NoturarRoute id={value.id} />
                  </TabPane>
                )
              )
            })}
            <TabPane tabId="ptz">
              <PtzRoute />
            </TabPane>
            <TabPane tabId="xatlov">
              <XatlovRoute toggleSidebar={toggleSidebar} />
            </TabPane>
            <TabPane tabId="onList">
              <OnListRoute />
            </TabPane>
          </TabContent>
        </CardBody>
      </PerfectScrollbar>
    </>
  )
}

export default SidebarInfo
