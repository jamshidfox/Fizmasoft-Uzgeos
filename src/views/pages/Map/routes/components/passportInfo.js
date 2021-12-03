import React from "react"
import Card from "reactstrap/lib/Card"
import CardImg from "reactstrap/lib/CardImg"
import { Row, Col } from "reactstrap"
import CardHeader from "reactstrap/lib/CardHeader"
import Spinner from "reactstrap/lib/Spinner"
import { injectIntl } from "react-intl"

const PassportInfo = ({ intl, data, loading }) => {
  return (
    <Card>
      <CardHeader>
        <div style={{ width: "100%" }}>
          <h6 style={{ textAlign: "center" }}>{intl.formatMessage({ id: "PassportHeader" })}</h6>
          <hr />
        </div>
      </CardHeader>
      <Row>
        <Col md="12">
          <div className="d-flex justify-content-center">
            {intl.formatMessage({ id: "PassportText" })}
            <div style={{ display: "flex", flexDirection: "column", marginLeft: "1em" }}>
              <h6>{intl.formatMessage({ id: "PassportType" })}</h6> <span style={{ textAlign: "center" }}>P</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: "1em" }}>
              <h6>{intl.formatMessage({ id: "PassportCountryCode" })}</h6>
              <span style={{ textAlign: "center" }}>UZB</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: "1em" }}>
              <h6>{intl.formatMessage({ id: "PassportNumber" })}</h6>
              <span style={{ textAlign: "center" }}>{data.pPsp}</span>
            </div>
          </div>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col md="4">
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%"
              }}
            >
              <Spinner color="primary" size="lg" />
            </div>
          ) : (
            <CardImg src={`data:image/png;base64,${data.pPhoto}`}></CardImg>
          )}
        </Col>
        <Col md="6">
          <div style={{ display: "flex", flexDirection: "column", marginLeft: "1em", marginBottom: "1em" }}>
            <h6>{intl.formatMessage({ id: "PassportSurname" })}</h6>
            <span>{data.pSurname}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginLeft: "1em", marginBottom: "1em" }}>
            <h6>{intl.formatMessage({ id: "PassportGivenName" })}</h6>
            <span>{data.pName}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginLeft: "1em", marginBottom: "1em" }}>
            <h6>{intl.formatMessage({ id: "PassportDate" })}</h6>
            <span>{data.pDateBirth}</span>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: "1em", marginBottom: "1em" }}>
              <h6>{intl.formatMessage({ id: "PassportSex" })}</h6>
              <span>{data.pSex}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: "1em" }}>
              <h6>{intl.formatMessage({ id: "PassportPlaceOfBirth" })}</h6>
              <span>{data.pPlaceBirth}</span>
            </div>
          </div>
          <div style={{ display: "flex", marginBottom: "1em" }}>
            <div className="d-flex">
              <div style={{ display: "flex", flexDirection: "column", marginLeft: "1em" }}>
                <h6>{intl.formatMessage({ id: "PassportDateOfissue" })}</h6>
                <span>{data.pIssueDate}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", marginLeft: "1em" }}>
                <h6>{intl.formatMessage({ id: "PassportIssuedBy" })}</h6>
                <span>{data.pIssuedBy}</span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  )
}

export default injectIntl(PassportInfo)
