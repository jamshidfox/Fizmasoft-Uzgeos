import React, { useEffect, useState } from "react"
import { Button, Card, FormGroup, Spinner } from "reactstrap"
import { AiFillCar } from "react-icons/ai"
import { FaTruckMoving, FaMotorcycle, FaBusAlt, FaQuestion } from "react-icons/fa"
import { GiTruck } from "react-icons/gi"
import dashboardApi from "../../api"
import { injectIntl } from "react-intl"
import { toast } from "react-toastify"
import validateDate from "../../../VideoDetection2/Components/dateValidator"
import DateInput from "../../../../components/DateTimeInput"
import moment from "moment"
import Timer from "../../../../components/Timer"

const CarTypeQuantity = ({
  intl,
  sendDate,
  setSendDate,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  active,
  setLoadingByWeek,
  setLoadingOwnerType,
  setLoadingExit,
  setLoadingEntry,
  setCarOwnerTimer,
  setRegionTimer,
  setEntryTimer,
  setExitTimer
}) => {
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)

  const [carQuantityTimer, setCarQuantityTimer] = useState(null)

  useEffect(async () => {
    if (active === "2") {
      const { data } = await dashboardApi.getDataByCarType(sendDate)
      if (data) {
        setResult(data.data)
        setLoading(false)
        setCarQuantityTimer(true)
      }
    }
  }, [sendDate, active])

  const handleStartDateChange = (e) => {
    setStartDate(e)
  }

  const handleEndDateChange = (e) => {
    setEndDate(e)
  }

  const handleSubmit = () => {
    const format = "DD.MM.YYYY HH:mm:ss"
    const start = moment(startDate).format(format)
    const end = moment(endDate).format(format)
    if (!validateDate([start, end])) {
      return toast.error(intl.formatMessage({ id: "TimeIntervalError" }))
    } else {
      setCarQuantityTimer(false)
      setCarOwnerTimer(false)
      setRegionTimer(false)
      setEntryTimer(false)
      setExitTimer(false)
      setLoading(true)
      setLoadingByWeek(true)
      setLoadingOwnerType(true)
      setLoadingEntry(true)
      setLoadingExit(true)
      setSendDate([start, end])
    }
  }

  return (
    <Card style={{ padding: "20px 5px", height: "100%" }}>
      {active === "2" && <Timer name={intl.formatMessage({ id: "Vehicle type" })} condition={carQuantityTimer} />}
      <div className="d-flex flex-column">
        <FormGroup style={{ margin: "0px 5px" }}>
          <DateInput value={startDate} onChange={handleStartDateChange} calendar={false} clear={false} />
        </FormGroup>
        <FormGroup style={{ margin: "7px 5px" }}>
          <DateInput value={endDate} onChange={handleEndDateChange} calendar={false} clear={false} />
        </FormGroup>
        <Button onClick={handleSubmit} style={{ margin: "0px 5px" }} color="primary">
          {loading ? <Spinner size="sm" /> : intl.formatMessage({ id: "DashSend" })}
        </Button>
      </div>
      <div className="d-flex flex-column px-1 mt-2">
        <div className="text-center">
          <AiFillCar style={{ width: "20px", height: "20px" }} className="text-primary" />
          <p style={{ fontWeight: "bolder" }} className="m-0">
            {intl.formatMessage({ id: "DashLightCar" })}
          </p>
          <div className="d-flex justify-content-between">
            <p style={{ fontWeight: "bolder" }} className="m-0">
              {intl.formatMessage({ id: "DashEntry" })}:
            </p>
            <p className="m-0">{new Intl.NumberFormat().format(result[0] && result[0].yengil)}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p style={{ fontWeight: "bolder" }} className="m-0">
              {intl.formatMessage({ id: "DashExit" })}:
            </p>
            <p className="m-0  pl-1">{new Intl.NumberFormat().format(result[1] && result[1].yengil)}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p style={{ fontWeight: "bolder", color: "green" }} className="m-0">
              {intl.formatMessage({ id: "TableTotal" })}:
            </p>
            <p style={{ color: "green", fontWeight: "bolder" }} className="m-0">
              {new Intl.NumberFormat().format(result[1] && Number(result[0].yengil) + Number(result[1].yengil))}
            </p>
          </div>

          <hr style={{ margin: "7px" }} />
        </div>
        <div className="text-center">
          <FaBusAlt style={{ width: "20px", height: "20px" }} className="text-primary" />
          <p style={{ fontWeight: "bolder" }} className="m-0">
            {intl.formatMessage({ id: "DashBus" })}
          </p>
          <div className="d-flex justify-content-between">
            <p style={{ fontWeight: "bolder" }} className="m-0">
              {intl.formatMessage({ id: "DashEntry" })}:
            </p>
            <p className="m-0">{new Intl.NumberFormat().format(result[0] && result[0].avtobus)}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p style={{ fontWeight: "bolder" }} className="m-0">
              {intl.formatMessage({ id: "DashExit" })}:
            </p>
            <p className="m-0 pl-1">{new Intl.NumberFormat().format(result[1] && result[1].avtobus)}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p style={{ fontWeight: "bolder", color: "green" }} className="m-0">
              {intl.formatMessage({ id: "TableTotal" })}:
            </p>
            <p style={{ color: "green", fontWeight: "bolder" }} className="m-0">
              {new Intl.NumberFormat().format(result[1] && Number(result[0].avtobus) + Number(result[1].avtobus))}
            </p>
          </div>

          <hr style={{ margin: "7px" }} />
        </div>
        <div className="text-center">
          <FaTruckMoving style={{ width: "20px", height: "20px" }} className="text-primary" />
          <p style={{ fontWeight: "bolder" }} className="m-0">
            {intl.formatMessage({ id: "DashYuk" })}
          </p>
          <div className="d-flex justify-content-between">
            <p style={{ fontWeight: "bolder" }} className="m-0">
              {intl.formatMessage({ id: "DashEntry" })}:
            </p>
            <p className="m-0">{new Intl.NumberFormat().format(result[0] && result[0].yuk)}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p style={{ fontWeight: "bolder" }} className="m-0">
              {intl.formatMessage({ id: "DashExit" })}:
            </p>
            <p className="m-0 pl-1">{new Intl.NumberFormat().format(result[1] && result[1].yuk)}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p style={{ fontWeight: "bolder", color: "green" }} className="m-0">
              {intl.formatMessage({ id: "TableTotal" })}:
            </p>
            <p style={{ color: "green", fontWeight: "bolder" }} className="m-0">
              {new Intl.NumberFormat().format(result[1] && Number(result[0].yuk) + Number(result[1].yuk))}
            </p>
          </div>
          <hr style={{ margin: "7px" }} />
        </div>
        <div className="text-center">
          <FaMotorcycle style={{ width: "20px", height: "20px" }} className="text-primary" />
          <p style={{ fontWeight: "bolder" }} className="m-0">
            {intl.formatMessage({ id: "DashMoto" })}
          </p>
          <div className="d-flex justify-content-between">
            <p style={{ fontWeight: "bolder" }} className="m-0">
              {intl.formatMessage({ id: "DashEntry" })}:
            </p>
            <p className="m-0">{new Intl.NumberFormat().format(result[0] && result[0].moto)}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p style={{ fontWeight: "bolder" }} className="m-0">
              {intl.formatMessage({ id: "DashExit" })}:
            </p>
            <p className="m-0 pl-1">{new Intl.NumberFormat().format(result[1] && result[1].moto)}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p style={{ fontWeight: "bolder", color: "green" }} className="m-0">
              {intl.formatMessage({ id: "TableTotal" })}:
            </p>
            <p style={{ color: "green", fontWeight: "bolder" }} className="m-0">
              {new Intl.NumberFormat().format(result[1] && Number(result[0].moto) + Number(result[1].moto))}
            </p>
          </div>

          <hr style={{ margin: "7px" }} />
        </div>
        <div className="text-center">
          <GiTruck style={{ width: "20px", height: "20px" }} className="text-primary" />
          <p style={{ fontWeight: "bolder" }} className="m-0">
            {intl.formatMessage({ id: "DashMaxsus" })}
          </p>
          <div className="d-flex justify-content-between">
            <p style={{ fontWeight: "bolder" }} className="m-0">
              {intl.formatMessage({ id: "DashEntry" })}:
            </p>
            <p style={{ fontWeight: "bolder" }} className="m-0">
              {new Intl.NumberFormat().format(result[0] && result[0].maxsus)}
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <p style={{ fontWeight: "bolder" }} className="m-0">
              {intl.formatMessage({ id: "DashExit" })}:
            </p>
            <p className="m-0 pl-1">{new Intl.NumberFormat().format(result[1] && result[1].maxsus)}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p style={{ fontWeight: "bolder", color: "green" }} className="m-0">
              {intl.formatMessage({ id: "TableTotal" })}:
            </p>
            <p style={{ color: "green", fontWeight: "bolder" }} className="m-0">
              {new Intl.NumberFormat().format(result[1] && Number(result[0].maxsus) + Number(result[1].maxsus))}
            </p>
          </div>
        </div>
        {/* <div className="text-center">
          <FaQuestion style={{ width: "20px", height: "20px" }} className="text-primary" />
          <p className="m-0">{intl.formatMessage({ id: "others" })}</p>
          <div className="d-flex justify-content-between">
            <p className="m-0">{new Intl.NumberFormat().format(result[0] && result[0].boshqalar)}</p>
            <div style={{ width: "5px", height: "20px" }} className="bg-primary"></div>
            <p className="m-0">{new Intl.NumberFormat().format(result[1] && result[1].boshqalar)}</p>
          </div>
          <p className="m-0">{new Intl.NumberFormat().format(result[1] && Number(result[0].boshqalar) + Number(result[1].boshqalar))}</p>
        </div> */}
      </div>
    </Card>
  )
}

export default injectIntl(CarTypeQuantity)
