import React from "react"
import { TiExport } from "react-icons/ti"
import { injectIntl } from "react-intl"

const Total = ({ data, intl, selected }) => {
  return (
    <div className="d-flex justify-content-between" style={{ margin: "0 20px 5px 0", fontWeight: "bold" }}>
      <div className="d-flex align-items-center">
        {intl.formatMessage({ id: "SelectedCard" })} - {selected} <TiExport style={{ width: "18px", height: "18px", marginLeft: "10px", cursor: "pointer" }} />
      </div>
      <div>
        {intl.formatMessage({ id: "TableTotal" })} {" - "}
        {data && data.length}
      </div>
    </div>
  )
}

export default injectIntl(Total)
