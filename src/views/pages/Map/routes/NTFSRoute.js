// ** React
import React, { useState } from "react"

// ** Third Part
import { FormGroup, Input } from "reactstrap"

// ** Tree Select
import CustomTreeSelect from "../../../components/treeSelect/"


// ** Store & Reducer
import { useSelector } from "react-redux"

const NTFSRoute = () => {
  const regionList = useSelector((state) => state.groupSettings.region_list)

  const [selectedRegion, setSelectedRegion] = useState([])

  const handleChangeSelectedRegion = (params) => {
    const selectedNodes = []
    params.forEach((sn) => {
      if (typeof sn !== "string") {
        return selectedNodes.push(sn)
      }
    })
    setSelectedRegion(selectedNodes)
  }
  return (
    <div>
      <FormGroup>
        <Input type="text" id="gpsSearch" placeholder="Номини киритинг" />
      </FormGroup>
      <CustomTreeSelect data={regionList} onChange={handleChangeSelectedRegion} />
    </div>
  )
}

export default NTFSRoute
