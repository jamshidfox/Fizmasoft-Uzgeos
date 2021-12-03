import { useEffect } from "react"

// ** Third Part
import { NavLink } from "react-router-dom"

// ** Third Party Components
import { Disc, X, Circle } from "react-feather"

// ** Config
import themeConfig from "@configs/themeConfig"

const SiderHeader = (props) => {
  // ** Props
  const { menuCollapsed, setMenuCollapsed, setMenuVisibility, setGroupOpen, menuHover } = props.props

  // ** Reset open group
  // useEffect(() => {
  //   if (!menuHover && menuCollapsed)
  // }, [menuHover, menuCollapsed])

  // ** Menu toggler component
  const Toggler = () => {
    if (!menuCollapsed) {
      return (
        <Disc
          size={20}
          data-tour="toggle-icon"
          className="text-primary toggle-icon d-none d-xl-block"
          onClick={() => setMenuCollapsed(true)}
        />
      )
    } else {
      return (
        <Circle
          size={20}
          data-tour="toggle-icon"
          className="text-primary toggle-icon d-none d-xl-block"
          onClick={() => setMenuCollapsed(false)}
        />
      )
    }
  }
  return (
    <div className="navbar-header" style={{ height: "3.45rem" }}>
      <ul className="nav navbar-nav flex-row">
        <li className="nav-item mr-auto">
          <NavLink to="/" className="navbar-brand">
            <span className="brand-logo">
              <img src={themeConfig.app.appLogoImage} alt="logo" />
            </span>
            <h2 className="brand-text mb-0">{themeConfig.app.appName}</h2>
          </NavLink>
        </li>
        <li className="nav-item nav-toggle">
          <div className="nav-link modern-nav-toggle cursor-pointer">
            {/* <Toggler /> */}
            {/* <X onClick={() => setMenuVisibility(false)} className="toggle-icon icon-x d-block d-xl-none" size={20} /> */}
          </div>
        </li>
      </ul>
    </div>
  )
}

export default SiderHeader
