import { useEffect, useState } from "react"
import { injectIntl } from "react-intl"
import { Button, ButtonGroup, Spinner } from "reactstrap"
import DateSelector from "../Components/DateSelector"
import Devices from "../Components/Devices"
import ImageUpload from "../Components/ImageUpload"
import Filter from "./Filter"
import moment from "moment"
import validateDate from "../Components/dateValidator"
import { toast } from "react-toastify"

import { useDispatch, useSelector } from "react-redux"
import { setHumanResults } from "../store/actions"

const getDates = (data) => {
  const dates = []
  let a
  data.forEach((d) => {
    a = moment(d.start_time).format("DD.MM.YYYY")
    if (!dates.includes(a)) dates.push(a)
  })
  return dates
}
const Sider = ({ intl, exportResult, setFilters, filters }) => {
  const [isImage, setIsImage] = useState(false)
  const [resultData, setResultData] = useState(null)
  const [channel, setChannel] = useState(null)
  const [loading, setLoading] = useState(false)
  const [startDate, setStartDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)))
  const [endDate, setEndDate] = useState(new Date(new Date().setHours(23, 59)))
  const [filterDate, setFilterDate] = useState(null)
  const [apiData, setApiData] = useState(useSelector((state) => state.videoDetectionReducer.humanResults))
  const devices = useSelector((state) => state.videoDetectionReducer.devices)

  const dispatch = useDispatch()

  useEffect(() => {
    if (filterDate) {
      const data = apiData.filter((d) => moment(d.start_time).format("DD.MM.YYYY") === filterDate)
      setResultData(data)
    } else setResultData(apiData)
  }, [filterDate])

  useEffect(() => {
    exportResult(resultData)
  }, [resultData])

  useEffect(() => {
    setResultData(apiData)
  }, [apiData])

  const sendData = async () => {
    if (!validateDate([moment(startDate).format("DD.MM.YYYY HH:mm"), moment(endDate).format("DD.MM.YYYY HH:mm")])) return toast.error("Vaqt oralig'i noto'g'ri kiritilgan")
    setLoading(true)
    if (!isImage) {
      setLoading(true)
      const { data } = await dispatch(setHumanResults({ ...filters, channel, start: moment(startDate).format("YYYY-MM-DDTHH:mm:ss"), end: moment(endDate).format("YYYY-MM-DDTHH:mm:ss") }))
      setLoading(false)
      setApiData(data)
    }
    setLoading(false)
  }

  return (
    <div style={{ width: 520, display: "flex" }}>
      <div style={{ width: "80%", marginRight: -15, position: "relative" }}>
        <ButtonGroup style={{ width: "85%", margin: "0 5px 10px 5px" }}>
          <Button outline style={{ width: "55%" }} size="sm" color={isImage ? "secondary" : "primary"} onClick={() => setIsImage(false)} active={!isImage}>
            {intl.formatMessage({ id: "By Property" })}
          </Button>
          <Button outline style={{ width: "50%" }} size="sm" color={isImage ? "primary" : "secondary"} onClick={() => setIsImage(true)} active={isImage}>
            {intl.formatMessage({ id: "By Image" })}
          </Button>
        </ButtonGroup>
        {isImage && <ImageUpload />}
        {devices && <Devices treeData={devices.map((d) => ({ ...d, key: `${d.channel}human` }))} setChannel={setChannel} />}
        {!isImage && <Filter setFilters={setFilters} />}
        <DateSelector startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
        <Button disabled={!channel} onClick={sendData} outline style={{ width: "85%", margin: "10px 15px 0 5px", position: "absolute", bottom: 5 }}>
          {loading ? <Spinner size="sm" /> : intl.formatMessage({ id: "NavSearch" })}
        </Button>
      </div>
      {apiData ? (
        <div className="border-secondary" style={{ width: "30%", textAlign: "center", marginRight: 15, padding: 10 }}>
          <Button onClick={() => setFilterDate(null)} color={filterDate === null ? "primary" : "secondary"} outline style={{ padding: 3 }} size="sm">
            {intl.formatMessage({ id: "All" })}
          </Button>
          <hr />
          {getDates(apiData).map((r) => (
            <Button key={r} onClick={() => setFilterDate(r)} color={filterDate === r ? "primary" : "secondary"} outline style={{ padding: 3 }} size="sm">
              {r}
            </Button>
          ))}
        </div>
      ) : (
        false
      )}
    </div>
  )
}

export default injectIntl(Sider)
