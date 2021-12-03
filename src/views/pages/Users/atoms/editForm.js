// ** React
import React, { useEffect, useState } from "react"

// ** Third part
import { FormGroup, Row, Col, Input, Form, Button, Label, CustomInput } from "reactstrap"
import Select from "react-select"
import { selectThemeColors } from "@utils"
import { useForm, Controller } from "react-hook-form"
import classnames from "classnames"
import Cleave from "cleave.js/react"
import { injectIntl } from "react-intl"

// ** Redux
import { useSelector } from "react-redux"

// ** Styles
import "uppy/dist/uppy.css"
import "@uppy/status-bar/dist/style.css"
import "@styles/react/libs/file-uploader/file-uploader.scss"
import "@styles/react/libs/flatpickr/flatpickr.scss"

// ** Icons
import { Check, X } from "react-feather"
import InputRequiredMark from "./InputRequiredMark"

const UserForm = ({ editableData, handleClose, onSubmit, img, setImg, prevImg, setPrevImg, isUserRole, selectedData, intl }) => {
  const user_coin_placeholder = intl.formatMessage({ id: "SetUserEnterCoin" })
  const user_deviceID_placeholder = intl.formatMessage({ id: "SetUserEnterDeviceID" })
  const user_MFY_placeholder = intl.formatMessage({ id: "SetUserEnterMFYId" })
  const user_password_placeholder = intl.formatMessage({ id: "SetUserEnterPassword" })
  const user_name_placeholder = intl.formatMessage({ id: "SetUserEnterName" })
  const user_rank_placeholder = intl.formatMessage({ id: "SetUserEnterUnvoni" })
  const user_date_of_birth_placeholder = intl.formatMessage({ id: "SetUserEnterDate" })
  const user_group_placeholder = intl.formatMessage({ id: "SetUserEnterGroup" })
  const user_access_placeholder = intl.formatMessage({ id: "SetUserEnterAccess" })

  const [groupOpen, setGroupOpen] = useState(false)
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [groupLeader, setGroupLeader] = useState("")
  const [group_lider, setGroup_lider] = useState(false)
  const [user_status, setUser_status] = useState(true)
  const [inspektor, setInspektor] = useState(false)

  const handleGroupChange = (value) => setGroup_lider(!value)
  const handleUserChange = (value) => setUser_status(!value)
  const handleInspektorChange = (value) => setInspektor(!value)

  const CustomInputLabel = () => (
    <>
      <span className="switch-icon-left">
        <Check size={14} />
      </span>
      <span className="switch-icon-right">
        <X size={14} />
      </span>
    </>
  )
  const { register, errors, handleSubmit, control } = useForm({ defaultValues: editableData })

  const userStore = useSelector((state) => state.usersSettings)

  const dostupOption = []
  const groupOption = []
  if (userStore.groupData && userStore.services) {
    userStore?.groupData.map((gr) => groupOption.push({ value: gr.id, label: gr.name }))
    userStore?.services.map((sr) => dostupOption.push({ value: sr.id, label: sr.name }))
  }

  const selectedDostup = []
  const selectedGroup = []

  if (editableData.services) {
    editableData.services.map((s) => selectedDostup.push({ value: s.id, label: s.name }))
  }
  if (editableData.group) {
    selectedGroup.push({ value: editableData.group.id, label: editableData.group.name })
  }

  useEffect(() => {
    setGroupLeader(control.getValues().group_name && userStore.leader.filter((d) => d.id === control.getValues().group_name.value))
  }, [control.getValues().group_name && control.getValues().group_name.value])

  const onSubmitData = (data) => {
    const prepareData = {
      ...data,
      date_of_birth: dateOfBirth !== "" ? dateOfBirth : editableData.date_of_birth
    }
    onSubmit(prepareData)
  }
  return (
    <Form onSubmit={handleSubmit(onSubmitData)}>
      <Row>
        <Col sm="6">
          <FormGroup>
            <InputRequiredMark />
            <Label for="username">{intl.formatMessage({ id: "SetUserCoin" })}</Label>
            <Input type="text" name="username" id="username" placeholder={user_coin_placeholder} innerRef={register({ required: true })} invalid={errors.username && true} />
          </FormGroup>
        </Col>
        <Col sm="6">
          <FormGroup>
            <InputRequiredMark />
            <Label for="password">{intl.formatMessage({ id: "SetUserPassword" })}</Label>
            <Input innerRef={register({ required: true })} invalid={errors.password && true} type="text" name="password" id="password" placeholder={user_password_placeholder} />
          </FormGroup>
        </Col>
        <Col sm="6">
          <FormGroup>
            <InputRequiredMark />
            <Label for="full_name">{intl.formatMessage({ id: "SetUserName" })}</Label>
            <Input innerRef={register({ required: true })} invalid={errors.full_name && true} type="text" name="full_name" id="full_name" placeholder={user_name_placeholder} />
          </FormGroup>
        </Col>
        <Col sm="6">
          <FormGroup>
            <InputRequiredMark />
            <Label for="zvaniya">{intl.formatMessage({ id: "SetUserUnvoni" })}</Label>
            <Input innerRef={register({ required: true })} invalid={errors.position && true} type="text" name="position" id="position" placeholder={user_rank_placeholder} />
          </FormGroup>
        </Col>
        <Col sm="6">
          <FormGroup>
            <InputRequiredMark />
            <Label for="date_of_birth">{intl.formatMessage({ id: "SetUserDate" })}</Label>
            <Cleave
              className="form-control"
              value={editableData.date_of_birth}
              options={{
                date: true,
                delimiter: ".",
                datePattern: ["d", "m", "Y"]
              }}
              id="date_of_birth"
              placeholder={user_date_of_birth_placeholder}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col sm="6">
          <FormGroup>
            <InputRequiredMark />
            <Label for="group_name">{intl.formatMessage({ id: "SetUserGroup" })}</Label>
            <Controller
              isClearable
              as={Select}
              id="group_name"
              defaultValue={selectedGroup[0]}
              onMenuOpen={() => setGroupOpen(true)}
              menuIsOpen={groupOpen}
              onMenuClose={() => setGroupOpen(false)}
              control={control}
              name="group_name"
              options={groupOption}
              classNamePrefix="select"
              theme={selectThemeColors}
              placeholder={user_group_placeholder}
              className={classnames("react-select ", { "is-invalid": !selectedData })}
            />
          </FormGroup>
        </Col>
        <Col sm="6">
          <FormGroup>
            <InputRequiredMark />
            <Label for="user_roles">{intl.formatMessage({ id: "SetUserAccess" })}</Label>
            <Controller
              isMulti
              isClearable
              as={Select}
              id="user_roles"
              defaultValue={selectedDostup}
              control={control}
              name="user_roles"
              options={dostupOption}
              classNamePrefix="select"
              theme={selectThemeColors}
              placeholder={user_access_placeholder}
              className={classnames("react-select ", { "is-invalid": !isUserRole })}
            />
          </FormGroup>
        </Col>
        {control.getValues().is_inspector ? (
          <>
            <Col sm="6">
              <FormGroup>
                <Label for="device_uid">{intl.formatMessage({ id: "SetUserDeviceID" })}</Label>
                <Input type="text" name="device_uid" id="device_uid" placeholder={user_deviceID_placeholder} innerRef={register()} invalid={errors.deviceID && true} />
              </FormGroup>
            </Col>
            <Col sm="6">
              <FormGroup>
                <Label for="mfy_id">{intl.formatMessage({ id: "SetUserMFYId" })}</Label>
                <Input type="text" name="mfy_id" id="mfy_id" placeholder={user_MFY_placeholder} innerRef={register()} invalid={errors.deviceID && true} />
              </FormGroup>
            </Col>
          </>
        ) : null}
        <Col style={{ zIndex: 0 }} sm="9">
          <Row>
            {groupLeader && groupLeader[0].has_group_leader === "false" ? (
              <Col span="4">
                <FormGroup>
                  <Label for="group_leader">{intl.formatMessage({ id: "SetUserLeader" })}</Label>
                  <div>
                    <CustomInput
                      // className={classnames("", { "d-none": groupOpen })}
                      type="switch"
                      label={<CustomInputLabel />}
                      id="group_leader"
                      name="group_leader"
                      inline
                      defaultChecked={editableData.group_leader}
                      innerRef={register()}
                      onChange={(e) => handleGroupChange(group_lider)}
                    />
                  </div>
                </FormGroup>
              </Col>
            ) : null}
            <Col span="4">
              <FormGroup>
                <Label for="is_inspector">{intl.formatMessage({ id: "SetUserInspektor" })}</Label>
                <div>
                  <CustomInput
                    // className={classnames("", { "d-none": groupOpen })}
                    type="switch"
                    label={<CustomInputLabel />}
                    id="is_inspector"
                    name="is_inspector"
                    inline
                    defaultChecked={editableData.is_inspector}
                    innerRef={register()}
                    onChange={(e) => handleInspektorChange(inspektor)}
                  />
                </div>
              </FormGroup>
            </Col>
            <Col span="4">
              <FormGroup>
                <Label for="status">{intl.formatMessage({ id: "SetUserCondition" })}</Label>
                <div>
                  <CustomInput
                    // className={classnames("", { "d-none": groupOpen })}
                    type="switch"
                    label={<CustomInputLabel />}
                    id="status"
                    name="status"
                    inline
                    defaultChecked={editableData.status}
                    innerRef={register()}
                    onChange={(e) => handleUserChange(user_status)}
                  />
                </div>
              </FormGroup>
            </Col>
          </Row>
        </Col>
        <Col sm="12">
          <FormGroup className="d-flex mb-0 mt-2">
            <Button.Ripple className="mr-1" color="primary" type="submit">
              Узгартириш
            </Button.Ripple>
            <Button.Ripple color="danger" onClick={handleClose}>
              Бекор қилиш
            </Button.Ripple>
          </FormGroup>
        </Col>
      </Row>
    </Form>
  )
}

export default injectIntl(UserForm)
