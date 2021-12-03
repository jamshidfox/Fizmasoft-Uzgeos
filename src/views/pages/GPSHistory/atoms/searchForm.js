// ** React
import React, { useState } from "react"

// ** Third Part
import { FormGroup, Row, Col, Input, Form, Button, Label } from "reactstrap"
import Flatpickr from "react-flatpickr"
import Select from "react-select"
import { selectThemeColors } from "@utils"
import { useForm, Controller } from "react-hook-form"

// ** styles
import "@styles/react/libs/flatpickr/flatpickr.scss"
import styled from "styled-components"

const SearchForm = ({ onSubmit }) => {
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())

  const { register, errors, handleSubmit, control } = useForm()

  const gpsTypeOption = [
    { label: "PPS", value: "PPS" },
    { label: "YPX", value: "YPX" },
    { label: "Bus", value: "Bus" },
    { label: "Ambulance", value: "Ambulance" },
    { label: "Fire House", value: "FireHouse" }
  ]

  const CustomSelectBox = styled(Select)`
    z-index: 999;
  `

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col md="4" sm="12">
          <FormGroup>
            <Label for="From">Вақти</Label>
            <Flatpickr
              name="From"
              value={fromDate}
              id="range-picker"
              className="form-control"
              onChange={(date) => setFromDate(date)}
              options={{
                mode: "range",
                defaultDate: ["2020-02-01", "2020-02-15"]
              }}
            />
          </FormGroup>
        </Col>
        <Col md="4" sm="12">
          <FormGroup>
            <Label for="type">GPS Тоифаси</Label>
            <Controller
              isMulti
              isClearable
              as={CustomSelectBox}
              id="type"
              control={control}
              name="type"
              options={gpsTypeOption}
              classNamePrefix="select"
              theme={selectThemeColors}
              placeholder="Тоифасини танланг"
            />
          </FormGroup>
        </Col>

        <Col sm="2">
          <FormGroup className="d-flex mb-0">
            <Button.Ripple className="mt-2" color="primary" type="submit" onClick={(e) => e.preventDefault()}>
              Қидириш
            </Button.Ripple>
          </FormGroup>
        </Col>
      </Row>
    </Form>
  )
}

export default SearchForm
