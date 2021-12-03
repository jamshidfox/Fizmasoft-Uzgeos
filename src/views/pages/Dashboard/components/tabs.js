import _, { useEffect, useState } from "react"
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap"
import Hatlov from "../tabs/hatlov"
import Car from "../tabs/Car"
import OnList from "../tabs/OnList"
/// translation
import { FormattedHTMLMessage } from "react-intl"
import Perimeter from "../tabs/Perimeter"
import CarInfo from "../tabs/CarInfo"

const PillCentered = () => {
  const [active, setActive] = useState("1")

  const toggle = (tab) => {
    setActive(tab)
  }
  return (
    <div style={{ height: "100%" }}>
      <Nav className="d-flex align-items-center mt-2" pills>
        <NavItem
          onClick={() => {
            toggle("1")
          }}
        >
          <NavLink active={active === "1"}>
            <FormattedHTMLMessage id="NavPERIMETER" />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === "2"}
            onClick={() => {
              toggle("2")
            }}
          >
            <FormattedHTMLMessage id="NavTransports" />
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            active={active === "3"}
            onClick={() => {
              toggle("3")
            }}
          >
            <FormattedHTMLMessage id="DashCar" />
          </NavLink>
        </NavItem>
        <NavItem
          onClick={() => {
            toggle("4")
          }}
        >
          <NavLink active={active === "4"}>
            <FormattedHTMLMessage id="DashXatlov" />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === "5"}
            onClick={() => {
              toggle("5")
            }}
          >
            <FormattedHTMLMessage id="NavONLIST" />
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent style={{ height: "94%" }} className="py-50" activeTab={active}>
        <TabPane style={{ height: "100%" }} tabId="1">
          <Perimeter active={active} />
        </TabPane>
        <TabPane style={{ height: "100%" }} tabId="2">
          <CarInfo active={active} />
        </TabPane>
        <TabPane style={{ height: "100%" }} tabId="3">
          <Car active={active} />
        </TabPane>
        <TabPane style={{ height: "100%" }} tabId="4">
          <Hatlov active={active} />
        </TabPane>
        <TabPane style={{ height: "100%" }} tabId="5">
          <OnList active={active} />
        </TabPane>
      </TabContent>
    </div>
  )
}
export default PillCentered
