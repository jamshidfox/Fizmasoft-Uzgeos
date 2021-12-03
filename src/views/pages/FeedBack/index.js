import { useState } from "react"
import { Row, Col, Card, CardBody, Label, FormGroup, Input, Button } from "reactstrap"
import { toast } from "react-toastify"
import EditorControlled from "./atoms/editor"
import BreadCrumb from "../../components/BreadCrumb/"
import { injectIntl } from "react-intl"

const FeedBack = ({ intl }) => {
  const [editorText, setEditorText] = useState("")
  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const handleChange = (data) => {
    setName(data.target.value)
  }
  const handleChangeNumber = (data) => {
    setPhoneNumber(data.target.value)
  }

  const onClickShare = (data) => {
    toast.success("Хабар юборилди")
  }

  const namePlaceholder = intl.formatMessage({ id: "FeedBackEnterFullname" })
  const phonePlaceholder = intl.formatMessage({ id: "FeedBackEnterPhoneNumber" })

  return (
    <>
      <Row>
        <Col md="12">
          <BreadCrumb />
          <hr />
        </Col>
      </Row>
      <Card>
        <CardBody>
          <Row className="d-flex justify-content-around mt-2">
            <Col className="mb-1 ml-1" xl="5" md="12" sm="12">
              <FormGroup>
                <Label for="basicInput">{intl.formatMessage({ id: "FeedBackFullName" })}</Label>
                <Input type="text" id="basicInput" placeholder={namePlaceholder} />
              </FormGroup>
            </Col>
            <Col className="mb-1 ml-2" xl="5" md="12" sm="12">
              <FormGroup>
                <Label for="InputHelp">{intl.formatMessage({ id: "FeedBackPhoneNumber" })}</Label>{" "}
                <small className="text-muted">
                  eg. <i>+998931234556</i>
                </small>
                <Input type="number" id="InputHelp" placeholder={phonePlaceholder} maxlength="3" />
              </FormGroup>
            </Col>
            <Col className="d-flex align-items-center mr-1" xl="1" md="12" sm="12">
              <FormGroup>
                <Button color="primary" onClick={onClickShare}>
                  {intl.formatMessage({ id: "FeedBackSendButton" })}
                </Button>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xl="12" md="6" sm="12">
              <FormGroup>
                <EditorControlled setEditorText={setEditorText} />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  )
}

export default injectIntl(FeedBack)
