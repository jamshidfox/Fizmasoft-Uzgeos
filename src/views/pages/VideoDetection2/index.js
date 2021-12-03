import React, { useEffect, useState } from "react"
import { injectIntl } from "react-intl"
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap"
import { useDispatch, useSelector } from "react-redux"
import Face from "./Face"
import Human from "./Human"
import { setDevices, setTabs } from "./store/actions"

const VideoDetection = ({ intl }) => {
  const externalTabSet = useSelector((state) => state.videoDetectionReducer.activeTab)
  const dispatch = useDispatch()
  const tabs = [
    { id: 1, name: intl.formatMessage({ id: "Search By Face" }), content: <Face /> },
    { id: 2, name: intl.formatMessage({ id: "Search By Human" }), content: <Human /> },
    { id: 3, name: intl.formatMessage({ id: "Search By Vehicle" }), content: 897 },
    { id: 4, name: intl.formatMessage({ id: "Search By Non Motor" }), content: 825 }
  ]
  const [active, setActive] = useState(1)
  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  useEffect(() => {
    dispatch(setDevices())
  }, [])

  useEffect(() => {
    if (!externalTabSet) return
    setActive(externalTabSet)
    dispatch(setTabs(null))
  }, [externalTabSet])

  return (
    <div style={{ marginTop: -15 }}>
      <React.Fragment>
        <Nav tabs>
          {tabs.map((tab) => (
            <NavItem key={tab.id}>
              <NavLink
                style={{ border: "1px solid gray", borderStyle: "solid solid none solid ", marginLeft: 5, padding: 3, background: active === tab.id ? null : "#b8c2cc36" }}
                active={active === tab.id}
                onClick={() => {
                  toggle(tab.id)
                }}
              >
                {tab.name}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
        <TabContent className="py-50" activeTab={active}>
          {tabs.map((tab) => (
            <TabPane key={tab.id} tabId={tab.id}>
              {tab.content}
            </TabPane>
          ))}
        </TabContent>
      </React.Fragment>
    </div>
  )
}

export default injectIntl(VideoDetection)
