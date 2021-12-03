import React from "react"

import { Row, Col, Card, CardImg, Button, CardBody, CardText, CardFooter } from "reactstrap"
import PerfectScrollbar from "react-perfect-scrollbar"

import { useSelector } from "react-redux"
import { injectIntl } from "react-intl"
import NoData from "../../../../components/NoData/"

// ** JwT
import useJwt from "@src/auth/jwt/useJwt"
const config = useJwt.jwtConfig

// ** Style
import "react-perfect-scrollbar/dist/css/styles.css"
import moment from "moment"
import numeral from "numeraljs"

const UserList = ({ handleShowModal, intl }) => {
  const foydalanuvchiLogs = useSelector((state) => state.foydalanuvchi.logs)
  return (
    <div>
      {foydalanuvchiLogs && foydalanuvchiLogs.length !== 0 ? (
        <PerfectScrollbar style={{ height: "calc(100vh - 305px)" }}>
          <Row style={{ width: "100%" }}>
            {foydalanuvchiLogs.map((user) => (
              <Col md="3" lg="3" key={user.id} className="animate__animated animate__slideInLeft">
                <Card style={{ height: 500 }}>
                  <div style={{ height: 300, overflow: "hidden" }}>
                    <CardImg top src={`${config.url}/ntface-logs/${user.img}`} alt="Card cap" />
                  </div>
                  <CardBody>
                    <CardText>
                      <h5>
                        {intl.formatMessage({ id: "NtfsUserFindedPeople" })}: {numeral(user.result_length).format("0, 0")}
                      </h5>
                      <h5>
                        {intl.formatMessage({ id: "NtfsUserSearchedTime" })}: {moment(user.date_time).format("DD.MM.YYYY HH:mm:ss")}
                      </h5>
                    </CardText>
                  </CardBody>
                  <CardFooter>
                    <Button.Ripple block size="sm" color="primary" onClick={() => handleShowModal(user)}>
                      {intl.formatMessage({ id: "NtfsUserMoreInfo" })}
                    </Button.Ripple>
                  </CardFooter>
                </Card>
              </Col>
            ))}
          </Row>
        </PerfectScrollbar>
      ) : (
        <NoData style={{ height: "calc(100vh - 305px)", width: "100%" }} />
      )}
    </div>
  )
}

export default injectIntl(UserList)
