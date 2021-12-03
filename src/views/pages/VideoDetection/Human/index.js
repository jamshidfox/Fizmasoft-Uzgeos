import { useState } from "react"
import { injectIntl } from "react-intl"
import { Button, ButtonGroup } from "reactstrap"
import DateSelector from "../Components/DateSelector"
import ImageUpload from "../Components/ImageUpload"
import Sider from "../Components/Sider"
import Filter from "./Filter"
import videoDetectionApi from "../api"
import moment from "moment"
import FoundCard from "./FoundCard"
import PerfectScrollBar from "react-perfect-scrollbar"
import NoData from "../../../components/NoData"

const Human = ({ intl }) => {
  const [isImage, setIsImage] = useState(true)
  const [image, setImage] = useState(null)
  const [filters, setFilters] = useState(null)
  const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 1)))
  const [endDate, setEndDate] = useState(new Date())
  const [resultData, setResultData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [channel, setChannel] = useState(0)
  const byFaceAll = true

  const sendData = async () => {
    setLoading(true)
    if (!isImage) {
      const { data } = await videoDetectionApi.getHumanByParams({ ...filters, channel, start: moment(startDate).format("YYYY-MM-DDTHH:mm:ss"), end: moment(endDate).format("YYYY-MM-DDTHH:mm:ss") })
      setResultData(data.Data)
    }
    setLoading(false)
  }

  return (
    <div className="d-flex">
      <div>
        <Sider mapHeight={isImage ? 220 : 290}>
          <ButtonGroup size="sm" className="mb-1">
            <Button size="sm" color="primary" onClick={() => setIsImage(false)} active={!isImage}>
              {intl.formatMessage({ id: "By Property" })}
            </Button>
            <Button size="sm" color="primary" onClick={() => setIsImage(true)} active={isImage}>
              {intl.formatMessage({ id: "By Image" })}
            </Button>
          </ButtonGroup>
          {isImage ? <ImageUpload exportBase64={setImage} /> : <Filter setFilters={setFilters} />}
          <DateSelector
            loading={loading}
            onSubmit={sendData}
            startDate={startDate}
            endDate={endDate}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
            channel={channel}
            setChannel={setChannel}
            byFaceAll={byFaceAll}
          />
        </Sider>
      </div>
      <div className=" d-flex flex-wrap justify-content-evently" style={{ marginLeft: 255 }}>
        {resultData ? resultData.map((d, i) => <FoundCard key={i} gender={filters.gender} data={d} />) : <NoData style={{ height: "81vh", width: "72vw" }} />}
      </div>
    </div>
  )
}

export default injectIntl(Human)
