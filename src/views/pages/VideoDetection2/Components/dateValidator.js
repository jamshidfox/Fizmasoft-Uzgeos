const getParsedDate = (data) => {
  const [date, time] = data.split(" ")
  const [d, mon, y] = date.split(".")
  const [h, min] = time.split(":")
  return { d: +d, mon: +mon, y: +y, h: +h, min: +min }
}

const validateEachField = ({ d, mon, y, h, min }) => {
  if (
    d < 1 ||
    d > 31 ||
    isNaN(+d) ||
    mon < 1 ||
    mon > 12 ||
    isNaN(+mon) ||
    y < 2000 ||
    y > new Date().getFullYear() ||
    isNaN(+y) ||
    h < 0 ||
    h > 23 ||
    isNaN(+h) ||
    min < 0 ||
    min > 59 ||
    isNaN(+min)
  ) {
    return false
  } else return true
}

const compareStartEnd = (start, end) => {
  let valid = false
  if (start.y < end.y) valid = true
  else if (start.y === end.y) {
    if (start.mon < end.mon) valid = true
    else if (start.mon === end.mon) {
      if (start.d < end.d) valid = true
      else if (start.d === end.d) {
        if (start.h < end.h) valid = true
        else if (start.h === end.h) {
          if (start.min <= end.min) {
            valid = true
          }
        }
      }
    }
  }
  return valid
}

export default (dates) => {
  const startDates = getParsedDate(dates[0])
  const endDates = getParsedDate(dates[1])
  return validateEachField(startDates) && validateEachField(endDates) && compareStartEnd(startDates, endDates)
}
