// ** React
import React, { useState, useEffect } from "react"

// ** Third Part
import { Row, Col, CustomInput, FormGroup, Input, Button } from "reactstrap"
import { Tooltip } from "antd"
import styled from "styled-components"
import numeral from "numeraljs"
import { injectIntl } from "react-intl"
// ** Custom components
import CustomTable from "../../../components/table"

// ** JWT config
import useJwt from "@src/auth/jwt/useJwt"
const config = useJwt.jwtConfig

// ** Icons
import { ZoomIn, ZoomOut, CheckCircle, Circle, PieChart } from "react-feather"

import { useSelector, useDispatch } from "react-redux"

import {
  handleGetPerimeters,
  handleAllVisibility,
  handleDeleteAll,
  handleZoomed,
  handleZoomCancel,
  handleSelectedPerimetr,
  handleVideoEffect,
  handlePerimetreFinalStatus,
  handleFilterPerimeterData
} from "../store/actions/perimeter"

import { handleAllRadarZoomCancel, handleAllSelectedRadarZoomCancel } from "../store/actions/radar"
import { handleAllCrossroadZoomCancel, handleAllSelectedCrossroadZoomCancel } from "../store/actions/crossroad"
import { handleAllPtzZoomCancel, handleAllSelectedPtzZoomCancel } from "../store/actions/ptz"

import { onTimerStart } from "../../../../@core/auth/jwt/jwtService"
import { handleAllInspektorZoomCancel, handleAllSelectedInspektorZoomCancel } from "../store/actions/inspektorlar"
import PerimeterAsModal from "../../Dashboard/tabs/PerimeterAsModal"

