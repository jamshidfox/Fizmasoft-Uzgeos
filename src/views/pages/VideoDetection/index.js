import React, { useState } from "react"
import { injectIntl } from "react-intl"
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap"
import Tabs from "./Components/Tabs"
import Face from "./Face"
import Human from "./Human"
import NonMotor from "./NonMotor"
import Vehicle from "./Vehicle"

const VideoDetection = ({ intl }) => {
  const tabs = [
    { id: 1, name: intl.formatMessage({ id: "Search By Face" }), content: <Face /> },
    { id: 2, name: intl.formatMessage({ id: "Search By Human" }), content: <Human /> },
    { id: 3, name: intl.formatMessage({ id: "Search By Vehicle" }), content: <Vehicle /> },
    { id: 4, name: intl.formatMessage({ id: "Search By Non Motor" }), content: <NonMotor /> }
  ]
  const [active, setActive] = useState(0)

  const toggle = (tab) => {
    setActive(tab)
  }
  return (
    <React.Fragment>
      <Nav className="d-flex align-items-center justify-content-start flex-row" pills>
        {tabs.map((tab, index) => (
          <NavItem key={tab.id}>
            <NavLink
              active={active === index}
              onClick={() => {
                toggle(index)
              }}
            >
              {tab.name}
            </NavLink>
          </NavItem>
        ))}
        <Tabs />
      </Nav>
      <TabContent className="py-50" activeTab={active}>
        {tabs.map((tab, index) => (
          <TabPane key={tab.id} tabId={index}>
            {tab.content}
          </TabPane>
        ))}
      </TabContent>
    </React.Fragment>
  )
}
export default injectIntl(VideoDetection)
