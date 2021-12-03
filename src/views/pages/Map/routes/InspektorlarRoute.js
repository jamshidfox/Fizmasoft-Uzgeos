// ** React
import React, { useState, useEffect } from "react"

// ** Third Part
import { Row, Col, CustomInput, FormGroup, Input } from "reactstrap"
import moment from "moment"
import { Tooltip } from "antd"
import { injectIntl } from "react-intl"

// ** Custom components
import CustomTable from "../../../components/table"

// ** JWT config
import useJwt from "@src/auth/jwt/useJwt"
const config = useJwt.jwtConfig

// ** Icons
import { ZoomIn, ZoomOut, CheckCircle, Circle, Clock } from "react-feather"
import { MdBattery20, MdBattery50, MdBatteryAlert, MdBatteryFull } from "react-icons/md"

import { useSelector, useDispatch } from "react-redux"
import {
  handleGetInspektors,
  handleAllVisibility,
  handleDeleteAll,
  handleZoomed,
  handleZoomCancel,
  handleSelectedInspektorlar,
  handleInspektroFinalStatus,
  handleFilterInspektorData
} from "../store/actions/inspektorlar"

// ** Tree Select
import CustomTreeSelect from "../../../components/treeSelect/"
import { getRegionList } from "../../Groups/store/actions/"

import { onTimerStart } from "../../../../@core/auth/jwt/jwtService"
import { handleAllCrossroadZoomCancel, handleAllSelectedCrossroadZoomCancel } from "../store/actions/crossroad"
import { handleAllPerimetreZoomCancel, handleAllSelectedPerimetreZoomCancel } from "../store/actions/perimeter"
import { handleAllPtzZoomCancel, handleAllSelectedPtzZoomCancel } from "../store/actions/ptz"
import { handleAllRadarZoomCancel, handleAllSelectedRadarZoomCancel } from "../store/actions/radar"

