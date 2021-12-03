import { Nav, NavItem, NavLink  } from 'reactstrap'
import { User, Layers, Users, Activity, List } from 'react-feather'
import { injectIntl } from "react-intl"
const Tabs = ({ intl, activeTab, toggleTab }) => {
  return (
    <Nav className="nav-left" pills vertical>
      <NavItem>
        <NavLink active={activeTab === "1"} onClick={() => toggleTab("1")}>
          <User size={18} className="mr-1" />
          <span className="font-weight-bold">{intl.formatMessage({ id: "SetUsers" })}</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink disabled active={activeTab === "2"} onClick={() => toggleTab("2")}>
          <Layers size={18} className="mr-1" />
          <span className="font-weight-bold">{intl.formatMessage({ id: "SetTiles" })}</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === "3"} onClick={() => toggleTab("3")}>
          <Users size={18} className="mr-1" />
          <span className="font-weight-bold">{intl.formatMessage({ id: "SetUserGroup" })}</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === "4"} onClick={() => toggleTab("4")}>
          <Activity size={18} className="mr-1" />
          <span className="font-weight-bold">{intl.formatMessage({ id: "SetSystemHealth" })}</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === "5"} onClick={() => toggleTab("5")}>
          <List size={18} className="mr-1" />
          <span className="font-weight-bold">{intl.formatMessage({ id: "SetVIPList" })}</span>
        </NavLink>
      </NavItem>
    </Nav>
  )
}

export default injectIntl(Tabs)
