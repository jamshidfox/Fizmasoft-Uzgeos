import React from "react"
import { Row, Col, Card, CardHeader, CardTitle, CardBody } from "reactstrap"
import { useSelector } from "react-redux"
import ComeLight from "../../../assets/images/pages/coming-soon.svg"
import Comedark from "../../../assets/images/pages/coming-soon-dark.svg"

import BreadCrumb from "../../components/BreadCrumb/"
const Development = () => {
  const token = localStorage.getItem("token")
  const store = useSelector((state) => state.layout.isSkinChange)

  return (
    <Row>
      <Col md="12" className="overflow-hidden">
        <Card className="overflow-hidden" style={{ height: "calc(100vh - 110px)" }}>
          <CardHeader>
            <CardTitle tag="h4" style={{ width: "100%" }}>
              <BreadCrumb />
              <hr />
            </CardTitle>
          </CardHeader>
          <CardBody>
            {/* <iframe
              className="overflow-hidden"
              src={`./extra/code?token=${token}`}
              style={{ width: "100%", height: "100%", border: "none" }}
            /> */}
            <div style={{ width: "100%", border: "none" }} className="d-flex justify-content-center">
              <img src={store === "dark" ? Comedark : ComeLight} alt="comingSoon" style={{ width: "70%" }} />
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default Development
