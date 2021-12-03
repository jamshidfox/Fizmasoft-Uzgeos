// ** React Imports
import { useEffect, useState } from "react"
import { Link, withRouter } from "react-router-dom"


// ** JwT 
import useJwt from "@src/auth/jwt/useJwt"
const config = useJwt.jwtConfig

// ** Custom Components
import Avatar from "@components/avatar"

// ** Utils
import { isUserLoggedIn } from "@utils"

// ** Store & Actions
import { useDispatch } from "react-redux"
import { handleLogout } from "@store/actions/auth"

// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from "reactstrap"
import { User, Power, Mail, Settings } from "react-feather"
import { FormattedMessage } from "react-intl"

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg"

const UserDropdown = ({ history }) => {
  // ** Store Vars
  const dispatch = useDispatch()

  // ** State
  const [userData, setUserData] = useState(null)

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem("userData")))
    }
  }, [])

  //** Vars
  const userAvatar = (userData && userData.avatar) || defaultAvatar

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle href="/" tag="a" className="nav-link dropdown-user-link" onClick={(e) => e.preventDefault()}>
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name font-weight-bold">{userData && userData["full_name"]}</span>
          <span className="user-status">{userData && userData.username}</span>
        </div>
        <Avatar style={{ objectFit: "cover" }} img={`${config.url}/images/${userAvatar}`} imgHeight="40" imgWidth="40" status="online" />
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem tag={Link} to="#" onClick={(e) => history.push("/profile")}>
          <User size={14} className="mr-75" />
          <span className="align-middle">{<FormattedMessage id="UserProfile" />}</span>
        </DropdownItem>
        <DropdownItem divider></DropdownItem>
        <DropdownItem tag={Link} to="#" onClick={(e) => history.push("/accountSettings")}>
          <Settings size={14} className="mr-75" />
          <span className="align-middle">{<FormattedMessage id="UserSettings" />}</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="#" onClick={(e) => history.push("/message")}>
          <Mail size={26} className="mr-75" />
          <span className="align-middle">{<FormattedMessage id="UserSentMessage" />}</span>
        </DropdownItem>
        <DropdownItem divider></DropdownItem>
        <DropdownItem tag={Link} to="/login" onClick={() => dispatch(handleLogout())}>
          <Power size={14} className="mr-75" />
          <span className="align-middle">{<FormattedMessage id="UserLogOut" />}</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default withRouter(UserDropdown)
