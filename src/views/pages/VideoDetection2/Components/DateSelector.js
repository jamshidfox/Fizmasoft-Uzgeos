import "@styles/react/libs/flatpickr/flatpickr.scss"
import Cleave from "cleave.js/react"
import moment from "moment"
import { useState } from "react"
import DateInput from "../../../components/DateTimeInput"

const dateFormat = "DD.MM.YYYY HH:mm"

const DateSelector = ({ startDate, endDate, setStartDate, setEndDate }) => {
  const [sdate, setSdate] = useState(startDate)
  const [edate, setEdate] = useState(endDate)
  const setDate = (date1, date2) => {
    if (date2) {
      setEdate(date2)
      if (moment(date2, dateFormat).isValid()) setEndDate(moment(date2, dateFormat))
    }
    if (date1) {
      setSdate(date1)
      if (moment(date1, dateFormat).isValid()) setStartDate(moment(date1, dateFormat))
    }
  }
  return (
    <div style={{ width: "85%", margin: "20px 5px" }}>
      <DateInput value={sdate} onChange={(e) => setDate(e, null)} />
      <DateInput value={edate} onChange={(e) => setDate(null, e)} />

      {/* <Cleave
        className="form-control"
        style={{ width: "100%", height: 37 }}
        value={sdate}
        options={{
          delimiters: [".", ".", " ", ":"],
          blocks: [2, 2, 4, 2, 2],
          uppercase: true
        }}
        onChange={(e) => setDate(e.target.value, null)}
      />
      <Cleave
        className="form-control"
        style={{ width: "100%", height: 37 }}
        value={edate}
        options={{
          delimiters: [".", ".", " ", ":"],
          blocks: [2, 2, 4, 2, 2],
          uppercase: true
        }}
        onChange={(e) => setDate(null, e.target.value)}
      /> */}
    </div>
  )
}

export default DateSelector
