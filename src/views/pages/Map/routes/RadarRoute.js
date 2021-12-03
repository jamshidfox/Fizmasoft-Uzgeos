// ** React
import React, { useState, useEffect } from "react"

// ** Third Part
import { Row, Col, CustomInput, Label, FormGroup, Input, UncontrolledTooltip } from "reactstrap"
import moment from "moment"
import numeral from "numeraljs"
import { injectIntl } from "react-intl"

// ** Custom components
import CustomTable from "../../../components/table"

// ** JWT config
import useJwt from "@src/auth/jwt/useJwt"
const config = useJwt.jwtConfig

// ** Icons
import { ZoomIn, ZoomOut, Clock, Zap, ZapOff, CheckCircle, Circle } from "react-feather"

import { useSelector, useDispatch } from "react-redux"
import {
  handleGetRadars,
  handleAllVisibility,
  handleDeleteAll,
  handleZoomed,
  handleZoomCancel,
  handleSelectedRadar,
  handleRadarVideoEffect,
  handleRadarFinalStatus,
  handleFilterRadarData
} from "../store/actions/radar.js"

import { handleAllCrossroadZoomCancel, handleAllSelectedCrossroadZoomCancel } from "../store/actions/crossroad"
import { handleAllPerimetreZoomCancel, handleAllSelectedPerimetreZoomCancel } from "../store/actions/perimeter"
import { handleAllPtzZoomCancel, handleAllSelectedPtzZoomCancel } from "../store/actions/ptz"

import { onTimerStart } from "../../../../@core/auth/jwt/jwtService"
import { handleAllInspektorZoomCancel, handleAllSelectedInspektorZoomCancel } from "../store/actions/inspektorlar"

