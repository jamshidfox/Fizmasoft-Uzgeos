// ** React
import { useState, useEffect } from "react"

// ** Third Part
import { Collapse } from "reactstrap"
import { Link, withRouter } from "react-router-dom"
import classnames from "classnames"
import { useDispatch, useSelector } from "react-redux"
import { FormattedMessage } from "react-intl"

// ** Icons
import { Aperture, Circle, Eye, Search, Users } from "react-feather"
import { BiFace } from "react-icons/bi"
import { BsPlus } from "react-icons/bs"
import { AiFillCar } from "react-icons/ai"
import { GiGps } from "react-icons/gi"

// ** Store & Redux
import { handleIntegrationOpen } from "../../../../../redux/actions/menuItems"

const IntegrationMenu = ({ location }) => {
  const dispatch = useDispatch()

  // ** menu items store
  const integrationStore = useSelector((state) => state.menu)

  const [isIntegrationMenu, setIsIntegrationMenu] = useState(false)
  const [isIntegrationChild, setIntegrationChild] = useState(false)

  useEffect(() => {
    if (location?.pathname === "/accountSettings") {
      setIsIntegrationMenu(false)
      setIntegrationChild(false)
      dispatch(handleIntegrationOpen(false))
    }
  }, [location])

  const onIntegrationOpen = () => setIsIntegrationMenu(!isIntegrationMenu)
  const onIntegrationChildOpen = () => setIntegrationChild(!isIntegrationChild)

  return (
    <li
      className={classnames("nav-item has-sub", {
        ["open menu-collapsed-open sidebar-group-active "]: integrationStore?.isIntegrationOpen
      })}
    >
      <a className="d-flex align-items-center" to="" onClick={() => dispatch(handleIntegrationOpen(!integrationStore?.isIntegrationOpen))}>
        <BsPlus />
        <span className="menu-title text-truncate">{<FormattedMessage id="NavIntegrations" />}</span>
      </a>
      <ul className="menu-content">
        <Collapse isOpen={integrationStore?.isIntegrationOpen}>
          <li
            className={classnames("nav-item has-sub", {
              ["open menu-collapsed-open sidebar-group-active "]: isIntegrationChild
            })}
          >
            <a className="d-flex align-items-center" onClick={onIntegrationChildOpen}>
              <BiFace />
              <span className="menu-title text-truncate">{<FormattedMessage id="NavNTFace" />}</span>
            </a>
            <ul className="menu-content">
              <Collapse isOpen={isIntegrationChild}>
                <li className={classnames("nav-item", { ["active"]: location?.pathname === "/ntfaceQidiruv" })}>
                  <Link className="d-flex align-items-center" to="/ntfaceQidiruv">
                    <Circle />
                    <span className="menu-title text-truncate">{<FormattedMessage id="NavSearch" />}</span>
                  </Link>
                </li>
                <li className={classnames("nav-item", { ["active"]: location?.pathname === "/ntfaceFoydalanuvchi" })}>
                  <Link className="d-flex align-items-center" to="/ntfaceFoydalanuvchi">
                    <Circle />
                    <span className="menu-title text-truncate">{<FormattedMessage id="NavUser" />}</span>
                  </Link>
                </li>
              </Collapse>
            </ul>
          </li>
          <li className={classnames("nav-item", { ["active"]: location?.pathname === "/lochinkoz" })}>
            <Link className="d-flex align-items-center" to="/lochinkoz">
              <Eye />
              <span className="menu-title text-truncate">{<FormattedMessage id="NavLochinKo'z" />}</span>
            </Link>
          </li>
          <li className={classnames("nav-item ", { ["active"]: location?.pathname === "/fuqaro" })}>
            <Link className="d-flex align-items-center" to="/fuqaro">
              <Users />
              <span className="menu-title text-truncate">{<FormattedMessage id="NavPersons" />}</span>
            </Link>
          </li>
          <li className={classnames("nav-item ", { ["active"]: location?.pathname === "/avto" })}>
            <Link className="d-flex align-items-center" to="/avto">
              <AiFillCar />
              <span className="menu-title text-truncate">{<FormattedMessage id="NavTransports" />}</span>
            </Link>
          </li>
          <li className={classnames("nav-item ", { ["active"]: location?.pathname === "/videoDetection" })}>
            <Link className="d-flex align-items-center" to="/videoDetection">
              <Aperture />
              <span className="menu-title text-truncate">{<FormattedMessage id="Video Detection" />}</span>
            </Link>
          </li>
          <li className={classnames("nav-item ", { ["active"]: location?.pathname === "/gpshistory" })}>
            <Link className="d-flex align-items-center" to="/gpshistory">
              <GiGps />
              <span className="menu-title text-truncate">{<FormattedMessage id="NavGpsHistory" />}</span>
            </Link>
          </li>
        </Collapse>
      </ul>
    </li>
  )
}

export default withRouter(IntegrationMenu)
