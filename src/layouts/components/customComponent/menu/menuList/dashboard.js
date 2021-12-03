import { Link, withRouter } from "react-router-dom"
import classnames from "classnames"
import { FormattedMessage } from "react-intl"

// ** Icons
import { RiDashboardLine } from "react-icons/ri"

const DashboardMenu = ({ location }) => {
  return (
    <li className={classnames("nav-item ", { ["active"]: location?.pathname === "/dashboard" })}>
      <Link className="d-flex align-items-center" to="/dashboard">
        <RiDashboardLine style={{ fontSize: 32 }} />
        <span className="menu-title text-truncate">{<FormattedMessage id="NavDashBoard" />}</span>
      </Link>
    </li>
  )
}

export default withRouter(DashboardMenu)
