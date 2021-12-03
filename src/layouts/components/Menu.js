import { useEffect } from "react"

// ** Third Party Components
import PerfectScrollbar from "react-perfect-scrollbar"
import { withRouter } from "react-router-dom"
import MenuHeader from "./customComponent/header/"
import MenuComponent from "./customComponent/menu/"

// ** Store & Actions
import { useSelector } from "react-redux"

const CustomMenu = (props) => {
  // const alarmStatus = useSelector((state) => state.alarm.status)
  const alarmStatus = useSelector((state) => state.alarm)

  useEffect(() => {
    const interval = setTimeout(() => {
      if (alarmStatus.status && props.location.pathname !== "/map") {
        return props.history.push("/map")
      }
    }, 1000)
    return () => clearTimeout(interval)
  }, [alarmStatus])

  return (
    <>
      <MenuHeader props={props} />
      <hr />
      <div style={{ height: "calc(100vh - 30px)" }}>
        <PerfectScrollbar className="main-menu-content" options={{ wheelPropagation: false }}>
          <MenuComponent />
        </PerfectScrollbar>
      </div>
      <p className="clearfix mb-0 ml-1">
        <span className="float-md-left d-block d-md-inline-block mt-25">© Smart Base {new Date().getFullYear()} </span>
      </p>
    </>
  )
}

export default withRouter(CustomMenu)
