import React from "react"
import { FormGroup, Row, Col, Input, Form, Button, Label, CustomInput } from "reactstrap"

import { useForm } from "react-hook-form"
import CustomTreeSelect from "../../../components/treeSelect"
import { injectIntl } from "react-intl"

// ** Store & Reducer
import { useSelector } from "react-redux"

import "uppy/dist/uppy.css"
import "@uppy/status-bar/dist/style.css"
import "@styles/react/libs/file-uploader/file-uploader.scss"

const EditGroupForm = ({ editableData, handleClose, onSubmit, onChange, intl }) => {
  const defaultChecked = []
  if (editableData.regions) {
    editableData.regions.forEach((region) => defaultChecked.push(region.id))
  }
  const { register, errors, handleSubmit, control } = useForm({ defaultValues: editableData })
  const groupStore = useSelector((state) => state.groupSettings)

  const group_placeholder = intl.formatMessage({ id: "SetGroupEnterName" })

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col sm="12">
          <FormGroup>
            <Label for="name">{intl.formatMessage({ id: "SetGroupName" })}</Label>
            <Input type="text" name="name" id="name" placeholder={group_placeholder} innerRef={register({ required: true })} invalid={errors.group_name && true} />
          </FormGroup>
        </Col>

        <Col sm="12">
          <FormGroup>
            <Label for="region">{intl.formatMessage({ id: "SetGroupRegion" })}</Label>
            <CustomTreeSelect defaultCheckedKeys={defaultChecked} data={groupStore?.region_list} onChange={onChange} />
          </FormGroup>
        </Col>
        <Col sm="12">
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

export default injectIntl(EditGroupForm)
