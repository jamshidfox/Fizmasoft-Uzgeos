// ** React
import React, { useEffect, useState } from "react"

// ** Third Part
import { FormGroup, Input, CustomInput } from "reactstrap"

// ** Tree Select
import CustomTreeSelect from "../../../components/treeSelect/"
import { getRegionList } from "../../Groups/store/actions/"
// ** Store & Reducer
import { useSelector, useDispatch } from "react-redux"

const VideoRoute = () => {
  const regionList = useSelector((state) => state.groupSettings.region_list)
  const dispatch = useDispatch()
  const [videoStatus, setVideoStatus] = useState(false)

  useEffect(() => {
    dispatch(getRegionList())
  }, [])

  const handleStatusChange = () => {
    setVideoStatus((videoStatus) => !videoStatus)
  }

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
      <div className="d-flex justify-content-end mb-1">
        {videoStatus ? <h5>Live видео</h5> : <h5>Видео архив</h5>}{" "}
        <CustomInput value={videoStatus} onChange={() => handleStatusChange()} className="ml-1" type="switch" id="switch-primary" name="primary" inline defaultChecked />
      </div>
      <FormGroup>
        <Input type="text" id="gpsSearch" placeholder="Номини киритинг" />
      </FormGroup>
      <CustomTreeSelect data={regionList} onChange={handleChangeSelectedRegion} />
    </div>
  )
}

export default VideoRoute
