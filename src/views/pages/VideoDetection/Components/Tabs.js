import React, { useEffect, useRef, useState } from "react"
import { AiOutlineCar } from "react-icons/ai"
import { IoBicycleOutline } from "react-icons/io5"
import { FaRegSmile } from "react-icons/fa"
import { IoIosMan } from "react-icons/io"
import videoDetectionApi from "../api"
import { TabContent, TabPane, NavItem } from "reactstrap"

const Tabs = () => {
  const [resultData, setResultData] = useState("")
  const fetchData = async () => {
    const { data } = await videoDetectionApi.getDataQuantity()

    setResultData(data.Data)
  }
  useEffect(() => {
    fetchData()
  }, [])
  const tabs = [
    { id: 1, quantity: resultData.Face, content: <FaRegSmile className="text-primary" style={{ width: "30px", height: "24px", margin: "0 4px" }} /> },
    { id: 2, quantity: resultData.Human, content: <IoIosMan className="text-primary" style={{ width: "30px", height: "24px", margin: "0 4px" }} /> },
    { id: 3, quantity: resultData.Car, content: <AiOutlineCar className="text-primary" style={{ width: "30px", height: "24px", margin: "0 4px" }} /> },
    { id: 4, quantity: resultData.Bike, content: <IoBicycleOutline className="text-primary" style={{ width: "30px", height: "24px", margin: "0 4px" }} /> }
  ]

  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)

  const toggle = (tab) => {
    setActive(tab)
    setOpen(!open)
  }

  const ref = useRef()
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (open && ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [open])

  return (
    <div ref={ref} className="border-primary rounded d-flex ml-0 ml-lg-2 mt-2 mt-lg-0  position-relative">
      {tabs.map((tab, index) => (
        <NavItem
          className="d-flex align-items-center text-primary cursor-pointer mx-1"
          style={{ padding: "6px 0px", fontWeight: "bold" }}
          key={tab.id}
          active={active === index}
          onClick={() => {
            toggle(index)
          }}
        >
          {tab.content}
          {tab.quantity}
        </NavItem>
      ))}
      <TabContent
        style={{ top: "45px", zIndex: "9999" }}
        className={`${open ? "d-flex" : "d-none"} py-50 bg-white text-primary font-weight-bold px-1 position-absolute w-100 border-primary rounded`}
        activeTab={active}
      >
        {tabs.map((tab, index) => (
          <TabPane key={tab.id} tabId={index}>
            {tab.quantity}
          </TabPane>
        ))}
      </TabContent>
    </div>
  )
}

export default Tabs
