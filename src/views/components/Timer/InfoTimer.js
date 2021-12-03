import React from "react"

const InfoTimer = ({ intl, startDate, resultDate, endDate, name }) => {
  return (
    <div>
      <p style={{ fontWeight: "bold", margin: "0px", fontSize: "16px" }}>{name}</p>

      <p style={{ lineHeight: "15px" }} className="m-0">
        {intl.formatMessage({ id: "LochinKozSearchStartTime" })}
        {" - "}
        {startDate}
      </p>
      <p style={{ lineHeight: "15px" }} className="m-0">
        {intl.formatMessage({ id: "LochinKozSearchEndTime" })}
        {" - "}
        {endDate}
      </p>
      <p style={{ lineHeight: "15px" }} className="m-0">
        {intl.formatMessage({ id: "RequestTimer" })}
        {" - "}
        {resultDate}
      </p>
    </div>
  )
}

export default InfoTimer
