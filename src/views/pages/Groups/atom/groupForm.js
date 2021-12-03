import React, { useState } from "react"
import { FormGroup, Row, Col, Input, Form, Button, Label } from "reactstrap"

import { useForm } from "react-hook-form"
import { injectIntl } from "react-intl"

import "uppy/dist/uppy.css"
import "@uppy/status-bar/dist/style.css"
import "@styles/react/libs/file-uploader/file-uploader.scss"
import CustomTreeSelect from "../../../components/treeSelect"

// ** Store & Reducer
import { useSelector } from "react-redux"

const GroupForm = ({ handleClose, onSubmit, handleChange, intl, selectedRegion, regionError }) => {
  const { register, errors, handleSubmit, control } = useForm()

  const groupStore = useSelector((state) => state.groupSettings)

  const group_placeholder = intl.formatMessage({ id: "SetGroupEnterName" })

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col sm="12">
          <FormGroup>
            <span style={{ fontSize: 20 }} className="text-danger pt-1">
              *
            </span>
            <Label for="group_name">{intl.formatMessage({ id: "SetGroupName" })}</Label>
            <Input type="text" name="group_name" id="group_name" placeholder={group_placeholder} innerRef={register({ required: true })} invalid={errors.group_name && true} />
          </FormGroup>
        </Col>

        <Col sm="12">
          <FormGroup>
            <span style={{ fontSize: 20 }} className="text-danger pt-1">
              *
            </span>
            {regionError && selectedRegion.length === 0 ? (
              <>
                <Label className="text-danger">{intl.formatMessage({ id: "AccountGroupRegion" })}</Label>
              </>
            ) : (
              <Label for="region">{intl.formatMessage({ id: "SetGroupRegion" })}</Label>
            )}
            <CustomTreeSelect data={groupStore?.region_list} onChange={handleChange} />
          </FormGroup>
        </Col>
        <Col sm="12">
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

export default injectIntl(GroupForm)
