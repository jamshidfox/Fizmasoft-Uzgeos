// ** Redux Imports
import { combineReducers } from "redux"

// ** Reducers Imports
import auth from "./auth"
import navbar from "./navbar/"
import layout from "./layout"
import socket from "./socket"
import tools from "../../views/pages/Map/store/reducers/toolReducer"
import usersSettings from "../../views/pages/Users/store/reducers/"
import groupSettings from "../../views/pages/Groups/store/reducers/"
import gps from "./map/gps"
import camera from "./map/camera"
import onList from "./map/onList"
import menu from "../reducers/menuItems/"
import radar from "../../views/pages/Map/store/reducers/radarReducer"
import perimeter from "../../views/pages/Map/store/reducers/perimeterReducer"
import ntfs from "../../views/pages/NTFS/store/reducer/"
import crossroad from "../../views/pages/Map/store/reducers/crossroadReducer"
import xatlov from "../../views/pages/Map/store/reducers/xatlovReducer"
import noturarlar from "./map/noturarlar"
import noturar from "../../views/pages/Map/store/reducers/noturarReducer"
import selectedReducer from "../../views/pages/Map/store/reducers/selectedReducer"
import inspektor from "../../views/pages/Map/store/reducers/inspectorlarReducer"
import fuqarolar from "../../views/pages/Fuqarolar/store/reducer/"
import ptz from "../../views/pages/Map/store/reducers/ptzReduser"
import tower from "../../views/pages/Map/store/reducers/towerReducer"
import alarm from "../reducers/alarm/"
import foydalanuvchi from "../../views/pages/NTFS/store/reducer/foydalanuvchiReducer"
import onListData from "../../views/pages/Map/store/reducers/onListDataReduser"
import lochinKoz from "../../views/pages/LochinKoz/store/reducer/"
import videoDetectionReducer from "../../views/pages/VideoDetection2/store/reducer"

const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  socket,
  tools,
  usersSettings,
  groupSettings,
  gps,
  camera,
  onList,
  radar,
  perimeter,
  ntfs,
  crossroad,
  ptz,
  tower,
  xatlov,
  noturar,
  menu,
  selectedReducer,
  noturarlar,
  inspektor,
  fuqarolar,
  foydalanuvchi,
  alarm,
  onListData,
  lochinKoz,
  videoDetectionReducer
})

export default rootReducer
