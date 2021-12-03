import { useState } from "react"
import { Button } from "reactstrap"
import DateSelector from "../Components/DateSelector"
import Sider from "../Components/Sider"
import Filter from "./Filter"

const Vehicle = () => {
  return (
    <div>
      <Sider mapHeight={390}>
        <Button size="sm" disabled color="primary">
          By Property
        </Button>
        <Filter />
        <DateSelector />
      </Sider>
    </div>
  )
}

export default Vehicle
