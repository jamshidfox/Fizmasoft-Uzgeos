import React from "react"
import { Button } from "reactstrap"
import { ChevronLeft, ChevronRight } from "react-feather"

const SidebarCloseBtn = ({ sidebar, toggle }) => {
  return (
    <>
      {sidebar ? (
        <Button.Ripple className="toggle-btn" size="sm" color="primary" onClick={toggle}>
          <ChevronLeft size="14" />
        </Button.Ripple>
      ) : null}
      {!sidebar ? (
        <>
          <Button.Ripple className="toggle-btn" size="sm" color="primary" onClick={toggle}>
            <ChevronRight size="14" />
          </Button.Ripple>
        </>
      ) : null}
    </>
  )
}

export default SidebarCloseBtn
