// ** React
import React, { useEffect, useState } from "react"

// ** Third Part
import { FormGroup, Row, Col, Input, Form, Button, Label, CustomInput } from "reactstrap"
import Select from "react-select"
import { selectThemeColors } from "@utils"
import { useForm, Controller } from "react-hook-form"
import Uppy from "@uppy/core"
import thumbnailGenerator from "@uppy/thumbnail-generator"
import { DragDrop } from "@uppy/react"
import { useSelector } from "react-redux"
import classnames from "classnames"
import { injectIntl } from "react-intl"
import styled from "styled-components"
import Cleave from "cleave.js/react"
import cryptoRandomString from "crypto-random-string"
import { IoMdClose } from "react-icons/io"

// ** Icons
import { Check, X } from "react-feather"

// ** Styles
import "uppy/dist/uppy.css"
import "@uppy/status-bar/dist/style.css"
import "@styles/react/libs/file-uploader/file-uploader.scss"

import "cleave.js/dist/addons/cleave-phone.us"
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/react/libs/react-select/_react-select.scss"
import InputRequiredMark from "./InputRequiredMark"

const UserForm = ({
  handleClose,
  intl,
  setImg,
  prevImg,
  setPrevImg,
  inspektor,
  isUserRole,
  selectedData,
  onSubmit,
  group_lider,
  user_status,
  generatedPassword,
  setGeneratedPassword,
  handleGroupChange,
  handleUserChange,
  handleInspektorChange
}) => {
  const [roleOpen, setRoleOpen] = useState(false)
  const [groupOpen, setGroupOpen] = useState(false)

  // ** date
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [birthError, setBirthError] = useState(false)
  const [passwordInput, setPasswordInput] = useState("")
  const [groupLeader, setGroupLeader] = useState("")

  // ** Int translation
  const user_coin_placeholder = intl.formatMessage({ id: "SetUserEnterCoin" })
  const user_deviceID_placeholder = intl.formatMessage({ id: "SetUserEnterDeviceID" })
  const user_MFY_placeholder = intl.formatMessage({ id: "SetUserEnterMFYId" })
  const user_password_placeholder = intl.formatMessage({ id: "SetUserEnterPassword" })
  const user_name_placeholder = intl.formatMessage({ id: "SetUserEnterName" })
  const user_rank_placeholder = intl.formatMessage({ id: "SetUserEnterUnvoni" })
  const user_date_of_birth_placeholder = intl.formatMessage({ id: "SetUserEnterDate" })
  const user_group_placeholder = intl.formatMessage({ id: "SetUserEnterGroup" })
  const user_access_placeholder = intl.formatMessage({ id: "SetUserEnterAccess" })
  const user_photoInfo = intl.formatMessage({ id: "SetUserPhotoInfo" })

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

  const generate = () => {
    let password
    while (true) {
      password = cryptoRandomString({ length: 8, type: "alphanumeric" })
      if (password.includes("O") || password.includes("o") || password.includes("L") || password.includes("l") || password.includes("I") || password.includes("i") || password.includes("0")) {
        continue
      } else break
    }
    return setGeneratedPassword(password[0].toUpperCase() + password.substring(1).toLowerCase())
  }

  const handleClearGeneratedPassword = () => {
    setGeneratedPassword("")
    setPasswordInput("")
  }

  const passwordHandler = (e) => {
    setGeneratedPassword("")
    setPasswordInput(e.target.value)
  }

  const defaultValues = {
    date_of_birth: null
  }
  const userStore = useSelector((state) => state.usersSettings)

  const { register, errors, handleSubmit, control } = useForm(defaultValues)

  useEffect(() => {
    setGroupLeader(control.getValues().group && userStore.leader.filter((d) => d.id === control.getValues().group.value))
  }, [control.getValues().group && control.getValues().group.value])

  const dostupOption = []
  const groupOption = []
  if (userStore.groupData && userStore.services) {
    userStore?.groupData.map((gr) => groupOption.push({ value: gr.id, label: gr.name }))
    userStore?.services.map((sr) => dostupOption.push({ value: sr.id, label: sr.name }))
  }

  const uppy = new Uppy({
    meta: { type: "avatar" },
    restrictions: { maxNumberOfFiles: 1 },
    autoProceed: true
  })
  uppy.use(thumbnailGenerator)

  uppy.on("thumbnail:generated", (file, preview) => {
    setPrevImg(preview)
  })

  uppy.on("file-added", function (file) {
    const reader = new FileReader()
    reader.readAsDataURL(file.data)
    reader.onloadend = function () {
      const base64data = reader.result
      setImg(base64data)
      //
    }
  })

  const onSubmitData = (data) => {
    const preparedData = {
      ...data,
      date_of_birth: dateOfBirth
    }
    if (dateOfBirth === "") {
      setBirthError(true)
    } else {
      setBirthError(false)
      onSubmit(preparedData)
    }
  }
  return (
    <Form onSubmit={handleSubmit(onSubmitData)}>
      <Row>
        <Col sm="12">
          <FormGroup>
            <InputRequiredMark />
            <Label for="username">{intl.formatMessage({ id: "SetUserCoin" })}</Label>
            <Input innerRef={register({ required: true })} invalid={errors.username && true} type="text" name="username" id="username" placeholder={user_coin_placeholder} />
          </FormGroup>
        </Col>
        <Col sm="12">
          <FormGroup>
            <Label for="password">
              <InputRequiredMark />
              {intl.formatMessage({ id: "SetUserPassword" })}
            </Label>
            <Row>
              <Col sm="8" style={{ position: "relative" }}>
                <Input
                  innerRef={register({ required: true })}
                  invalid={errors.password && true}
                  onChange={passwordHandler}
                  value={generatedPassword || passwordInput}
                  type="text"
                  name="password"
                  id="password"
                  placeholder={user_password_placeholder}
                />
                <IoMdClose
                  onClick={handleClearGeneratedPassword}
                  style={{ position: "absolute", top: 13, right: 0, cursor: "pointer", visibility: generatedPassword || passwordInput ? "visible" : "hidden" }}
                />
              </Col>
              <Col sm="4">
                <Button onClick={generate} color="primary">
                  {intl.formatMessage({ id: "SetUserEnterPasswordGenerator" })}
                </Button>
              </Col>
            </Row>
          </FormGroup>
        </Col>
        <Col sm="12">
          <FormGroup>
            <InputRequiredMark />
            <Label for="full_name">{intl.formatMessage({ id: "SetUserName" })}</Label>
            <Input type="text" name="full_name" id="full_name" placeholder={user_name_placeholder} innerRef={register({ required: true })} invalid={errors.full_name && true} />
          </FormGroup>
        </Col>
        <Col sm="12">
          <FormGroup>
            <InputRequiredMark />
            <Label for="position">{intl.formatMessage({ id: "SetUserUnvoni" })}</Label>
            <Input innerRef={register({ required: true })} invalid={errors.position && true} type="text" name="position" id="position" placeholder={user_rank_placeholder} />
          </FormGroup>
        </Col>
        <Col sm="12">
          <FormGroup>
            <InputRequiredMark />
            {birthError ? <Label className="text-danger">{intl.formatMessage({ id: "setBirthDateError" })}</Label> : <Label for="date_of_birth">{intl.formatMessage({ id: "SetUserDate" })}</Label>}
            <Cleave
              className="form-control"
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
        <Col sm="12">
          <FormGroup>
            <InputRequiredMark />
            <Label for="group">{intl.formatMessage({ id: "SetUserGroup" })}</Label>
            <Controller
              isClearable
              as={Select}
              id="group"
              onMenuOpen={() => setGroupOpen(true)}
              menuIsOpen={groupOpen}
              onMenuClose={() => setGroupOpen(false)}
              control={control}
              name="group"
              options={groupOption}
              classNamePrefix="select"
              theme={selectThemeColors}
              placeholder={user_group_placeholder}
              className={classnames("react-select ", { "is-invalid": !selectedData })}
            />
          </FormGroup>
        </Col>
        <Col sm="12">
          <FormGroup>
            <InputRequiredMark />
            <Label for="user_roles">{intl.formatMessage({ id: "SetUserAccess" })}</Label>
            <Controller
              isMulti
              isClearable
              as={Select}
              id="user_roles"
              control={control}
              name="user_roles"
              options={dostupOption}
              classNamePrefix="select"
              onMenuOpen={() => setRoleOpen(true)}
              menuIsOpen={roleOpen}
              onMenuClose={() => setRoleOpen(false)}
              theme={selectThemeColors}
              placeholder={user_access_placeholder}
              className={classnames("react-select ", { "is-invalid": !isUserRole })}
            />
          </FormGroup>
        </Col>
        {inspektor ? (
          <>
            <Col sm="12">
              <FormGroup>
                <Label for="device_uid">{intl.formatMessage({ id: "SetUserDeviceID" })}</Label>
                <Input innerRef={register()} type="text" name="device_uid" id="device_uid" placeholder={user_deviceID_placeholder} />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="mfy_id">{intl.formatMessage({ id: "SetUserMFYId" })}</Label>
                <Input innerRef={register()} type="number" name="mfy_id" id="mfy_id" placeholder={user_MFY_placeholder} />
              </FormGroup>
            </Col>
          </>
        ) : null}
        <Col style={{ zIndex: 0 }} sm="12">
          <Row>
            {groupLeader && groupLeader[0].has_group_leader === "false" ? (
              <Col span="4">
                <FormGroup>
                  <Label for="group_leader">{intl.formatMessage({ id: "SetUserLeader" })}</Label>
                  <div>
                    <CustomInput type="switch" label={<CustomInputLabel />} id="group_leader" name="group_leader" inline onChange={(e) => handleGroupChange(group_lider)} />
                  </div>
                </FormGroup>
              </Col>
            ) : null}

            <Col span="4">
              <FormGroup>
                <Label for="is_inspector">{intl.formatMessage({ id: "SetUserInspektor" })}</Label>
                <div>
                  <CustomInput type="switch" label={<CustomInputLabel />} id="is_inspector" name="is_inspector" inline onChange={(e) => handleInspektorChange(inspektor)} />
                </div>
              </FormGroup>
            </Col>
            <Col span="4">
              <FormGroup>
                <Label for="status">{intl.formatMessage({ id: "SetUserCondition" })}</Label>
                <div>
                  <CustomInput
                    type="switch"
                    label={<CustomInputLabel />}
                    id="status"
                    checked={user_status === true && "checked"}
                    name="status"
                    inline
                    onChange={(e) => handleUserChange(user_status)}
                  />
                </div>
              </FormGroup>
            </Col>
          </Row>
        </Col>
        <Col sm="12">
          {prevImg !== null ? (
            <img className="rounded mt-2 mb-2" src={prevImg} alt="avatar" />
          ) : (
            <div className="mb-2">
              <DragDrop
                note={intl.formatMessage({ id: "SetUserPhotoNote" })}
                restrictions={{
                  allowedFileType: ["image/*", ".jpg", ".jpeg", ".png"]
                }}
                locale={{
                  strings: {
                    dropHereOr: user_photoInfo
                  }
                }}
                uppy={uppy}
              />
            </div>
          )}
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

export default injectIntl(UserForm)

const CustomStyledInput = styled(CustomInput)`
  border: 2px solid red !important;
`
