import React, { useState } from "react"
import { FormGroup, Row, Col, Input, Form, Button, Label } from "reactstrap"

import { useForm } from "react-hook-form"
import { injectIntl } from "react-intl"

import "@styles/react/libs/flatpickr/flatpickr.scss"

// ** Store & Reducer

const ListForm = ({ handleClose, intl, onSubmit, picker = [] }) => {
  const { register, errors, handleSubmit, control } = useForm()

  const passportPlaceholder = intl.formatMessage({ id: "SetVIPEnterPassport" })

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col sm="12">
          <FormGroup>
            <span style={{ fontSize: 20 }} className="text-danger pt-1">
              *
            </span>
            <Label for="passport">{intl.formatMessage({ id: "SetVIPPassport" })}</Label>
            <Input
              type="text"
              name="passport"
              id="passport"
              placeholder={passportPlaceholder}
              pattern="^[a-zA-Z]{1,2}[0-9]{1,7}$"
              maxLength={9}
              innerRef={register({ required: true })}
              invalid={errors.passport && true}
            />
            <p style={{ margin: "10px 0px 0px 5px" }}>{intl.formatMessage({ id: "AccountListPassportFormat" })}: AA0000000</p>
          </FormGroup>
        </Col>

        <Col>
          <FormGroup className="d-flex mb-0">
            <Button.Ripple className="mr-1" color="primary" type="submit">
              {intl.formatMessage({ id: "SetButtonAdd" })}
            </Button.Ripple>
            <Button.Ripple color="danger" onClick={handleClose}>
              {intl.formatMessage({ id: "SetButtonCancel" })}
            </Button.Ripple>
          </FormGroup>
        </Col>
      </Row>
    </Form>
  )
}

export default injectIntl(ListForm)
