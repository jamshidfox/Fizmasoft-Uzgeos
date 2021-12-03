import React, { useState } from "react"
import { Row, Col, Button } from "reactstrap"

import Table from "../../components/table/"
import Sidebar from "../../components/sidebar"

const Layers = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const columns = [
    { title: "Layer", data: "layer" },
    { title: "Name", data: "name" },
    { title: "Description", data: "description" },
    { title: "Status", data: "status" },
    { title: "Last Updated", data: "last_updated" }
  ]

  const data = [
    {
      name: "Layers",
      type: "FeatureCollection",
      description: "A collection of features",
      status: "active",
      last_updated: "2017-01-01"
    },
    {
      name: "Feature",
      type: "Geometry",
      description: "a collection of geometry",
      status: "inActive",
      last_updated: "2017-02-02"
    }
  ]

  const renderColumns = () => {
    return columns.map((column, i) => <th key={i}>{column.title}</th>)
  }

  const renderRows = () => {
    return data.map((row, i) => (
      <tr key={i}>
        <td> {row.name}</td>
        <td> {row.type}</td>
        <td> {row.description}</td>
        <td> {row.status}</td>
        <td> {row.last_updated}</td>
      </tr>
    ))
  }
  return (
    <div>
      <Row className="mb-2">
        <Col md="12">
          <Button.Ripple color="primary" onClick={() => toggleSidebar()}>
            {" "}
            add Layer
          </Button.Ripple>
        </Col>
      </Row>
      <Row>
        <Col sm="12" md="12">
          <Table columns={renderColumns} rows={renderRows} />
          <Sidebar size="lg" open={sidebarOpen} title="New Layer" headerClassName="mb-1" contentClassName="pt-0" toggleSidebar={toggleSidebar}>
            <h1>Hello SideBar</h1>
          </Sidebar>
        </Col>
      </Row>
    </div>
  )
}

export default Layers
