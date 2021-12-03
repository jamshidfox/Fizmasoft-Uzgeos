import moment from "moment"
import React, { useEffect, useState } from "react"
import { injectIntl } from "react-intl"
import { toast } from "react-toastify"
import InfoTimer from "./InfoTimer"

const Timer = ({ name, condition, intl }) => {
  const [startDate, setStartDate] = useState(moment(new Date()).format("HH:mm:ss"))
  const [endDate, setEndDate] = useState(moment(new Date()).format("HH:mm:ss"))
  const [resultDate, setResultDate] = useState("")

  useEffect(() => {
    if (condition) {
      setEndDate(moment(new Date()).format("HH:mm:ss"))
    }
    if (!condition) {
      setStartDate(moment(new Date()).format("HH:mm:ss"))
    }
  }, [condition])

  useEffect(() => {
    if (startDate !== "" && endDate !== "") {
      setResultDate(moment.utc(moment(endDate, "HH:mm:ss").diff(moment(startDate, "HH:mm:ss"))).format("HH:mm:ss"))
    }
  }, [startDate, endDate])

  useEffect(() => {
    if (resultDate !== "") {
      if (condition && endDate) {
        toast.success(<InfoTimer intl={intl} startDate={startDate} resultDate={resultDate} endDate={endDate} name={name} setResultDate={setResultDate} />, {
          position: "bottom-left",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: true
        })
      }
    }
  }, [resultDate])

  return <></>
}

export default injectIntl(Timer)
