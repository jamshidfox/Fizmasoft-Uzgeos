// ** React
import React, { useState } from "react"

// ** Third Part
import { FormGroup, Row, Col, Button, Form, Label, Spinner, CustomInput } from "reactstrap"

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

const SearchForm = ({ intl, setTableData }) => {
  const [startDate, setStartDate] = useState(new Date(new Date().setHours(0, 0)))
  const [endDate, setEndDate] = useState(new Date(new Date().setHours(23, 59)))
  const [rule, setRule] = useState(false)
  const [selectedCameras, setSelectedCameras] = useState([])
  const [loading, setLoading] = useState(false)
  const [drb, setDrb] = useState()
  const [camerasModal, setCamerasModal] = useState(false)

  const handleStartDateChange = (e) => setStartDate(e)
  const handleEndDateChange = (e) => setEndDate(e)

  const onSubmit = (e) => {
    const timeFormat = "DD.MM.YYYY HH:mm"
    const start = moment(startDate).format(timeFormat)
    const end = moment(endDate).format(timeFormat)
    let load = 0
    e.preventDefault()
    setTableData([])
    if (!avtoQidiruvUtils.validateDate([start, end])) {
      return toast.error("Vaqt oralig'i noto'g'ri kiritilgan")
    }
    setLoading(true)
    selectedCameras.map((c) => {
      if (c.data.length === 0) return
      load++
      avtoQidiruvApi
        .getFilteredData({
          name: c.title,
          data: {
            from_date: start,
            to_date: end,
            object_id: c.data.map((d) => d.id),
            car_number: drb ? [drb] : [],
            qoida_buzarlik: rule
          }
        })
        .then(({ data }) => {
          setTableData((prev) => [...prev, ...data.data])
        })
        .finally(() => {
          load--
          if (load === 0) setLoading(false)
        })
    })
  }

  return (
    <Form onSubmit={onSubmit}>
      <Row>
        <Col md="4" sm="12">
          <FormGroup>
            <Label for="car_drb">{intl.formatMessage({ id: "LochinKozSearchCarNumber" })}</Label>
            <Cleave
              className="form-control"
              style={{ width: "100%", height: 37 }}
              placeholder={intl.formatMessage({ id: "LochinKozSearchCarNumber" })}
              value={drb}
              options={{
                blocks: [8],
                uppercase: true
              }}
              onChange={(e) => setDrb(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col md="2" sm="12">
          <FormGroup>
            <Label for="start_date">{intl.formatMessage({ id: "LochinKozSearchStartDate" })}</Label>
            <br />
            <DateInput value={startDate} onChange={handleStartDateChange} />
          </FormGroup>
        </Col>
        <Col md="2" sm="12">
          <FormGroup>
            <Label for="end_date">{intl.formatMessage({ id: "LochinKozSearchEndDate" })}</Label>
            <br />
            <DateInput value={endDate} onChange={handleEndDateChange} />
          </FormGroup>
        </Col>
        <Col md="1" sm="12">
          <FormGroup>
            <Label for="rule">{intl.formatMessage({ id: "NavCameras" })}</Label>
            <Button color="primary" onClick={() => setCamerasModal(true)}>
              <AlignJustify size={14} />
            </Button>
            <CameraSelectModal setCheckedData={(cameras) => setSelectedCameras(cameras)} open={camerasModal} setOpen={setCamerasModal} />
          </FormGroup>
        </Col>
        <Col md="1" sm="12">
          <FormGroup>
            <Label for="rule">{intl.formatMessage({ id: "LochinKozSearchRule" })}</Label>
            <CustomInput type="switch" id="switch-qoida" name="customSwitch" className="mt-1" onChange={(e) => setRule((prev) => !prev)} />
          </FormGroup>
        </Col>
        <Col className="d-flex justify-content-end">
          <FormGroup className="d-flex mb-0 mt-2">
            <Button.Ripple disabled={selectedCameras.length === 0} className="mr-1" color="primary" type="submit">
              {loading ? (
                <div className="d-flex ">
                  <Spinner color="white" size="sm" />
                  <span className="ml-50">{intl.formatMessage({ id: "LochinKozSearching" })}...</span>
                </div>
              ) : (
                <div>{intl.formatMessage({ id: "LochinKozSearch" })}</div>
              )}
            </Button.Ripple>
          </FormGroup>
        </Col>
      </Row>
    </Form>
  )
}

export default injectIntl(SearchForm)