const PerimeterRoute = ({ intl }) => {
  const [tableData, setTableData] = useState([])
  const [total, setTotal] = useState([0, 0])
  const [allSelected, setAllSelected] = useState(true)
  const camera = useSelector((state) => state.camera)
  const perimeterState = useSelector((state) => state.perimeter.data)
  const perimeterVideoEffect = useSelector((state) => state.perimeter.video_effect)
  const perimeterFinished = useSelector((state) => state.perimeter.finished)
  const perimeterSelected = useSelector((state) => state.selectedReducer.selectedPerimeter)
  const [loading, setLoading] = useState(false)
  const [statModal, setStatModal] = useState(false)
  const searchInputPlaceHolder = intl.formatMessage({ id: "MapSearchInputPlaceholder" })

  const dispatch = useDispatch()

  const toggleAllVisibility = (cond) => {
    setAllSelected(cond)
    const changedData = perimeterState.map((d) => ({ ...d, selected: cond }))
    dispatch(handleSelectedPerimetr(changedData))
    dispatch(handleAllVisibility(changedData))
  }

  const handleZoomClick = async (index, state) => {
    //** Selected datas
    await dispatch(handleAllSelectedRadarZoomCancel())
    await dispatch(handleAllSelectedCrossroadZoomCancel())
    await dispatch(handleAllSelectedPtzZoomCancel())
    await dispatch(handleAllSelectedInspektorZoomCancel())

    // ** orginal datas
    await dispatch(handleAllRadarZoomCancel())
    await dispatch(handleAllCrossroadZoomCancel())
    await dispatch(handleAllPtzZoomCancel())
    await dispatch(handleAllInspektorZoomCancel())

    const filteredData = state.map((s, i) => {
      return i === index ? { ...s, zoomed: true } : { ...s, zoomed: false }
    })
    dispatch(handleSelectedPerimetr([...filteredData]))
    dispatch(handleZoomed([...filteredData]))
  }

  const handleRowClick = (data, index, state) => {
    const filteredData = state
    filteredData[index] = { ...data, selected: !data.selected }
    dispatch(handleSelectedPerimetr([...filteredData]))
    dispatch(handleAllVisibility([...filteredData]))
  }

  const handleMouseEnter = (data, index, state) => {
    const filteredData = state
    filteredData[index] = { ...data, hovered: true }
    dispatch(handleSelectedPerimetr([...filteredData]))
  }

  const handleMouseLeave = (data, index, state) => {
    const filteredData = state
    filteredData[index] = { ...data, hovered: false }
    dispatch(handleSelectedPerimetr([...filteredData]))
  }

  const prepareData = (state) => {
    const totalCount = [0, 0]
    const readyData = state.map((d, i) => {
      totalCount[0] += parseInt(d.kirish)
      totalCount[1] += parseInt(d.chiqish)
      return {
        onClick: () => handleRowClick(d, i, state),
        id: d.id,
        notInstalled: d.notInstalled,
        name: d,
        index: i,
        data: state,
        title: (
          <>
            {d.selected ? <CheckCircle size={16} onClick={() => handleRowClick(d, i, state)} color="#6e62ee" /> : <Circle size={16} onClick={() => handleRowClick(d, i, state)} />}{" "}
            <Tooltip title={d.title}>{d.title.length > 10 ? `${d.title.slice(0, 15)}...` : d.title}</Tooltip>
          </>
        ),
        in: d.kirish,
        out: d.chiqish,
        zoom: (
          <>
            {d.zoomed ? (
              <ZoomOut
                size={16}
                onClick={() => {
                  dispatch(handleZoomCancel(state.map((s) => ({ ...s, zoomed: false }))))
                  dispatch(handleSelectedPerimetr(state.map((s) => ({ ...s, zoomed: false }))))
                }}
                color="#6e62ee"
              />
            ) : (
              <ZoomIn size={16} onClick={() => handleZoomClick(i, state)} />
            )}
          </>
        )
      }
    })
    return [totalCount, readyData]
  }

  useEffect(async () => {
    if (camera.perimeter) {
      setLoading(true)
      await dispatch(handleGetPerimeters(perimeterState))
      setLoading(false)
    } else {
      dispatch(handlePerimetreFinalStatus())
      dispatch(handleDeleteAll())
      dispatch(handleSelectedPerimetr([]))
    }
  }, [camera])

  useEffect(() => {
    if (perimeterFinished && camera.perimeter) {
      const time = onTimerStart(config.timer, () => dispatch(handleGetPerimeters(perimeterSelected)))
      return () => clearInterval(time)
    } else if (!camera.perimeter) {
      dispatch(handleDeleteAll())
      dispatch(handleSelectedPerimetr([]))
      dispatch(handlePerimetreFinalStatus())
    }
  }, [perimeterFinished && perimeterSelected])

  useEffect(() => {
    const [totalCount, readyData] = prepareData(perimeterState)
    setTotal(totalCount)
    setTableData(readyData)
  }, [perimeterState])

  const columns = [
    {
      title: (
        <>
          {allSelected ? <CheckCircle color="#6e62ee" size={16} onClick={() => toggleAllVisibility(false)} /> : <Circle size={16} onClick={() => toggleAllVisibility(true)} />}
          {intl.formatMessage({ id: "PerimeterTableName" })}
        </>
      ),
      name: "title",
      key: "title"
    },
    {
      title: (
        <>
          <div style={{ textAlign: "end" }}>{intl.formatMessage({ id: "PerimeterTableIn" })}</div>
        </>
      ),
      name: "income",
      key: "income"
    },
    {
      title: (
        <>
          <div style={{ textAlign: "end" }}>{intl.formatMessage({ id: "PerimeterTableOut" })}</div>
        </>
      ),
      name: "left",
      key: "left"
    },
    {
      title: "",
      name: "+",
      key: "+"
    }
  ]

  const renderColumns = () => {
    return columns.map((column, index) => {
      return <th key={column.name}>{column.title} </th>
    })
  }

  const renderRows = () => {
    const readyData = tableData.map((td) => (
      <tr
        style={{ background: td.name?.zoomed ? "rgb(115,103,240,0.5)" : "inherit" }}
        onMouseEnter={() => handleMouseEnter(td.name, td.index, td.data)}
        onMouseLeave={() => handleMouseLeave(td.name, td.index, td.data)}
        key={td.id || td.name.title}
      >
        <td className={td.name?.is_online ? "" : "text-danger"} style={{}}>
          {td.title}
        </td>
        <td className={td.name?.is_online ? "" : "text-danger"} style={{ textAlign: "end" }}>
          {numeral(td.in).format("0,0")}
        </td>
        <td className={td.name?.is_online ? "" : "text-danger"} style={{ textAlign: "end" }}>
          {numeral(td.out).format("0,0")}
        </td>
        <td className={td.name?.is_online ? "" : "text-danger"} style={{}}>
          {td.zoom}
        </td>
      </tr>
    ))
    readyData.push(
      <tr key="all">
        <td>
          <span style={{ fontWeight: "bold" }}>{intl.formatMessage({ id: "TableTotal" })}:</span>
        </td>
        <td style={{ textAlign: "end" }}>
          <span style={{ fontWeight: "bold", textAlign: "end" }}>{numeral(total[0]).format("0,0")}</span>
        </td>
        <td style={{ textAlign: "end" }}>
          <span style={{ fontWeight: "bold" }}>{numeral(total[1]).format("0,0")}</span>
        </td>
      </tr>
    )
    return readyData
  }

  const handleSearchPerimeter = (e) => {
    const value = e.target.value
    if (value.length !== 0) {
      const filtered = perimeterState.filter((r) => r.title.toLowerCase().includes(value.toLowerCase()))
      dispatch(handleFilterPerimeterData(filtered))
      dispatch(handleSelectedPerimetr(filtered))
    } else {
      dispatch(handleGetPerimeters())
      dispatch(handleSelectedPerimetr([]))
    }
  }

  const getOnOff = () => {
    let on = 0
    let off = 0

    tableData?.[0]?.data.forEach((d) => {
      d.is_online ? on++ : off++
    })
    return [on, off]
  }
  return (
    <Row>
      {statModal && <PerimeterAsModal open={statModal} setOpen={setStatModal} />}
      <Col md="9">
        <FormGroup>
          <Input type="text" id="perimeterSearch" placeholder={searchInputPlaceHolder} onChange={(val) => handleSearchPerimeter(val)} />
        </FormGroup>
      </Col>
      <Col md="3" className="d-flex justify-content-end">
        <CustomInput
          type="checkbox"
          id="perimeterVideoEffect"
          className="custom-control-Primary mr-2"
          label={intl.formatMessage({ id: "MapVideoEffect" })}
          checked={perimeterVideoEffect}
          inline
          onChange={(e) => dispatch(handleVideoEffect(!perimeterVideoEffect))}
          onClick={() => toggleAllVisibility(!allSelected)}
        />
      </Col>
      <div className="d-flex">
        <Button size="sm" color="primary" className="mb-1" onClick={() => setStatModal(true)}>
          <PieChart />
        </Button>
        <div className="ml-5">
          <Button size="sm" color="info" className="mb-1">
            Jami : {tableData ? tableData?.[0]?.data.length : 0}
          </Button>
          <Button size="sm" color="success" className="mb-1 ml-1">
            On: {getOnOff()[0]}
          </Button>
          <Button size="sm" color="danger" className="mb-1 ml-1">
            Off: {getOnOff()[1]}
          </Button>
        </div>
      </div>
      <CustomTable loading={loading} size="sm" pagination={false} columns={renderColumns} rows={renderRows} />
    </Row>
  )
}
function usePrevPropValue(value) {
  const ref = React.useRef()
  React.useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export default injectIntl(PerimeterRoute)

export const TotalAmount = styled.span`
  font-weight: bold;
  color: ${(props) => (props.count[0] > usePrevPropValue(props.count[0]) ? "green" : "black")};

  transition: color 0.5s ease;
`
