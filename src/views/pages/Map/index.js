// ** React
import { useState, useEffect } from "react"
import { Card } from "reactstrap"
import styled from "styled-components"
import classnames from "classnames"
import { Howl } from "howler"
// ** Store & Actions
import { useSelector, useDispatch } from "react-redux"

// ** Custom Component
import SidebarInfo from "./SidebarInfo"
import SidebarCloseBtn from "./SidebarCloseBtn"
import MapsBasic from "./MapBasic"

import { handleAlarmStatus } from "../../../redux/actions/alarm"

import alarmSound from "../../../assets/sound/alarming.wav"

const SystemMap = () => {
  const sound = new Howl({
    src: [alarmSound],
    html5: true,
    loop: true
  })
  const [sidebar, setSidebar] = useState(false)

  const dispatch = useDispatch()

  const socket = useSelector((state) => state.socket.connection)
  const alarmStatus = useSelector((state) => state.alarm.status)
  const alarmData = useSelector((state) => state.alarm.data)

  const user = JSON.parse(localStorage.getItem("userData"))

  // const routes = [
  //   { name: "Домой", link: "/", active: false },
  //   { name: "Карта", link: "/feedBack", active: true }
  // ]

  // INIT SOCKET CONNECTION

  useEffect(() => {
    if (socket && typeof socket === "object") {
      socket.emit("notifications", [])
      socket.on("notifications", (data) => {
        if (user && user.group) {
          const userId = user.group.id
          if (data.notification.group_id.includes(userId)) {
            sound.play()
          }
        }
      })
    }
  }, [socket, alarmStatus])

  useEffect(() => {
    document.addEventListener("keyup", (e) => {
      if (e.keyCode === 27) {
        dispatch(handleAlarmStatus(false, alarmData))
        sound.stop()
      }
    })
  }, [alarmStatus])

  return (
    <>
      <AllDiv alert={"true"}>
        <Card className={sidebar ? "sidebar-open " : "sidebar-close "}>
          <SidebarInfo toggleSidebar={(cond) => setSidebar(cond)} />
        </Card>
        <div className="mb-1 btn-div">
          <SidebarCloseBtn sidebar={sidebar} toggle={() => setSidebar((prev) => !prev)} />
        </div>
        <Card
          className={classnames("", {
            "map-card-1": !sidebar,
            "map-card-2": sidebar,
            "alarm-on": alarmStatus
          })}
        >
          <MapsBasic resize={sidebar} />
        </Card>
      </AllDiv>
    </>
  )
}

export default SystemMap

const AllDiv = styled.div`
  margin: 0;
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: calc(100vh - 81px);

  .map-card-2 {
    height: 99%;
    width: calc(100% - 420px);
  }

  .map-card-1 {
    height: 99%;
    width: 100%;
  }

  .sidebar-open {
    overflow-y: auto;
    height: 99%;
    width: 400px;
    animation: sidebarOpen 0.5s ease;
  }

  .sidebar-close {
    overflow-y: auto;
    height: 99%;
    width: 0;
    opacity: 0;
    animation: sidebarClose 0.5s;
  }

  .alarm-on {
    animation: alarmOn 0.8s infinite;
    /* animation-iteration-count: infinite; */
  }

  .btn-div {
    display: flex;
    position: relative;
    width: 0;
  }

  .toggle-btn {
    height: 30px;
    width: 42px;
    position: absolute;
    top: 50%;
    left: -20px;
    z-index: 9999;
  }

  @keyframes sidebarClose {
    0% {
      width: 300px;
      opacity: 1;
    }
    100% {
      width: 0;
      opacity: 0;
    }
  }

  @keyframes sidebarOpen {
    0% {
      width: 0;
      opacity: 0;
    }
    100% {
      width: 400px;
      opacity: 1;
    }
  }

  @keyframes alarmOn {
    0% {
      background: #c34b4f;
    }
    50% {
      background: #4b7dc3;
    }
    100% {
      background: #c34b4f;
    }
  }
`
