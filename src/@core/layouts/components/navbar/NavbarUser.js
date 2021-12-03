// ** Dropdowns Imports
import { Fragment, useEffect, useState } from "react"
import UserDropdown from "./UserDropdown"

// ** Third Party Components
import { Sun, Moon, Menu, Bell } from "react-feather"
import {
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Media
} from "reactstrap"
import { withRouter } from "react-router-dom"

import PerfectScrollbar from "react-perfect-scrollbar"

// ** Custom
import IntlDropdown from "./IntlDropdown"
/// ** Time picker
import Clock from "./time"

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux"
import { SkinChanged } from "../../../../redux/actions/layout/"
import Badge from "reactstrap/lib/Badge"
import { handleNotifications } from "../../../../redux/actions/navbar/Index"
import moment from "moment"

const NavbarUser = (props) => {
  const [value, onChange] = useState("10:00")
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props
  // ** Action
  const dispatch = useDispatch()
  const notifications = useSelector((state) => state.navbar.notifications)

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === "dark") {
      return <Sun className="ficon" onClick={() => setSkin("light")} />
    } else {
      return <Moon className="ficon" onClick={() => setSkin("dark")} />
    }
  }
  //// ** Function to Badge Notification (Messages)
  const BadgePillNotification = () => {
    const renderNotificationItems = () => {
      return (
        <PerfectScrollbar
          component="li"
          className="media-list scrollable-container"
          options={{
            wheelPropagation: false
          }}
        >
          {notifications.map((n) => (
            <Media key={n.id}>
              <Media left href="#"></Media>
              <Media body>
                <div style={{ fontSize: 18 }} className="text-dark">
                  {n?.notification_type.title}
                </div>

                <div style={{ fontSize: 14, marginTop: "0.5em" }}>
                  {moment(n?.date_time).format("DD.MM.YYYY HH:mm:ss")}
                </div>
              </Media>
            </Media>
          ))}
        </PerfectScrollbar>
      )
    }

    return (
      <UncontrolledDropdown tag="li" className="dropdown-notification nav-item mr-25">
        <DropdownToggle tag="a" className="nav-link" href="/" onClick={(e) => e.preventDefault()}>
          <Bell size={21} />
          <Badge pill color="primary" className="badge-up">
            {notifications.length}
          </Badge>
        </DropdownToggle>
        <DropdownMenu tag="ul" right className="dropdown-menu-media mt-0">
          <li className="dropdown-menu-header">
            <DropdownItem className="d-flex" tag="div" header>
              <h4 className="notification-title mb-0 mr-auto">Янги хабарлар</h4>
              <Badge tag="div" color="light-primary" pill>
                {notifications.length}
              </Badge>
            </DropdownItem>
          </li>
          {renderNotificationItems()}
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  }
  useEffect(() => {
    if (skin === "dark") {
      return dispatch(SkinChanged("dark"))
    } else {
      return dispatch(SkinChanged("light"))
    }
  }, [skin])

  useEffect(() => {
    dispatch(handleNotifications())
  }, [])

  return (
    <Fragment>
      <ul className="navbar-nav d-xl-none d-flex align-items-center">
        <NavItem className="mobile-menu mr-auto">
          <NavLink className="nav-menu-main menu-toggle hidden-xs is-active" onClick={() => setMenuVisibility(true)}>
            <Menu className="ficon" />
          </NavLink>
        </NavItem>
      </ul>
      <div className="ml-1 d-flex align-items-center">
        <Clock />
      </div>
      <ul className="nav navbar-nav align-items-center ml-auto">
        <IntlDropdown skin={skin} />
        <div
          style={{
            width: 1,
            height: 30
          }}
          className="rounded"
        />
        <div className="bookmark-wrapper d-flex align-items-center">
          <NavItem className="d-none d-lg-block">
            <NavLink className="nav-link-style">
              <ThemeToggler />
            </NavLink>
          </NavItem>
        </div>
        <div className="bookmark-wrapper d-flex align-items-center mr-1">
          <BadgePillNotification />
        </div>
        <UserDropdown />
      </ul>
    </Fragment>
  )
}
export default withRouter(NavbarUser)
