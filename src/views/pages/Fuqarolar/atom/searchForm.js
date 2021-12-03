import React, { useEffect, useState } from "react"
import { FormGroup, Row, Col, Input, Form, Button, Label } from "reactstrap"
import { useForm } from "react-hook-form"
import { IoMdClose } from "react-icons/io"
import { injectIntl } from "react-intl"
import { withRouter } from "react-router-dom"
import Cleave from "cleave.js/react"

const SearchForm = ({ onSubmit, picker, intl, history, fuqarolarAge, ageInputMax, setAgeInputMax, ageInputMin, setAgeInputMin }) => {
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [ageSelect, setAgeSelect] = useState("")

  const surnamePlaceholder = intl.formatMessage({ id: "FuqaroSearchEnterSurname" })
  const namePlaceholder = intl.formatMessage({ id: "FuqaroSearchEnterName" })
  const patronymicPlaceholder = intl.formatMessage({ id: "FuqaroSearchEnterPatronym" })
  const passportPlaceholder = intl.formatMessage({ id: "FuqaroSearchEnterPassport" })

  const getDefaults = (state) => {
    if (!state) return {}
    const [surname, name, patronym] = state.detail.split(" ")
    return { surname, name, patronym }
  }

  const { register, errors, handleSubmit, control } = useForm({
    defaultValues: getDefaults(history.location.state)
  })

  const handleGetFormValues = (data) => {
    if (data) {
      Object.keys(data).map(function (key, index) {
        if (data[key] !== "") {
          const readyData = {
            ...data,
            from: fromDate || "",
            to: toDate || ""
          }
          onSubmit(readyData)
        }
      })
    }
  }
  const handleClearAge = () => {
    setAgeSelect("")
    setAgeInputMax("")
    setAgeInputMin("")
  }
  return (
    <Form onSubmit={handleSubmit(handleGetFormValues)}>
      <Row>
        <Col md="2" sm="12">
          <FormGroup>
            <Label for="surname">{intl.formatMessage({ id: "FuqaroSearchSurname" })}</Label>
            <Input placeholder={surnamePlaceholder} id="surname" name="surname" innerRef={register()} invalid={errors.surname && true} />
          </FormGroup>
        </Col>
        <Col md="2" sm="12">
          <FormGroup>
            <Label for="name">{intl.formatMessage({ id: "FuqaroSearchName" })}</Label>
            <Input placeholder={namePlaceholder} id="name" name="name" innerRef={register()} invalid={errors.name && true} />
          </FormGroup>
        </Col>
        <Col md="2" sm="12">
          <FormGroup>
            <Label for="patronym">{intl.formatMessage({ id: "FuqaroSearchPatronym" })}</Label>
            <Input placeholder={patronymicPlaceholder} id="patronym" name="patronym" innerRef={register()} invalid={errors.family_name && true} />
          </FormGroup>
        </Col>
        <Col md="2" sm="12">
          <FormGroup>
            <Label for="age">{intl.formatMessage({ id: "Age" })}</Label>
            {ageSelect === "custom" ? (
              <div style={{ position: "relative", display: "flex" }}>
                <Cleave
                  placeholder={`${intl.formatMessage({ id: "FuqaroStartAge" })}`}
                  className="form-control"
                  options={{ blocks: [3] }}
                  id="from"
                  autoFocus
                  name="from"
                  onChange={(e) => setAgeInputMin(+e.target.value)}
                />
                <Cleave
                  placeholder={`${intl.formatMessage({ id: "FuqaroEndAge" })}`}
                  className="form-control"
                  options={{ blocks: [3] }}
                  style={{ margin: "0px 5px" }}
                  id="to"
                  name="to"
                  onChange={(e) => setAgeInputMax(+e.target.value)}
                />

                <IoMdClose onClick={handleClearAge} style={{ position: "absolute", top: 14, right: -10 }} className="cursor-pointer" />
              </div>
            ) : null}
            {ageSelect !== "custom" ? (
              <Input className="cursor-pointer" onChange={(e) => setAgeSelect(e.target.value)} type="select" innerRef={register()} name="age" id="age" invalid={errors.age && true}>
                <option value="" hidden>
                  {intl.formatMessage({ id: "FuqaroAgeSelect" })}
                </option>
                {fuqarolarAge.map((d) => (
                  <option value={[d.from, d.to]} key={d.id}>
                    {intl.formatMessage({ id: d.title })}
                  </option>
                ))}
                <option value="custom">{intl.formatMessage({ id: "FuqaroAgeSelectCustom" })}</option>
              </Input>
            ) : null}
          </FormGroup>
        </Col>
        <Col md="2" sm="12">
          <FormGroup>
            <Label for="passport">{intl.formatMessage({ id: "FuqaroSearchPassport" })}</Label>
            <Input placeholder={passportPlaceholder} id="passport" name="passport" innerRef={register()} invalid={errors.passport && true} pattern="^[a-zA-Z]{1,2}[0-9]{1,7}$" maxLength={9} />
          </FormGroup>
        </Col>

        <Col sm="2">
          <FormGroup className="d-flex mb-0">
            <Button.Ripple className="mt-2" color="primary" type="submit">
              {/* Қидириш */}
              {intl.formatMessage({ id: "FuqaroSearching" })}
            </Button.Ripple>
          </FormGroup>
        </Col>
      </Row>
    </Form>
  )
}

export default withRouter(injectIntl(SearchForm))