const InpektorRoute = ({ intl }) => {
  const [tableData, setTableData] = useState([])
  const [total, setTotal] = useState(0)
  const [allSelected, setAllSelected] = useState(true)
  const [loading, setLoading] = useState(false)

  const gps = useSelector((state) => state.gps)
  const InspektorState = useSelector((state) => state.inspektor.data)
  const InspektorStatus = useSelector((state) => state.inspektor.finished)
  const selectedInspektor = useSelector((state) => state.selectedReducer.selectedInspektor)
  const regionList = useSelector((state) => state.groupSettings.region_list)

  const [selectedRegion, setSelectedRegion] = useState([])

  const searchInputPlaceHolder = intl.formatMessage({ id: "MapSearchInputPlaceholder" })

  const dispatch = useDispatch()

  const handleGetBatteryIcon = (battery) => {
    if (battery >= 100) {
      return <MdBatteryFull style={{ fontSize: 25, color: "green" }} />
    } else if (battery >= 50) {
      return <MdBattery50 style={{ fontSize: 25, color: "green" }} />
    } else if (battery >= 20) {
      return <MdBattery20 style={{ fontSize: 25, color: "green" }} />
    } else {
      return <MdBatteryAlert style={{ fontSize: 25, color: "red" }} />
    }
  }

  useEffect(() => {
    dispatch(getRegionList())
  }, [])

  const toggleAllVisibility = (cond) => {
    setAllSelected(cond)
    const changedData = InspektorState.map((d) => ({ ...d, selected: cond }))
    dispatch(handleSelectedInspektorlar(changedData))
    dispatch(handleAllVisibility(changedData))
  }

  const handleRowClick = (data, index, state) => {
    const filteredData = state
    filteredData[index] = { ...data, selected: !data.selected }
    dispatch(handleSelectedInspektorlar([...filteredData]))
    dispatch(handleAllVisibility([...filteredData]))
  }

  const handleZoomClick = async (index, state) => {
    // ** Selected datas
    await dispatch(handleAllSelectedRadarZoomCancel())
    await dispatch(handleAllSelectedPerimetreZoomCancel())
    await dispatch(handleAllSelectedCrossroadZoomCancel())
    await dispatch(handleAllSelectedPtzZoomCancel())

    // ** orginal datas
    await dispatch(handleAllRadarZoomCancel())
    await dispatch(handleAllPerimetreZoomCancel())
    await dispatch(handleAllCrossroadZoomCancel())
    await dispatch(handleAllPtzZoomCancel())

    const filteredData = state.map((s, i) => {
      return i === index ? { ...s, zoomed: true } : { ...s, zoomed: false }
    })
    dispatch(handleSelectedInspektorlar([...filteredData]))
    dispatch(handleZoomed([...filteredData]))
  }

  const handleMouseEnter = (data, index, state) => {
    const filteredData = state
    filteredData[index] = { ...data, hovered: true }
    dispatch(handleSelectedInspektorlar([...filteredData]))
  }
  const handleMouseLeave = (data, index, state) => {
    const filteredData = state
    filteredData[index] = { ...data, hovered: false }
    dispatch(handleSelectedInspektorlar([...filteredData]))
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

  const prepareData = (state) => {
    let totalCount = 0
    let date
    const readyData = state.map((d, i) => {
      totalCount += parseInt(state.length)
      date = moment(d.last_update).format("DD.MM.YYYY HH:mm")
      return {
        onClick: () => handleRowClick(d, i, state),
        online: d.is_online,
        id: d.id,
        name: d,
        index: i,
        data: state,
        full_name: (
          <>
            {d.selected ? <CheckCircle size={16} onClick={() => handleRowClick(d, i, state)} color="#6e62ee" /> : <Circle size={16} onClick={() => handleRowClick(d, i, state)} />}
            <Tooltip title={d.full_name}>
              <span className="ml-1">{d.full_name.length > 10 ? `${d.full_name.slice(0, 8)}...` : d.full_name}</span>
            </Tooltip>
          </>
        ),
        battery: d.battery ? <Tooltip title={`${d.battery}%`}>{handleGetBatteryIcon(d.battery)}</Tooltip> : "",
        speed: d.speed,

        date: (
          <>
            <Tooltip title={d.date_time}>
              <Clock size={16} color="#6e62ee" />
            </Tooltip>
            {d.zoomed ? (
              <ZoomOut
                size={16}
                onClick={() => {
                  dispatch(handleZoomCancel(state.map((s) => ({ ...s, zoomed: false }))))
                  dispatch(handleSelectedInspektorlar(state.map((s) => ({ ...s, zoomed: false }))))
                }}
                color="#6e62ee"
                className="ml-1"
              />
            ) : (
              <ZoomIn size={16} onClick={() => handleZoomClick(i, state)} className="ml-1" />
            )}
          </>
        )
      }
    })
    return [totalCount, readyData]
  }

  useEffect(async () => {
    if (gps.inspektor) {
      setLoading(true)
      await dispatch(handleGetInspektors(selectedInspektor))
      setLoading(false)
    } else {
      dispatch(handleDeleteAll())
      dispatch(handleInspektroFinalStatus())
      dispatch(handleSelectedInspektorlar([]))
    }
  }, [gps])

  useEffect(() => {
    if (InspektorStatus && gps.inspektor) {
      const time = onTimerStart(config.timer, () => dispatch(handleGetInspektors(selectedInspektor)))
      return () => clearInterval(time)
    } else {
      dispatch(handleInspektroFinalStatus())
      dispatch(handleSelectedInspektorlar([]))
    }
  }, [InspektorStatus && selectedInspektor])

  useEffect(() => {
    const [totalCount, readyData] = prepareData(InspektorState)
    setTotal(InspektorState.length)
    setTableData(readyData)
  }, [InspektorState])

  const columns = [
    {
      title: (
        <>
          {allSelected ? <CheckCircle color="#6e62ee" size={16} onClick={() => toggleAllVisibility(false)} /> : <Circle size={16} onClick={() => toggleAllVisibility(true)} />}{" "}
          {intl.formatMessage({ id: "InspektorTableName" })}
        </>
      ),
      name: "Fullname",
      key: "fullname"
    },
    {
      title: intl.formatMessage({ id: "InspektorTableSpeed" }),
      name: "тезлик",
      key: "speed"
    },
    {
      title: intl.formatMessage({ id: "InspektorTableBattery" }),
      name: "Battery",
      key: "battery"
    },
    {
      title: intl.formatMessage({ id: "InspektorTableDate" }),
      name: "date_time",
      key: "date_time"
    }
  ]

  const renderColumns = () => {
    return columns.map((column, index) => {
      return <th key={column.name}>{column.title} </th>
    })
  }

  const renderRows = () => {
    const data = tableData.map((td) => (
      <tr onMouseEnter={() => handleMouseEnter(td.name, td.index, td.data)} onMouseLeave={() => handleMouseLeave(td.name, td.index, td.data)} className={td.online ? "table-success" : ""} key={td.id}>
        <td>{td.full_name}</td>
        <td style={{ textAlign: "center" }}>{Number(td.speed).toFixed(0)}</td>
        <td style={{ textAlign: "center" }}>{td.battery}</td>
        <td style={{ textAlign: "end" }}>{td.date}</td>
      </tr>
    ))
    data.push(
      <tr key="all">
        <td>
          <span style={{ fontWeight: "bold" }}>{intl.formatMessage({ id: "TableTotal" })}:</span>
        </td>
        <td style={{ textAlign: "end" }} colSpan={3}>
          <span style={{ fontWeight: "bold" }}>{total}</span>
        </td>
      </tr>
    )
    return data
  }

  const handleSearchInspektor = (e) => {
    const value = e.target.value
    if (value.length !== 0) {
      const filtered = InspektorState.filter((r) => r.full_name.toLowerCase().includes(value.toLowerCase()))
      dispatch(handleFilterInspektorData(filtered))
      dispatch(handleSelectedInspektorlar(filtered))
    } else {
      dispatch(handleGetInspektors())
      dispatch(handleSelectedInspektorlar([]))
    }
  }

  return gps.inspektor ? (
    <>
      <FormGroup>
        <Input type="text" id="gpsSearch" placeholder={searchInputPlaceHolder} onChange={(val) => handleSearchInspektor(val)} />
      </FormGroup>
      {/* <CustomTreeSelect data={regionList} onChange={handleChangeSelectedRegion} /> */}
      <CustomTable loading={loading} size="sm" pagination={false} columns={renderColumns} rows={renderRows} />
    </>
  ) : null
}

export default injectIntl(InpektorRoute) 

