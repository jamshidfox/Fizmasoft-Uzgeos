import React from "react"
import { Filter } from "react-feather"
import { Button } from "reactstrap"

const CarFilterIcon = ({ setInputVisible, inputVisible }) => {
  return (
    <Button.Ripple onClick={() => setInputVisible(true)} size="sm" className="btn-icon ml-1" color={inputVisible ? "flat-primary" : "flat"}>
      <Filter size={16} />
    </Button.Ripple>
  )
}

export default CarFilterIcon
