import { useState } from "react"
import { Button, ButtonGroup } from "reactstrap"
import DateSelector from "../Components/DateSelector"
import ImageUpload from "../Components/ImageUpload"
import ProgressBar from "../Components/ProgessBar"
import Sider from "../Components/Sider"
import Filter from "./Filter"
import videoDetectionApi from "../api"
import moment from "moment"
import FoundCard from "./FoundCard"
import { injectIntl } from "react-intl"
import NoData from "../../../components/NoData"

const Face = ({ intl }) => {
  const [isImage, setIsImage] = useState(true)
  const [image, setImage] = useState(null)
  const [startDate, setStartDate] = useState(new Date(new Date().setDate(new Date().getDate() - 1)))
  const [endDate, setEndDate] = useState(new Date())
  const [loading, setLoading] = useState(false)
  const [resultData, setResultData] = useState(null)
  const [similarity, setSimilarity] = useState(70)
  const [channel, setChannel] = useState(1)

  const sendData = async () => {
    if (isImage && image) {
      setLoading(true)
      const { data } = await videoDetectionApi.getFaceByImage({
        similarity,
        channel,
        photo: image,
        start: moment(startDate).format("YYYY-MM-DDTHH:mm:ss"),
        end: moment(endDate).format("YYYY-MM-DDTHH:mm:ss")
      })
      setLoading(false)
      setResultData(data.Data)
    }
  }
  return (
    <div className="d-flex">
      <div>
        <Sider mapHeight={isImage ? 220 : 370}>
          <ButtonGroup size="sm" className="mb-1">
            <Button size="sm" color="primary" onClick={() => setIsImage(false)} active={!isImage}>
              {intl.formatMessage({ id: "By Property" })}
            </Button>
            <Button size="sm" color="primary" onClick={() => setIsImage(true)} active={isImage}>
              {intl.formatMessage({ id: "By Image" })}
            </Button>
          </ButtonGroup>
          {isImage ? <ImageUpload exportBase64={setImage} /> : <Filter />}
          {isImage ? <ProgressBar setSimilarity={setSimilarity} similarity={similarity} image={image} /> : false}
          <DateSelector loading={loading} onSubmit={sendData} startDate={startDate} endDate={endDate} setEndDate={setEndDate} setStartDate={setStartDate} channel={channel} setChannel={setChannel} />
        </Sider>
      </div>
      <div className="d-flex flex-wrap justify-content-evently" style={{ marginLeft: 255 }}>
        {resultData ? resultData.map((d, i) => <FoundCard key={i} data={d} />) : <NoData style={{ height: "81vh", width: "72vw" }} />}
      </div>
    </div>
  )
}

export default injectIntl(Face)
