// ** React
import React, { useState, useEffect } from "react"

// ** Third Part
import { Row, Col, CustomInput, FormGroup, Label, Input } from "reactstrap"
import { Tooltip } from "antd"
import moment from "moment"
import numeral from "numeraljs"
import { injectIntl } from "react-intl"

// ** Custom components
import CustomTable from "../../../components/table"

// ** JWT config
import useJwt from "@src/auth/jwt/useJwt"
const config = useJwt.jwtConfig

// ** Icons
import { AiFillSignal, AiFillCar, AiFillEyeInvisible } from "react-icons/ai"
import { BsBatteryFull } from "react-icons/bs"
import { ZoomIn, ZoomOut, CheckCircle, Circle } from "react-feather"

import { useSelector, useDispatch } from "react-redux"
import {
  handleGetCrossroads,
  handleAllVisibility,
  handleDeleteAll,
  handleZoomed,
  handleZoomCancel,
  handleSelectedCrossroad,
  handleVideoEffect,
  handleCrossroadFinalStatus,
  handleFilterCrossroadData
} from "../store/actions/crossroad"

import { onTimerStart } from "../../../../@core/auth/jwt/jwtService"
import { handleAllPerimetreZoomCancel, handleAllSelectedPerimetreZoomCancel, handleSelectedPerimetr } from "../store/actions/perimeter"
import { handleAllPtzZoomCancel, handleAllSelectedPtzZoomCancel, handleSelectedPtz } from "../store/actions/ptz"
import { handleAllRadarZoomCancel, handleAllSelectedRadarZoomCancel, handleSelectedRadar } from "../store/actions/radar"
import { handleAllInspektorZoomCancel, handleAllSelectedInspektorZoomCancel, handleSelectedInspektorlar } from "../store/actions/inspektorlar"

