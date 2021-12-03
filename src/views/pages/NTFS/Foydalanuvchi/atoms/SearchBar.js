import React, { useState } from "react"
import { FormGroup, Card, Row, Col, Input, Form, Button, Label } from "reactstrap"
import Select from "react-select"
import { selectThemeColors } from "@utils"
import { useForm, Controller } from "react-hook-form"

import "@styles/react/libs/flatpickr/flatpickr.scss"

const SearchBar = ({ onSubmit }) => {
  const [fromDate, setFromDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())

  const { register, errors, handleSubmit, control } = useForm()

  
  const regionOption = [
    { label: "Миробод Тумани", value: "Mirobod" },
    { label: "Олмазор Тумани", value: "Olmazor" }
  ]
 
  const gomOption = [
    { value: 1, label: "1 - Гом", isFixed: true },
    { value: 2, label: "2 - Гом", isFixed: true },
    { value: 3, label: "3 - Гом", isFixed: true },
    { value: 4, label: "4 - Гом", isFixed: true },
    { value: 5, label: "5 - Гом", isFixed: true }
  ]

  return (<Card className='p-1'>  
        <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
        <Col sm="2">
            <FormGroup>
                <Label for="first_name">Исми</Label>
                <Input
                type="text"
                name="first_name"
                id="first_name"
                placeholder="Исми"
                innerRef={register({ required: true })}
                invalid={errors.first_name && true}
                />
            </FormGroup>
            </Col>
        <Col sm="4">
            <FormGroup>
                <Label for="zvaniya">Тумани</Label>
                <Controller
                isMulti
                isClearable
                as={Select}
                id="region"
                control={control}
                name="region"
                options={regionOption}
                classNamePrefix="select"
                theme={selectThemeColors}
                placeholder="Туманини танланг"
                />
            </FormGroup>
            </Col>
            <Col sm="4">
            <FormGroup>
                <Label for="gom">Гоми</Label>
                <Controller
                isMulti
                isClearable
                as={Select}
                id="gom"
                control={control}
                name="gom"
                options={gomOption}
                classNamePrefix="select"
                theme={selectThemeColors}
                placeholder="Гомини танланг"
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
    </Card>
  )
}

export default SearchBar
