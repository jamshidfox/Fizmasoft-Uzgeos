import React from "react"
import { IoClose } from "react-icons/io5"

const ClearAllFilterButton = ({ handleClearAllFilter, clearAllButtonFilter }) => {
  return (
    <button
      onClick={handleClearAllFilter}
      className="btn btn-default"
      style={{ padding: "3px", position: "absolute", top: "0px", right: "10px", color: "white", backgroundColor: "#7367F0", visibility: clearAllButtonFilter ? "visible" : "hidden" }}
    >
      <IoClose />
    </button>
  )
}

export default ClearAllFilterButton
