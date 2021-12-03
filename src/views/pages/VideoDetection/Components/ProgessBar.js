import React, { useState } from "react"
import Input from "reactstrap/lib/Input"

const ProgessBar = ({ similarity, setSimilarity, image }) => {
  return (
    <div className={image ? "block text-center" : "d-none"} style={{ margin: "0px 0 0 0", fontWeight: "bold" }}>
      <label htmlFor="customRange2" className="form-label">
        {`${similarity} %`}
      </label>
      <Input onChange={(e) => setSimilarity(+e.target.value)} type="range" className="form-range" min="0" max="100" value={similarity} id="customRange2"></Input>
    </div>
  )
}

export default ProgessBar
