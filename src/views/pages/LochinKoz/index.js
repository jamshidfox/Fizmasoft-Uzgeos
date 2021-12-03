// ** React
import React, { useEffect, useState } from "react"

// ** Third Part
import { Row, Col, Card, Button } from "reactstrap"
import styled from "styled-components"
import { injectIntl } from "react-intl"

// ** Custom
import SearchForm from "./atoms/searchForm"
import BreadCrumb from "../../components/BreadCrumb/"
import NoData from "../../components/NoData"
import InfoPanel from "./atoms/Tabs"
import CarDetailsModal from "./atoms/CarDetailsModal"
import CarTable from "./atoms/CarTableData"

// Avto Qidiruv

const LochinKoz = ({ intl }) => {
  const [car_pic_data, SetCar_pic_data] = useState([])
  const [carOnMap, setCarOnMap] = useState(null)
  const [car_number, setCar_number] = useState("00A000AA")
  const [onImageLoading, setImageLoading] = useState(false)
  const [cameraTypeFilter, setCameraTypeFilter] = useState("")
  const [detailsModal, setDetailsModal] = useState(false)

  // ** Pagination
  const [currentPage, setCurrentPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [pageCount, setPageCount] = useState(1)
  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState([])
  const [renderData, setrenderData] = useState([])
  const [filteredData, setFilteredData] = useState([])

  const handlePagination = async (page) => {
    setLoading(true)
    const { selected } = page
    setCurrentPage(selected)
    const limit = rowsPerPage
    const offset = page.selected * limit
    const newData = filteredData.slice(offset, offset + limit)
    setrenderData(newData)
    setLoading(false)
  }

  useEffect(() => {
    setFilteredData(tableData)
    SetCar_pic_data([])
    setCar_number("00A000AA")
  }, [tableData])

  useEffect(() => {
    if (tableData.length === 0) return
    if (cameraTypeFilter) {
      if (filteredData.length === 0) {
        setFilteredData(tableData.filter((d) => d.type === cameraTypeFilter))
      } else {
        setFilteredData(filteredData.filter((d) => d.type === cameraTypeFilter))
      }
    }
  }, [cameraTypeFilter])

  useEffect(() => {
    setPageCount(Math.ceil(parseInt(filteredData.length) / rowsPerPage).toFixed(0))
    if (filteredData.length > 0) handlePagination({ selected: 0 })
    else setrenderData([])
  }, [filteredData])

  const onLoad = () => {
    setImageLoading(false)
  }

  return (
    <div>
      <Row>
        <Col md={12}>
          <BreadCrumb />
          <hr />
        </Col>
        <Col md={12}>
          <Card className="p-1">
            <SearchForm loading={loading} tableData={tableData} setTableData={setTableData} />
          </Card>
        </Col>
        <Col md={8}>
          <Card className="p-1" style={loading ? { height: "54vh" } : { height: "96%" }}>
            {tableData.length > 0 ? (
              <>
                <CarTable
                  tableData={tableData}
                  loading={loading}
                  pageCount={pageCount}
                  currentPage={currentPage}
                  renderData={renderData}
                  handlePagination={handlePagination}
                  SetCar_pic_data={SetCar_pic_data}
                  setCarOnMap={setCarOnMap}
                  setCar_number={setCar_number}
                  filteredData={filteredData}
                  setFilteredData={setFilteredData}
                  setCameraTypeFilter={setCameraTypeFilter}
                  setImageLoading={setImageLoading}
                  car_number={car_number}
                />
              </>
            ) : (
              <NoData />
            )}
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-1" style={{ height: "96%" }}>
            <InfoPanel onImageLoading={onImageLoading} onLoad={onLoad} car_number={car_number} car_pic_data={car_pic_data} carOnMap={carOnMap} />
            <Button disabled={car_number === "00A000AA"} onClick={() => setDetailsModal(true)} style={{ width: "100%" }} color="primary">
              {intl.formatMessage({ id: "Car details" })}
            </Button>
            {detailsModal && <CarDetailsModal carNumber={car_number} open={detailsModal} setOpen={setDetailsModal} />}
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default injectIntl(LochinKoz)