const CrossRoad = ({ intl }) => {
  const searchInputPlaceHolder = intl.formatMessage({ id: "MapSearchInputPlaceholder" })

  const [tableData, setTableData] = useState([
    {
      id: 1,
      title: "Toshkent Shahar",
      count: 20,
      connection: (
        <div>
          <AiFillSignal />,<BsBatteryFull />
          <AiFillCar />
        </div>
      ),
      status: "Online"
    }
  ])
  const [total, setTotal] = useState(0)
  const [allSelected, setAllSelected] = useState(true)
  const [loading, setLoading] = useState(false)
  const camera = useSelector((state) => state.camera)
  const crossroadState = useSelector((state) => state.crossroad.data)
  const crossroadVideoEffect = useSelector((state) => state.crossroad.video_effect)
  const finalStatus = useSelector((state) => state.crossroad.finished)
  const selectedCrossroad = useSelector((state) => state.selectedReducer.selectedCrossroad)

  const dispatch = useDispatch()

  const toggleAllVisibility = (cond) => {
    setAllSelected(cond)
    const changedData = crossroadState.map((d) => ({ ...d, selected: cond }))
    dispatch(handleSelectedCrossroad(changedData))
    dispatch(handleAllVisibility(changedData))
  }
  const handleRowClick = (data, index, state) => {
    const filteredData = state
    filteredData[index] = { ...data, selected: !data.selected }
    dispatch(handleSelectedCrossroad([...filteredData]))
    dispatch(handleAllVisibility([...filteredData]))
  }
  const handleZoomClick = async (index, state) => {
    // ** Selected datas
    await dispatch(handleAllSelectedRadarZoomCancel())
    await dispatch(handleAllSelectedPerimetreZoomCancel())
    await dispatch(handleAllSelectedPtzZoomCancel())
    await dispatch(handleAllSelectedInspektorZoomCancel())

    // ** orginal datas
    await dispatch(handleAllRadarZoomCancel())
    await dispatch(handleAllPerimetreZoomCancel())
    await dispatch(handleAllPtzZoomCancel())
    await dispatch(handleAllInspektorZoomCancel())

    const filteredData = state.map((s, i) => {
      return i === index ? { ...s, zoomed: true } : { ...s, zoomed: false }
    })
    dispatch(handleSelectedCrossroad([...filteredData]))
    dispatch(handleZoomed([...filteredData]))
  }

  const handleMouseEnter = (data, index, state) => {
    const filteredData = state
    filteredData[index] = { ...data, hovered: true }
    dispatch(handleSelectedCrossroad([...filteredData]))
  }
  const handleMouseLeave = (data, index, state) => {
    const filteredData = state
    filteredData[index] = { ...data, hovered: false }
    dispatch(handleSelectedCrossroad([...filteredData]))
  }

  const prepareData = (state) => {
    let totalCount = 0
    let date
    const readyData = state.map((d, i) => {
      totalCount += parseInt(d.count)
      date = moment(d.last_update).format("DD.MM.YYYY HH:mm")
      return {
        onClick: () => handleRowClick(d, i, state),
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
        count: d.count,
        status: d.zoomed ? (
          <ZoomOut
            size={16}
            onClick={() => {
              dispatch(handleZoomCancel(state.map((s) => ({ ...s, zoomed: false }))))
              dispatch(handleSelectedCrossroad(state.map((s) => ({ ...s, zoomed: false }))))
            }}
            color="#6e62ee"
            className="ml-1"
          />
        ) : (
          <ZoomIn size={16} onClick={() => handleZoomClick(i, state)} className="ml-1" />
        )
      }
    })
    return [totalCount, readyData]
  }

  useEffect(async () => {
    if (camera.crossroad) {
      setLoading(true)
      await dispatch(handleGetCrossroads(selectedCrossroad))
      setLoading(false)
    } else {
      dispatch(handleCrossroadFinalStatus())
      dispatch(handleDeleteAll())
      dispatch(handleSelectedCrossroad([]))
    }
  }, [camera])

  useEffect(() => {
    if (finalStatus && camera.crossroad) {
      const time = onTimerStart(config.timer, () => dispatch(handleGetCrossroads(selectedCrossroad)))
      return () => clearInterval(time)
    } else if (finalStatus && !camera.crossroad) {
      dispatch(handleCrossroadFinalStatus())
      dispatch(handleDeleteAll())
    }
  }, [finalStatus && selectedCrossroad])

  useEffect(() => {
    const [totalCount, readyData] = prepareData(crossroadState)
    setTotal(totalCount)
    setTableData(readyData)
  }, [crossroadState])

  const columns = [
    {
      title: (
        <>
          {allSelected ? <CheckCircle color="#6e62ee" size={16} onClick={() => toggleAllVisibility(false)} /> : <Circle size={16} onClick={() => toggleAllVisibility(true)} />}
          {intl.formatMessage({ id: "CrossroadTableCount" })}
        </>
      ),
      name: "title",
      key: "title"
    },
    {
      title: intl.formatMessage({ id: "CrossroadTableCount" }),
      name: "count",
      key: "count"
    },
    {
      title: intl.formatMessage({ id: "CrossroadTableStatus" }),
      name: "status",
      key: "status"
    }
  ]

  const renderColumns = () => {
    return columns.map((column, index) => {
      return <th key={column.name}>{column.title} </th>
    })
  }

  const renderRows = () => {
    const data = tableData.map((td) => (
      <tr
        style={td.name?.zoomed ? { background: "rgb(115,103,240,0.5)", color: "#fff" } : {}}
        onMouseEnter={() => handleMouseEnter(td.name, td.index, td.data)}
        onMouseLeave={() => handleMouseLeave(td.name, td.index, td.data)}
        className={td.online ? "table-success" : ""}
        key={td.id}
      >
        <td>{td.title}</td>
        <td style={{ textAlign: "end" }}>{numeral(td.count).format("0,0")}</td>
        <td>{td.status}</td>
      </tr>
    ))
    data.push(
      <tr key="all">
        <td>
          <span style={{ fontWeight: "bold" }}>{intl.formatMessage({ id: "TableTotal" })}:</span>
        </td>
        <td style={{ textAlign: "end" }} colSpan={2}>
          <span style={{ fontWeight: "bold" }}>{numeral(total).format("0,0")}</span>
        </td>
      </tr>
    )
    return data
  }
  const handleSearchCrossRoad = (e) => {
    const value = e.target.value
    if (value.length !== 0) {
      const filtered = crossroadState.filter((r) => r.title.toLowerCase().includes(value.toLowerCase()))
      dispatch(handleFilterCrossroadData(filtered))
      dispatch(handleGetCrossroads(filtered))
    } else {
      dispatch(handleGetCrossroads())
      dispatch(handleSelectedCrossroad([]))
    }
  }

  return camera.crossroad ? (
    <Row>
      <Col md="9">
        <FormGroup>
          <Input type="text" id="crossroadSearch" placeholder={searchInputPlaceHolder} onChange={(val) => handleSearchCrossRoad(val)} />
        </FormGroup>
      </Col>
      <Col md="3" className="d-flex justify-content-end">
        <CustomInput
          type="checkbox"
          id="crossroadVideoEffect"
          className="custom-control-Primary mr-2"
          label={intl.formatMessage({ id: "MapVideoEffect" })}
          checked={crossroadVideoEffect}
          inline
          onChange={(e) => dispatch(handleVideoEffect(!crossroadVideoEffect))}
          onClick={() => toggleAllVisibility(!allSelected)}
        />
      </Col>

      <CustomTable loading={loading} size="sm" pagination={false} columns={renderColumns} rows={renderRows} />
    </Row>
  ) : null
}

export default injectIntl(CrossRoad)
