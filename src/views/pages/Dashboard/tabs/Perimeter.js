import ByDistricts from "../maleculas/perimeter/ByDistricts"
import DailyAll from "../maleculas/perimeter/DailyAll"
import { FormGroup, Button, Spinner } from "reactstrap"
import { useState } from "react"
import moment from "moment"
import { injectIntl } from "react-intl"
import validateDate from "../../VideoDetection2/Components/dateValidator"
import { toast } from "react-toastify"
import DateInput from "../../../components/DateTimeInput"
const format = "DD.MM.YYYY HH:mm:ss"

const Perimeter = ({ intl, active }) => {
  const [startDate, setStartDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)))
  const [endDate, setEndDate] = useState(new Date(new Date().setHours(23, 59, 59, 59)))
  const [sendDate, setSendDate] = useState([moment(new Date().setHours(0, 0, 0, 0)).format("DD.MM.YYYY HH:mm:ss"), moment(new Date().setHours(23, 59, 59, 59)).format("DD.MM.YYYY HH:mm:ss")])
  const [loading, setLoading] = useState(false)
  const [loadingDistrict, setLoadingDistrict] = useState(false)

  // timer
  const [dayTimer, setDayTimer] = useState(null)
  const [regionTimer, setRegionTimer] = useState(null)

  const handleStartDateChange = (e) => {
    setStartDate(e)
  }

  const handleEndDateChange = (e) => {
    setEndDate(e)
  }
  const handleSubmit = () => {
    setRegionTimer(false)
    setDayTimer(false)
    const start = moment(startDate).format(format)
    const end = moment(endDate).format(format)
    if (!validateDate([start, end])) {
      return toast.error(intl.formatMessage({ id: "TimeIntervalError" }))
    } else {
      setLoading(true)
      setLoadingDistrict(true)
      setSendDate([start, end])
    }
  }
  return (
    <div style={{ height: "100%" }}>
      <div className="d-flex justify-content-end">
        <FormGroup style={{ margin: "0px 10px", height: "0px" }}>
          <DateInput value={startDate} onChange={handleStartDateChange} />
        </FormGroup>
        <FormGroup style={{ margin: "0px 10px", height: "0px" }}>
          <DateInput value={endDate} onChange={handleEndDateChange} />
        </FormGroup>
        <Button onClick={handleSubmit} color="primary">
          {loading ? <Spinner size="sm" /> : intl.formatMessage({ id: "DashSend" })}
        </Button>
      </div>
      <div style={{ height: "35%" }}>
        <DailyAll setDayTimer={setDayTimer} dayTimer={dayTimer} active={active} sendDate={sendDate} setLoading={setLoading} />
      </div>
      <div style={{ height: "55%", marginTop: 80 }}>
        <ByDistricts setRegionTimer={setRegionTimer} regionTimer={regionTimer} active={active} sendDate={sendDate} loadingDistrict={loadingDistrict} setLoadingDistrict={setLoadingDistrict} />
      </div>
    </div>
  )
}

export default injectIntl(Perimeter)
