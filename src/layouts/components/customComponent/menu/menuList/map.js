// ** React
import { useState, useEffect } from "react"

// ** Third Part
import { Collapse } from "reactstrap"
import { Link, withRouter } from "react-router-dom"
import classnames from "classnames"
import { FormattedMessage } from "react-intl"
// ** Icons
import { Square, CheckSquare, Map, Navigation, Camera, FileText } from "react-feather"
import { BsBuilding } from "react-icons/bs"

// ** redux & store
import { useDispatch, useSelector } from "react-redux"
import { handleCameraAction, handleGpsAction, handleNoturarAction, handleGetNoturarTypes, handleOnList } from "../../../../../redux/actions/map"

// ** Menu item redux & store
import { handleLayerOpen } from "../../../../../redux/actions/menuItems"

const renderListItem = (data, action, inside) => {
  const readyData = []
  for (const key in data) {
    readyData.push(
      <li key={key} style={{ marginTop: 5 }} className={classnames("nav-item", { ["active"]: inside ? data[key][key] : data[key] })}>
        <a className="d-flex align-items-center" onClick={() => action(key, inside ? { cond: !data[key][key], id: data[key].id } : !data[key], inside ? data : [])}>
          {inside ? data[key][key] ? <CheckSquare /> : <Square /> : data[key] ? <CheckSquare /> : <Square />}
          <span className="menu-title text-truncate">{inside ? key : <FormattedMessage id={`Nav${key.toUpperCase()}`} />}</span>
        </a>
      </li>
    )
  }
  return readyData
}

const MapComponent = ({ location }) => {
  const dispatch = useDispatch()

  const [gpsCollapse, setGpsCollapse] = useState(false)
  const [cameraCollapse, setCameraCollapse] = useState(false)
  const [noturarCollapse, setNoturarCollapse] = useState(false)
  const [inListCollapse, setInListCollapse] = useState(false)

  useEffect(() => {
    if (noturarCollapse) dispatch(handleGetNoturarTypes())
  }, [noturarCollapse])

  useEffect(() => {
    if (location?.pathname === "/accountSettings") {
      setGpsCollapse(false)
      setCameraCollapse(false)
      setNoturarCollapse(false)
      setInListCollapse(false)
    } else if (location?.pathname !== "/map") dispatch(handleLayerOpen(false))
  }, [location])

  // ** map store
  const gpsState = useSelector((state) => state.gps)
  const cameraState = useSelector((state) => state.camera)
  const noturar = useSelector((state) => state.noturarlar)
  const onList = useSelector((state) => state.onList)

  // ** menu items store
  const layerStore = useSelector((state) => state.menu)

  const gpsFunc = (name, val) => dispatch(handleGpsAction(name, val))

  const cameraFunc = (name, val) => dispatch(handleCameraAction(name, val))
  const noturarFunc = (name, val, obj) => dispatch(handleNoturarAction(name, val, obj))

  return (
    <li
      className={classnames("nav-item has-sub", {
        ["open menu-collapsed-open sidebar-group-active"]: layerStore?.isLayersOpen
      })}
    >
      <Link className="d-flex align-items-center" onClick={() => dispatch(handleLayerOpen(!layerStore?.isLayersOpen))} to="/map">
        <Map />
        <span className="menu-title text-truncate">{<FormattedMessage id="NavQatlamlar" />}</span>
      </Link>
      <ul className="menu-content">
        <Collapse isOpen={layerStore?.isLayersOpen}>
          <li
            className={classnames("nav-item has-sub", {
              ["open menu-collapsed-open sidebar-group-active "]: gpsCollapse
            })}
          >
            <a className="d-flex align-items-center" onClick={() => setGpsCollapse((prev) => !prev)}>
              <Navigation />
              <span className="menu-title text-truncate">{<FormattedMessage id="NavGPS" />}</span>
            </a>
          </li>
          <ul className="menu-content">
            <Collapse isOpen={gpsCollapse}>{renderListItem(gpsState, gpsFunc)}</Collapse>
          </ul>
          <li
            className={classnames("nav-item has-sub", {
              ["open menu-collapsed-open sidebar-group-active "]: cameraCollapse
            })}
          >
            <a className="d-flex align-items-center" onClick={() => setCameraCollapse((prev) => !prev)}>
              <Camera />
              <span className="menu-title text-truncate">{<FormattedMessage id="NavCameras" />}</span>
            </a>
          </li>
          <ul className="menu-content">
            <Collapse isOpen={cameraCollapse}>{renderListItem(cameraState, cameraFunc)}</Collapse>
          </ul>
          <li
            className={classnames("nav-item has-sub", {
              ["open menu-collapsed-open sidebar-group-active "]: noturarCollapse
            })}
          >
            <a className="d-flex align-items-center" onClick={() => setNoturarCollapse((prev) => !prev)}>
              <BsBuilding />
              <span className="menu-title text-truncate">{<FormattedMessage id="NavNoturarlar" />}</span>
            </a>
          </li>
          <ul className="menu-content">
            <Collapse isOpen={noturarCollapse}>{renderListItem(noturar, noturarFunc, true)}</Collapse>
          </ul>
          <li
            className={classnames("nav-item has-sub", {
              ["sidebar-group-active"]: inListCollapse
            })}
          >
            <a
              className="d-flex align-items-center"
              onClick={() => {
                dispatch(handleOnList(!onList.onList))
                setInListCollapse((prev) => !prev)
              }}
            >
              <FileText /> <span className="menu-title text-truncate">{<FormattedMessage id="NavONLIST" />}</span>
            </a>
          </li>
        </Collapse>
      </ul>
    </li>
  )
}

export default withRouter(MapComponent)
