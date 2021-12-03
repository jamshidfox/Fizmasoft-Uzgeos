import React, { useState } from "react"
import { FormGroup, Row, Col, Input, Form, Button, Label } from "reactstrap"

import { useForm } from "react-hook-form"
import { injectIntl } from "react-intl"

import "@styles/react/libs/flatpickr/flatpickr.scss"

// ** Store & Reducer

const EditListForm = ({ editableData, intl, handleClose, onSubmit, picker = [] }) => {
  const { register, errors, handleSubmit, control } = useForm({ defaultValues: editableData })
  const passportPlaceholder = intl.formatMessage({ id: "SetVIPEnterPassport" })
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col sm="12">
          <FormGroup>
            <span style={{ fontSize: 20 }} className="text-danger pt-1">
              *
            </span>
            <Label for="passport_raqami">{intl.formatMessage({ id: "SetVIPPassport" })}</Label>
            <Input
              type="text"
              name="passport_raqami"
              id="passport_raqami"
              placeholder={passportPlaceholder}
              pattern="^[a-zA-Z]{1,2}[0-9]{1,7}$"
              maxLength={9}
              innerRef={register({ required: true })}
              invalid={errors.passport && true}
            />
          </FormGroup>
        </Col>

        <Col>
          <FormGroup className="d-flex mb-0">
            <Button.Ripple className="mr-1" color="primary" type="submit">
              {intl.formatMessage({ id: "SetButtonEdit" })}
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

export default injectIntl(EditListForm)
