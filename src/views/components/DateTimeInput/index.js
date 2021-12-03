import DateTimePicker from "react-datetime-picker/dist/entry.nostyle"
import "./styles/dateTimePicker.css"
import "./styles/calendar.css"
import { useSelector } from "react-redux"
import { Calendar, X } from "react-feather"

const DateInput = ({ value, onChange, calendar = true, clear = true }) => {
  const skin = useSelector((state) => state.layout.isSkinChange)
  return (
    <DateTimePicker
      format="d.MM.y HH:mm:ss"
      value={value}
      onChange={onChange}
      minDate={new Date(2000, 1, 1)}
      maxDate={new Date(new Date().setHours(29, 59, 59))}
      clearIcon={clear ? <X size={17} /> : null}
      calendarIcon={calendar ? <Calendar size={17} /> : null}
      calendarClassName="card"
      className={`form-control ${skin === "dark" ? "text-light" : "text-dark"} `}
      disableClock={true}
      locale="ru"
    />
  )
}

export default DateInput