const RadarRoute = ({ intl }) => {
  const [tableData, setTableData] = useState([])
  const [total, setTotal] = useState(0)
  const [allSelected, setAllSelected] = useState(true)
  const [loading, setLoading] = useState(true)

  const camera = useSelector((state) => state.camera)
  const radarState = useSelector((state) => state.radar.data)
  const radarVideoEffect = useSelector((state) => state.radar.video_effect)
  const radarFinished = useSelector((state) => state.radar.finished)
  const selectedRadar = useSelector((state) => state.selectedReducer.selectedRadar)

  const searchInputPlaceHolder = intl.formatMessage({ id: "MapSearchInputPlaceholder" })

  const dispatch = useDispatch()

  const toggleAllVisibility = (cond) => {
    setAllSelected(cond)
    const changedData = radarState.map((d) => ({ ...d, selected: cond }))
    dispatch(handleSelectedRadar(changedData))
    dispatch(handleAllVisibility(changedData))
  }

  const handleRowClick = (data, index, state) => {
    const filteredData = state
    filteredData[index] = { ...data, selected: !data.selected }
    dispatch(handleSelectedRadar([...filteredData]))
    dispatch(handleAllVisibility([...filteredData]))
  }

  const handleZoomClick = async (index, state) => {
    // ** Selected datas
    await dispatch(handleAllSelectedPerimetreZoomCancel())
    await dispatch(handleAllSelectedCrossroadZoomCancel())
    await dispatch(handleAllSelectedPtzZoomCancel())
    await dispatch(handleAllSelectedInspektorZoomCancel())

    // ** orginal datas
    await dispatch(handleAllPerimetreZoomCancel())
    await dispatch(handleAllCrossroadZoomCancel())
    await dispatch(handleAllPtzZoomCancel())
    await dispatch(handleAllInspektorZoomCancel())

    const filteredData = state.map((s, i) => {
      return i === index ? { ...s, zoomed: true } : { ...s, zoomed: false }
    })
    dispatch(handleSelectedRadar([...filteredData]))
    dispatch(handleZoomed([...filteredData]))
  }

  const handleMouseEnter = (data, index, state) => {
    const filteredData = state
    filteredData[index] = { ...data, hovered: true }
    dispatch(handleSelectedRadar([...filteredData]))
  }
  const handleMouseLeave = (data, index, state) => {
    const filteredData = state
    filteredData[index] = { ...data, hovered: false }
    dispatch(handleSelectedRadar([...filteredData]))
  }

  const prepareData = (state) => {
    let totalCount = 0
    let date
    const readyData = state.map((d, i) => {
      totalCount += parseInt(d.count)
      date = moment(d.last_update).format("DD.MM.YYYY HH:mm")
      return {
        onClick: () => handleRowClick(d, i, state),
        online: d.is_online,
        id: d.id,
        name: d,
        index: i,
        data: state,
        title: (
          <>
            {d.selected ? <CheckCircle size={16} onClick={() => handleRowClick(d, i, state)} color="#6e62ee" /> : <Circle size={16} onClick={() => handleRowClick(d, i, state)} />} {d.title}
          </>
        ),
        count: d.count,
        status: (
          <div>
            {d.is_active ? <Zap size={16} color="green" /> : <ZapOff size={16} color="red" />}
            <Clock style={{ marginLeft: 4 }} size={16} color="#6e62ee" id={"date"} />
            <UncontrolledTooltip placement="top" target="date">
              {date}
            </UncontrolledTooltip>
            {d.zoomed ? (
              <ZoomOut
                size={16}
                onClick={() => {
                  dispatch(handleZoomCancel(state.map((s) => ({ ...s, zoomed: false }))))
                  dispatch(handleSelectedRadar(state.map((s) => ({ ...s, zoomed: false }))))
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
    return [totalCount, readyData]
  }

  const turnOnVideoEffect = () => {
    dispatch(handleRadarVideoEffect(!radarVideoEffect))
  }

  useEffect(() => {
    turnOnVideoEffect()
  }, [])

  useEffect(async () => {
    if (camera.radar) {
      setLoading(true)
      await dispatch(handleGetRadars(selectedRadar))
      setLoading(false)
    } else {
      dispatch(handleRadarFinalStatus())
      dispatch(handleDeleteAll())
      dispatch(handleSelectedRadar([]))
    }
  }, [camera])

  useEffect(() => {
    if (radarFinished && camera.radar) {
      const time = onTimerStart(config.timer, () => dispatch(handleGetRadars(selectedRadar)))
      return () => clearInterval(time)
    } else if (!camera.radar) {
      dispatch(handleRadarFinalStatus())
      dispatch(handleSelectedRadar([]))
    }
  }, [radarFinished && selectedRadar])

  useEffect(() => {
    const [totalCount, readyData] = prepareData(radarState)
    setTotal(totalCount)
    setTableData(readyData)
  }, [radarState])

  const columns = [
    {
      title: (
        <>
          {allSelected ? <CheckCircle color="#6e62ee" size={16} onClick={() => toggleAllVisibility(false)} /> : <Circle size={16} onClick={() => toggleAllVisibility(true)} />}
          {intl.formatMessage({ id: "RadarTableName" })}
        </>
      ),
      name: "title",
      key: "title"
    },

    {
      title: intl.formatMessage({ id: "RadarTableCount" }),
      name: "count",
      key: "count"
    },
    {
      title: intl.formatMessage({ id: "RadarTableStatus" }),
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

  const handleSearchRadars = (e) => {
    const value = e.target.value
    if (value.length !== 0) {
      const filtered = radarState.filter((r) => r.title.toLowerCase().includes(value.toLowerCase()))
      dispatch(handleFilterRadarData(filtered))
      dispatch(handleSelectedRadar(filtered))
    } else {
      dispatch(handleGetRadars())
      dispatch(handleSelectedRadar([]))
    }
  }

  return camera.radar ? (
    <Row>
      <Col md="9">
        <FormGroup>
          <Input type="text" id="radarSearch" placeholder={searchInputPlaceHolder} onChange={(val) => handleSearchRadars(val)} />
        </FormGroup>
      </Col>
      <Col md="3" className="d-flex justify-content-end">
        <CustomInput
          type="checkbox"
          defaultChecked
          id="Primary"
          className="custom-control-Primary mr-2"
          label={intl.formatMessage({ id: "MapVideoEffect" })}
          checked={radarVideoEffect}
          inline
          onChange={(e) => turnOnVideoEffect()}
          onClick={() => toggleAllVisibility(!allSelected)}
        />
      </Col>
      <CustomTable size="sm" loading={loading} pagination={false} columns={renderColumns} rows={renderRows} />
    </Row>
  ) : null
}

export default injectIntl(RadarRoute)
