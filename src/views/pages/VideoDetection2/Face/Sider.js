import { useEffect, useState } from "react"
import { injectIntl } from "react-intl"
import { Button, ButtonGroup, Spinner } from "reactstrap"
import DateSelector from "../Components/DateSelector"
import Devices from "../Components/Devices"
import ImageUpload from "../Components/ImageUpload"
import Filter from "./Filter"
import moment from "moment"
import { toast } from "react-toastify"
import validateDate from "../Components/dateValidator"

import { setDevices, setFaceImgResults, setFaceParamResults, setTabs } from "../store/actions"
import { useSelector, useDispatch } from "react-redux"

const tabId = 1

const getDates = (data) => {
  const dates = []
  let a
  data.forEach((d) => {
    a = moment(d.start_time).format("DD.MM.YYYY")
    if (!dates.includes(a)) dates.push(a)
  })
  return dates
}

const Sider = ({ intl, exportResult }) => {
  const [isImage, setIsImage] = useState(true)
  const [resultData, setResultData] = useState([])
  const [image, setImage] = useState(null)
  const [startDate, setStartDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)))
  const [endDate, setEndDate] = useState(new Date(new Date().setHours(23, 59)))
  const [loading, setLoading] = useState(false)
  const [similarity, setSimilarity] = useState(75)
  const [filterDate, setFilterDate] = useState(null)
  const [channel, setChannel] = useState(null)
  const [apiData, setApiData] = useState(useSelector((state) => state.videoDetectionReducer.faceResults))
  const externalTab = useSelector((state) => state.videoDetectionReducer.activeTab)
  const externalFace = useSelector((state) => state.videoDetectionReducer.videoDetectionFace)
  const externalChannel = useSelector((state) => state.videoDetectionReducer.channel)
  const devices = useSelector((state) => state.videoDetectionReducer.devices)

  const dispatch = useDispatch()
  const sendData = async (externalImg, externalChannel) => {
    if (!validateDate([moment(startDate).format("DD.MM.YYYY HH:mm"), moment(endDate).format("DD.MM.YYYY HH:mm")])) return toast.error("Vaqt oralig'i noto'g'ri kiritilgan")
    if (isImage || externalImg) {
      if (!image) return
      setLoading(true)
      const { data } = await dispatch(
        setFaceImgResults({
          similarity,
          channel: externalChannel ? externalChannel : channel,
          photo: externalImg ? externalImg : image,
          start: moment(startDate).format("YYYY-MM-DDTHH:mm:ss"),
          end: moment(endDate).format("YYYY-MM-DDTHH:mm:ss")
        })
      )
      if (data) {
        setApiData(data)
      }
    } else {
      setLoading(true)
      const { data } = await dispatch(
        setFaceParamResults({
          channel: externalChannel ? externalChannel : channel,
          start: moment(startDate).format("YYYY-MM-DDTHH:mm:ss"),
          end: moment(endDate).format("YYYY-MM-DDTHH:mm:ss")
        })
      )
      if (data) {
        setApiData(data)
      }
      setLoading(true)
    }
    dispatch(setTabs(null))
    dispatch(setDevices(null))
    setLoading(false)
  }

  useEffect(() => {
    if (!externalTab || externalTab !== tabId || !externalChannel) return
    setImage(externalFace)
    setIsImage(true)
    setApiData([])
    setFilterDate(null)
    setChannel(externalChannel)
    sendData(externalFace, externalChannel)
  }, [externalTab, externalFace])

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
        {isImage && <ImageUpload img={image} setImg={setImage} setSimilarity={setSimilarity} similarity={similarity} />}
        {devices ? <Devices treeData={devices.map((d) => ({ ...d, key: `${d.channel}face` }))} setChannel={setChannel} /> : <Spinner />}
        {!isImage && <Filter />}
        <DateSelector startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
        <Button disabled={!channel} onClick={() => sendData()} outline style={{ width: "85%", margin: "10px 15px 0 5px", position: "absolute", bottom: 5 }}>
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
            <Button disabled key={r} onClick={() => setFilterDate(r)} color={filterDate === r ? "primary" : "secondary"} outline style={{ padding: 3 }} size="sm">
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
