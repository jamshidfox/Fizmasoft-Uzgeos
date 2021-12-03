import { Fragment, useState } from "react"
import { Check } from "react-feather"
import { toast } from "react-toastify"
import Avatar from "@components/avatar"
import { useForm } from "react-hook-form"
import { selectThemeColors } from "@utils"

import { Row, Col, Card, CardHeader, CardTitle, CardBody, Button, Form, FormGroup, Label } from "reactstrap"

import EditorControlled from "./moleculas/editor"
import Select from "react-select"

const options = [
  { value: "iib1", label: "IIB1", color: "#00B8D9", isFixed: true },
  { value: "iib2", label: "IIB2", color: "#0052CC", isFixed: true },
  { value: "iib3", label: "IIB3", color: "#5243AA", isFixed: true },
  { value: "iib4", label: "IIB4", color: "#FF5630", isFixed: false },
  { value: "iib5", label: "IIB5", color: "#FF8B00", isFixed: false },
  { value: "iib6", label: "IIB6", color: "#FFC400", isFixed: false }
]

const regionOptions = [
  { value: "mirobod", label: "Миробод", color: "#00B8D9", isFixed: true },
  { value: "olmazor", label: "Олмазор", color: "#0052CC", isFixed: true }
]

const gomOption = [
  { value: "gom1", label: "Гом 1", color: "#00B8D9", isFixed: true },
  { value: "gom2", label: "Гом 2", color: "#0052CC", isFixed: true }
]
const textOfTostify = (text) => {
  let reTurnText = " "
  if (text.length >= 20) {
    reTurnText = " ........"
  } else {
    reTurnText = " "
  }
  return reTurnText
}

const SuccessToast = ({ data }) => {
  return (
    <Fragment>
      <div className="toastify-header">
        <div className="title-wrapper">
          <Avatar size="sm" color="success" icon={<Check size={12} />} />
          <h6 className="toast-title">Form Submitted!</h6>
        </div>
      </div>
      <div className="toastify-body">
        <ul className="list-unstyled mb-0">
          <li>
            <strong>ИИБ</strong>:{" "}
            {data.name.map((so, i) => (
              <span key={i}>{so.label} </span>
            ))}
          </li>
          <li>
            <strong>Tuman</strong>:{" "}
            {data.tuman.map((so, i) => (
              <span key={i}>{so.label} </span>
            ))}
          </li>
          <li>
            <strong>Gom</strong>:{" "}
            {data.gom.map((so, i) => (
              <span key={i}>{so.label} </span>
            ))}
          </li>
          <li>
            <strong>Text</strong>: {data.text.slice(0, 20)}
            {textOfTostify(data.text)}
          </li>
        </ul>
      </div>
    </Fragment>
  )
}

const Message = () => {
  const { register, errors, handleSubmit } = useForm()
  const [editorText, setEditorText] = useState("")
  const [selectedOption, setSelectedOption] = useState("")
  const [selectedTuman, setSelectedTuman] = useState("")
  const [selectedGom, setSelectedTGom] = useState("")

  const onSubmit = (data) => {
    const newData = {
      name: selectedOption,
      text: editorText.text,
      tuman: selectedTuman,
      gom: selectedGom
    }
    toast.success(<SuccessToast data={newData} />, { hideProgressBar: true })
  }

  const handleChangeSelect = (data) => {
    setSelectedOption(data)
  }

  const handleChangeTuman = (data) => {
    setSelectedTuman(data)
  }

  const handleChangeGom = (data) => {
    setSelectedTGom(data)
  }

  const btnYuborish = () => {
    let btn = (
      <Button.Ripple className="mr-1" color="primary" type="submit">
        Йубориш
      </Button.Ripple>
    )
    if (editorText.text === undefined || selectedOption.length === 0 || selectedTuman.length === 0 || selectedGom.length === 0) {
      btn = (
        <Button.Ripple className="mr-1" disabled color="primary" type="submit">
          Йубориш
        </Button.Ripple>
      )
    } else if (editorText.text === "" || selectedOption.length === 0) {
      btn = (
        <Button.Ripple className="mr-1" disabled color="primary" type="submit">
          Йубориш
        </Button.Ripple>
      )
    }
    return btn
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Хабар Юбориш</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row style={{ width: "99%", margin: "0 auto" }}>
            <Col md="4">
              <FormGroup>
                <Select
                  id="firstNameBasic"
                  name="firstNameBasic"
                  options={options}
                  onChange={handleChangeSelect}
                  value={selectedOption}
                  theme={selectThemeColors}
                  innerRef={register({ required: true })}
                  invalid={errors.firstNameBasic && true}
                  placeholder="Фойдаланувчиларни танланг"
                  isMulti
                  className="react-select"
                  classNamePrefix="select"
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <Select
                id="region"
                name="region"
                options={regionOptions}
                theme={selectThemeColors}
                value={selectedTuman}
                onChange={handleChangeTuman}
                innerRef={register({ required: true })}
                invalid={errors.region && true}
                placeholder="Туманни танланг"
                isMulti
                className="react-select"
                classNamePrefix="select"
              />
            </Col>
            <Col md="4">
              <Select
                id="gom"
                name="gom"
                options={gomOption}
                theme={selectThemeColors}
                value={selectedGom}
                onChange={handleChangeGom}
                innerRef={register({ required: true })}
                invalid={errors.region && true}
                placeholder="Гомни танланг"
                isMulti
                className="react-select"
                classNamePrefix="select"
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <FormGroup>
                <EditorControlled
                  id="lastNameBasic"
                  name="lastNameBasic"
                  invalid={errors.lastNameBasic && true}
                  innerRef={register({ required: true })}
                  setEditorText={setEditorText}
                  // className='react-select'
                  // classNamePrefix='select'
                />
              </FormGroup>
            </Col>
          </Row>

          <FormGroup className="d-flex justify-content-end mb-0">{btnYuborish()}</FormGroup>
        </Form>
      </CardBody>
    </Card>
  )
}

export default Message
