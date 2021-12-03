import React from "react"

import { Row, Col, Card, CardBody, CardTitle, CardText, Button } from "reactstrap"

const token = JSON.parse(localStorage.getItem("userData"))

const ProfileStatus = () => {
  return (
    <Card>
      <CardBody>
        <CardText>
          {token?.services.map((srv, i) => (
            <Row className="mt-2" key={i}>
              <Col md="10">{srv.name.toUpperCase()}</Col>
              <Col md="2">
                <Button className="btn-icon" color={srv.status ? "success" : "danger"}></Button>
              </Col>
            </Row>
          ))}
        </CardText>
      </CardBody>
    </Card>
  )
}

export default ProfileStatus
