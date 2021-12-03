const getParsedDate = (data) => {
  const [date] = data.split(" ")
  const [d, mon, y] = date.split(".")
  return { d: +d, mon: +mon, y: +y }
}

const validateEachField = ({ d, mon, y, h, min }) => {
  if (d < 1 || d > 31 || isNaN(+d) || mon < 1 || mon > 12 || isNaN(+mon) || y < 2000 || y > new Date().getFullYear() || isNaN(+y)) {
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
    }
  }
  return valid
}

export default (dates) => {
  const startDates = getParsedDate(dates[0])
  const endDates = getParsedDate(dates[1])
  return validateEachField(startDates) && validateEachField(endDates) && compareStartEnd(startDates, endDates)
}
