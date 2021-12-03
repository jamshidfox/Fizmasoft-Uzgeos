import React from "react"
import { IoClose } from "react-icons/io5"

const ClearFilterButton = ({ handleClearFilter }) => {
  return (
    <div className="input-group-btn" data-dismiss="alert">
      <button onClick={handleClearFilter} className="btn btn-default" style={{ padding: 0, marginLeft: "5px", height: "32px" }}>
        <IoClose />
      </button>
    </div>
  )
}

export default ClearFilterButton
