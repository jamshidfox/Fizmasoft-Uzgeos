import React, { useState } from "react"

// ** Third Part
import { Row, Col, Card } from "reactstrap"
import styled from "styled-components"

// ** Custom component
import SearchForm from "./atoms/searchForm"
import BreadCrumb from "../../components/BreadCrumb/"
import LFMap from "../Map/utils/LFMap"

const GPSHistory = () => {
  const [active, setActive] = useState(false)

  const handleSubmit = (e) => {
    setActive(!active)
  }

  return (
    <Row>
      <Col md={12}>
        <SearCarsBox>
          <Card style={{ paddingLeft: "1em", paddingTop: "0.5em" }}>
            <SearchForm onSubmit={handleSubmit} />
          </Card>
        </SearCarsBox>
      </Col>
      <Col md="12">
        <MapContainer className="rounded">
          <BreadCrumb />
          <hr />
          <LFMap resize={active} />
        </MapContainer>
      </Col>
    </Row>
  )
}

export default GPSHistory

const SearCarsBox = styled.div`
  margin-top: 1em;
  margin-bottom: 2em;
`

const MapContainer = styled(Card)`
  height: calc(100vh - 375px);
  width: 100%;
  background-color: #fff;
  padding: 1em;
`
