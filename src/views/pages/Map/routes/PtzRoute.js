// ** React
import React, { useState, useEffect } from "react"

// ** Third Part
import { FormGroup, Input } from "reactstrap"
import { Tooltip } from "antd"
import { injectIntl } from "react-intl"

// ** Custom components
import CustomTable from "../../../components/table"

// ** Icons
import { ZoomIn, ZoomOut, CheckCircle, Circle } from "react-feather"

import { useSelector, useDispatch } from "react-redux"
import { handleGetPtz, handleAllVisibility, handleDeleteAll, handleZoomed, handleZoomCancel, handleSelectedPtz, handleFilterPtzData } from "../store/actions/ptz.js"
import { handleAllRadarZoomCancel, handleAllSelectedRadarZoomCancel, handleSelectedRadar } from "../store/actions/radar"
import { handleAllCrossroadZoomCancel, handleAllSelectedCrossroadZoomCancel, handleSelectedCrossroad } from "../store/actions/crossroad"
import { handleAllPerimetreZoomCancel, handleAllSelectedPerimetreZoomCancel, handleSelectedPerimetr } from "../store/actions/perimeter"
import { handleAllInspektorZoomCancel, handleAllSelectedInspektorZoomCancel, handleSelectedInspektorlar } from "../store/actions/inspektorlar"

// ptz
const RadarRoute = ({ intl }) => {
  const [tableData, setTableData] = useState([])
  const [allSelected, setAllSelected] = useState(true)
  const [loading, setLoading] = useState(false)

  const camera = useSelector((state) => state.camera)
  const ptzState = useSelector((state) => state.ptz.data)
  const selectedPtz = useSelector((state) => state.selectedReducer.selectedPtz)

  const searchInputPlaceHolder = intl.formatMessage({ id: "MapSearchInputPlaceholder" })

  const dispatch = useDispatch()

  const toggleAllVisibility = (cond) => {
    setAllSelected(cond)
    const changedData = ptzState.map((d) => ({ ...d, selected: cond }))
    dispatch(handleSelectedPtz(changedData))
    dispatch(handleAllVisibility(changedData))
  }

  const handleRowClick = (data, index, state) => {
    const filteredData = state
    filteredData[index] = { ...data, selected: !data.selected }
    dispatch(handleSelectedPtz([...filteredData]))
    dispatch(handleAllVisibility([...filteredData]))
  }

  const handleZoomClick = async (index, state) => {
    // ** Selected datas
    await dispatch(handleAllSelectedRadarZoomCancel())
    await dispatch(handleAllSelectedPerimetreZoomCancel())
    await dispatch(handleAllSelectedCrossroadZoomCancel())
    await dispatch(handleAllSelectedInspektorZoomCancel())

    // ** orginal datas
    await dispatch(handleAllRadarZoomCancel())
    await dispatch(handleAllPerimetreZoomCancel())
    await dispatch(handleAllCrossroadZoomCancel())
    await dispatch(handleAllInspektorZoomCancel())

    const filteredData = state.map((s, i) => {
      return i === index ? { ...s, zoomed: true } : { ...s, zoomed: false }
    })
    dispatch(handleSelectedPtz([...filteredData]))
    dispatch(handleZoomed([...filteredData]))
  }

  const handleMouseEnter = (data, index, state) => {
    const filteredData = state
    filteredData[index] = { ...data, hovered: true }
    dispatch(handleSelectedPtz([...filteredData]))
  }
  const handleMouseLeave = (data, index, state) => {
    const filteredData = state
    filteredData[index] = { ...data, hovered: false }
    dispatch(handleSelectedPtz([...filteredData]))
  }

  const prepareData = (state) => {
    const readyData = state.map((d, i) => {
      return {
        onClick: () => handleRowClick(d, i, state),
        online: d.is_online,
        id: d.id,
        name: d,
        index: i,
        data: state,
        title: (
          <>
            {d.selected ? <CheckCircle size={16} onClick={() => handleRowClick(d, i, state)} color="#6e62ee" /> : <Circle size={16} onClick={() => handleRowClick(d, i, state)} />}{" "}
            <Tooltip title={d.title}>{d.title.length > 10 ? `${d.title.slice(0, 15)}...` : d.title}</Tooltip>
          </>
        ),
        type: d.camera_type,
        status: (
          <div>
            {d.zoomed ? (
              <ZoomOut
                size={16}
                onClick={() => {
                  dispatch(handleZoomCancel(state.map((s) => ({ ...s, zoomed: false }))))
                  dispatch(handleSelectedPtz(state.map((s) => ({ ...s, zoomed: false }))))
                }}
                color="#6e62ee"
                className="ml-1"
              />
            ) : (
              <ZoomIn size={16} onClick={() => handleZoomClick(i, state)} className="ml-1" />
            )}
          </div>
        )
      }
    })
    return readyData
  }

  useEffect(async () => {
    if (camera.ptz) {
      setLoading(true)
      await dispatch(handleGetPtz())
      setLoading(false)
    } else {
      dispatch(handleDeleteAll())
      dispatch(handleSelectedPtz([]))
    }
  }, [camera])

  // useEffect(() => {
  //   if (camera.ptz) {
  //     dispatch(handleGetPtz(selectedPtz))
  //   } else {
  //     dispatch(handleSelectedPtz([]))
  //   }
  // }, [camera.ptz && selectedPtz])

  useEffect(() => {
    const readyData = prepareData(ptzState)
    setTableData(readyData)
  }, [ptzState])

  const columns = [
    {
      title: (
        <>
          {allSelected ? <CheckCircle color="#6e62ee" size={16} onClick={() => toggleAllVisibility(false)} /> : <Circle size={16} onClick={() => toggleAllVisibility(true)} />}
          {intl.formatMessage({ id: "PtzTableName" })}
        </>
      ),
      name: "title",
      key: "title"
    },

    {
      title: intl.formatMessage({ id: "PtzTableCamera" }),
      name: "type",
      key: "type"
    },
    {
      title: intl.formatMessage({ id: "PtzTableStatus" }),
      name: "status",
      key: "status"
    }
  ]

  const renderColumns = () => {
    return columns.map((column, index) => {
      return <th key={column.key}>{column.title} </th>
    })
  }

  const renderRows = () => {
    return tableData.map((td) => (
      <tr
        style={td.name?.zoomed ? { background: "rgb(115,103,240,0.5)", color: "#fff" } : {}}
        onMouseEnter={() => handleMouseEnter(td.name, td.index, td.data)}
        onMouseLeave={() => handleMouseLeave(td.name, td.index, td.data)}
        key={td.id}
      >
        <td>{td.title}</td>
        <td>{td.type}</td>
        <td>{td.status}</td>
      </tr>
    ))
  }
  const handleSearchPtz = (e) => {
    const value = e.target.value
    if (value.length !== 0) {
      const filtered = ptzState.filter((r) => r.title.toLowerCase().includes(value.toLowerCase()))
      dispatch(handleFilterPtzData(filtered))
      dispatch(handleSelectedPtz(filtered))
    } else {
      dispatch(handleGetPtz())
      dispatch(handleSelectedPtz([]))
    }
  }

  return camera.ptz ? (
    <>
      <FormGroup>
        <Input type="text" id="gpsSearch" placeholder={searchInputPlaceHolder} onChange={(val) => handleSearchPtz(val)} />
      </FormGroup>
      <CustomTable loading={loading} size="sm" pagination={false} columns={renderColumns} rows={renderRows} />
    </>
  ) : null
}

export default injectIntl(RadarRoute)
