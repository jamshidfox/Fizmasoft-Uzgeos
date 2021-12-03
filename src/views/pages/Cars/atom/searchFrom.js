import React, { useState } from "react"
import { FormGroup, Row, Col, Input, Form, Button, Label } from "reactstrap"
import Flatpickr from "react-flatpickr"
import Select from "react-select"
import { selectThemeColors } from "@utils"
import { useForm, Controller } from "react-hook-form"

import "@styles/react/libs/flatpickr/flatpickr.scss"

const SearchForm = ({ onSubmit }) => {
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())

  const { register, errors, handleSubmit, control } = useForm()

  const colorOption = [
    { label: "Кора", value: "black" },
    { label: "Ок", value: "white" }
  ]

  const carTypeOption = [
    { label: "Жентра", value: "jentra" },
    { label: "Спарк", value: "spark" }
  ]
  const typeOption = [
    { label: "A", value: "A" },
    { label: "B", value: "B" },
    { label: "C", value: "C" }
  ]

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col md="2" sm="12">
          <FormGroup>
            <Label for="car">Д.Р.Б</Label>
            <Input id="car" name="car" placeholder="Фуқ‎аро транспорт рақ‎амини" />
          </FormGroup>
        </Col>
        
        <Col md="2" sm="12">
          <FormGroup>
            <Label for="car">Тех паспорт</Label>
            <Input id="car" name="car" placeholder="Фуқ‎аро транспорт паспорти" />
          </FormGroup>
        </Col>
        <Col md="2" sm="12">
          <FormGroup>
            <Label for="color">Ранги</Label>
            <Controller
              isClearable
              as={Select}
              id="color"
              control={control}
              name="color"
              options={colorOption}
              classNamePrefix="select"
              theme={selectThemeColors}
              placeholder="Рангни танланг"
            />
          </FormGroup>
        </Col>
        <Col md="2" sm="12">
          <FormGroup>
            <Label for="car_type">Русуми</Label>
            <Controller
              isClearable
              as={Select}
              id="car_type"
              control={control}
              name="car_type"
              options={carTypeOption}
              classNamePrefix="select"
              theme={selectThemeColors}
              placeholder="Рангни танланг"
            />
          </FormGroup>
        </Col>
        <Col md="2" sm="12">
          <FormGroup>
            <Label for="type">Тоифаси</Label>
            <Controller
              isMulti
              isClearable
              as={Select}
              id="type"
              control={control}
              name="type"
              options={typeOption}
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
