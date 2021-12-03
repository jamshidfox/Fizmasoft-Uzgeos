// ** React
import React, { useEffect, useState } from "react"

// ** Third Part
import { FormGroup, Row, Col, Button, Form, Label, Spinner } from "reactstrap"

import { injectIntl } from "react-intl"
import { toast } from "react-toastify"
import Cleave from "cleave.js/react"
import avtoQidiruvApi from "../api"
import avtoQidiruvUtils from "./utilFuncs"
import moment from "moment"
import "@styles/react/libs/flatpickr/flatpickr.scss"
import DateInput from "../../../components/DateTimeInput"
import CameraSelectModal from "./CameraSelectModal"
import { AlignJustify } from "react-feather"
import Select from "react-select"
import { selectThemeColors } from "@utils"
import { useSelector } from "react-redux"
import Timer from "../../../components/Timer/index"

const SearchForm = ({
  intl,
  currentPage,
  setCurrentPage,
  setPageCount,
  rowsPerPage,
  setTableData,
  setTableLoading,
  setTotalCount,
  setCheckAllDataCome,
  setFilterProps,
  setSearchCrossroadTimer,
  setSearchPerimeterTimer,
  setSearchRadarTimer,
  searchCrossroadTimer,
  searchPerimeterTimer,
  searchRadarTimer,
  tableFilter,
  setCamerasLoading,
  setCrossroadErrorLoading,
  setPerimeterErrorLoading,
  setRadarErrorLoading
}) => {
  const [startDate, setStartDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)))
  const [endDate, setEndDate] = useState(new Date(new Date().setHours(23, 59, 59, 999)))
  const [rule, setRule] = useState(null)
  const [ruleTypes, setRuleTypes] = useState([])
  const [selectedRuleTypes, setSelectedRuleTypes] = useState([])
  const [selectedCameras, setSelectedCameras] = useState([])
  const [loading, setLoading] = useState(false)
  const [drb, setDrb] = useState()
  const [camerasModal, setCamerasModal] = useState(false)
  const [perimeterTotal, setPerimeterTotal] = useState(0)
  const [crossroadTotal, setCrossroadTotal] = useState(0)
  const [radarTotal, setRadarTotal] = useState(0)
  const [totalCameraType, setTotalCameraType] = useState(0)
  const [checkSubmit, setCheckSubmit] = useState(true)

  const skin = useSelector((state) => state.layout.isSkinChange)

  const handleStartDateChange = (e) => setStartDate(e)
  const handleEndDateChange = (e) => setEndDate(e)
  const makeRequest = (camera, start, end, offset, limit) => {
    const newData = {
      from_date: start,
      to_date: end,
      object_id: camera.data.map((d) => d.id),
      car_number: drb ? [drb] : [],
      rules: selectedRuleTypes[0] && selectedRuleTypes[0].length > 0 ? selectedRuleTypes[0] : undefined,
      colors: tableFilter.colors?.length > 0 ? tableFilter.colors : undefined,
      countries: tableFilter.countries?.length > 0 ? tableFilter.countries : undefined,
      models: tableFilter.models?.length > 0 ? tableFilter.models : undefined,
      limit,
      offset
    }
    return {
      name: camera.title,
      data: newData
    }
  }

  const handleSowData = async (asyncTaskArr, firstTime) => {
    setCamerasLoading([])
    setTableData([])
    let total = 0
    let flag = 0
    const dataArr = []

    for (const task of asyncTaskArr) {
      if (Object.keys(task).length) dataArr.push(task)
      if (task.length === 0) continue
      avtoQidiruvApi
        .getFilteredData(task)
        .then(({ data, config }) => {
          if (data && firstTime) {
            flag++
            setCheckAllDataCome({ index: flag, cond: true, arr: selectedCameras })
            const { url } = config
            const { count } = data
            total += count
            if (url.toLowerCase().includes("radar")) setRadarTotal(count)
            else if (url.toLowerCase().includes("chorraxa")) setCrossroadTotal(count)
            else setPerimeterTotal(count)
          }
          setCamerasLoading((prev) => [...prev, task.name])
          if (task.name === "chorraxa") setSearchCrossroadTimer(true)
          if (task.name === "perimeter") setSearchPerimeterTimer(true)
          if (task.name === "radar") setSearchRadarTimer(true)
          if (data.props && Object.keys(data.props).length > 0) setFilterProps(data.props)
          setTableData((prev) => [...prev, ...data.data])
          if (data.data.length > 0) setTableLoading(false)
        })
        .catch((err) => {
          console.log(err)
          if (task.name === "chorraxa") {
            setSearchCrossroadTimer(true)
            setCrossroadErrorLoading(true)
          }
          if (task.name === "perimeter") {
            setSearchPerimeterTimer(true)
            setPerimeterErrorLoading(true)
          }
          if (task.name === "radar") {
            setSearchRadarTimer(true)
            setRadarErrorLoading(true)
          }
          setLoading(false)
          setTableLoading(false)
        })
        .finally(() => {
          if (flag === dataArr.length) {
            setLoading(false)
            setTableLoading(false)
          }
          if (firstTime) {
            setTotalCount(total)
            setPageCount(Math.ceil(total / rowsPerPage))
          }
        })
    }
  }

  const onSubmit = async (e) => {
    setCamerasLoading([])
    setSearchCrossroadTimer(false)
    setSearchPerimeterTimer(false)
    setSearchRadarTimer(false)
    setCheckAllDataCome({ index: 0, cond: true, arr: selectedCameras })
    setCheckSubmit(true)
    e?.preventDefault()
    const timeFormat = "DD.MM.YYYY HH:mm"
    const start = moment(startDate).format(timeFormat)
    const end = moment(endDate).format(timeFormat)
    setPerimeterTotal(0)
    setCrossroadTotal(0)
    setRadarTotal(0)
    setTableData([])
    if (!avtoQidiruvUtils.validateDate([start, end])) return toast.error("Vaqt oralig'i noto'g'ri kiritilgan")
    setLoading(true)
    setTableLoading(true)
    let cameraCount = 0
    try {
      selectedCameras.forEach((camera) => {
        if (camera.data.length === 0) return []
        cameraCount++
      })
      const asyncTaskArr = selectedCameras.map((camera) => {
        if (camera.data.length === 0) return []
        setTotalCameraType(cameraCount)
        return makeRequest(camera, start, end, 0, rowsPerPage / cameraCount)
      })
      await handleSowData(asyncTaskArr, true)
    } catch (err) {
      console.log(err)
    }
    setCurrentPage(0)
    setCheckSubmit(false)
  }

  const getCount = (page) => {
    if (page === 0) return 3

    let max = 3
    if (Math.floor(+radarTotal / +page) === 0) max--
    if (Math.floor(+crossroadTotal / +page) === 0) max--
    if (Math.floor(+perimeterTotal / +page) === 0) max--

    return max
  }

  // ** Get rule types
  useEffect(async () => {
    const { data } = await avtoQidiruvApi.getRuleTypes()
    setRuleTypes(data.map((item) => ({ ...item, value: item.title, label: item.title })))
  }, [])

  useEffect(async () => {
    if (checkSubmit) return
    const count = getCount(currentPage + 1)
    if (count === 0) return
    setSearchCrossroadTimer(false)
    setSearchPerimeterTimer(false)
    setSearchRadarTimer(false)
    setTableLoading(true)
    const timeFormat = "DD.MM.YYYY HH:mm"
    const start = moment(startDate).format(timeFormat)
    const end = moment(endDate).format(timeFormat)
    try {
      const offset = (currentPage * rowsPerPage) / totalCameraType
      setTotalCameraType(count)
      const asyncTaskArr = selectedCameras.map((camera) => (camera.data.length === 0 ? [] : makeRequest(camera, start, end, offset, rowsPerPage / count)))
      await handleSowData(asyncTaskArr, false)
    } catch (err) {}
  }, [currentPage])

  useEffect(() => {
    if (checkSubmit) return
    onSubmit()
  }, [tableFilter])

  return (
    <>
      <Timer name={intl.formatMessage({ id: "NavCROSSROAD" })} condition={searchCrossroadTimer} />
      <Timer name={intl.formatMessage({ id: "NavPERIMETER" })} condition={searchPerimeterTimer} />
      <Timer name={intl.formatMessage({ id: "NavRADAR" })} condition={searchRadarTimer} />
      <Form onSubmit={onSubmit}>
        <Row>
          <Col lg="2" xl="2" sm="12">
            <FormGroup>
              <Label className="font-weight-bold" for="car_drb">
                {intl.formatMessage({ id: "LochinKozSearchCarNumber" })}
              </Label>
              <Cleave
                className={`form-control ${skin === "dark" ? "border-white" : "border"}`}
                style={{ width: "100%", height: 37 }}
                value={drb}
                options={{
                  blocks: [8],
                  uppercase: true
                }}
                onChange={(e) => setDrb(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col lg="2" xl="2" sm="12">
            <FormGroup>
              <Label className="font-weight-bold" for="car_rule">
                {intl.formatMessage({ id: "LochinKozSearchRule" })}
              </Label>
              <Select
                style={{ marginLeft: -5 }}
                isClearable={true}
                onChange={(data) => setSelectedRuleTypes([data.map((d) => d.id)])}
                theme={selectThemeColors}
                isMulti
                name="car_rule"
                placeholder=""
                options={ruleTypes}
                className="react-select border-white rounded"
                classNamePrefix="select"
              />
            </FormGroup>
          </Col>
          <Col lg="3" xl="2" sm="12">
            <FormGroup>
              <Label className="font-weight-bold" for="start_date">
                {intl.formatMessage({ id: "LochinKozSearchStartDate" })}
              </Label>
              <br />
              <DateInput value={startDate} onChange={handleStartDateChange} />
            </FormGroup>
          </Col>
          <Col lg="3" xl="2" sm="12">
            <FormGroup>
              <Label className="font-weight-bold" for="end_date">
                {intl.formatMessage({ id: "LochinKozSearchEndDate" })}
              </Label>
              <br />
              <DateInput value={endDate} onChange={handleEndDateChange} />
            </FormGroup>
          </Col>
          <Col lg="1" xl="1" sm="12">
            <FormGroup>
              <Label className="font-weight-bold" for="rule">
                {intl.formatMessage({ id: "NavCameras" })}
              </Label>
              <br />
              <Button color="primary" onClick={() => setCamerasModal(true)}>
                {selectedCameras.length > 0 ? <AlignJustify size={14} /> : <Spinner size="sm" />}
              </Button>
              <CameraSelectModal setCheckedData={(cameras) => setSelectedCameras(cameras)} open={camerasModal} setOpen={setCamerasModal} />
            </FormGroup>
          </Col>
          <Col lg="3" xl="3" sm="12" className="d-flex flex-xl-row align-items-center ml-0 ml-lg-4 ml-xl-0 mt-1 justify-content-end">
            <FormGroup className="mb-0">
              <Button.Ripple disabled={selectedCameras.length === 0} className="mr-1" color="primary" type="submit">
                {loading ? <Spinner color="white" size="sm" /> : <span>{intl.formatMessage({ id: "LochinKozSearch" })}</span>}
              </Button.Ripple>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default injectIntl(SearchForm)
