import { Link, withRouter } from "react-router-dom"
import classnames from "classnames"
import { FormattedMessage } from "react-intl"

// ** Icons
import { Info } from "react-feather"

const FeedBackMenu = () => {
  return (
    <li className={classnames("nav-item ", { ["active"]: location?.pathname === "/feedBack" })}>
      <Link className="d-flex align-items-center" to="/feedBack">
        <Info />
        <span className="menu-title text-truncate">{<FormattedMessage id="NavFeedBack" />}</span>
      </Link>
    </li>
  )
}

export default withRouter(FeedBackMenu)
