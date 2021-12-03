// ** React
import React, { useEffect, useState } from "react"

// ** Third Part
import { Row, Col, Card, Button, Progress } from "reactstrap"
import { injectIntl } from "react-intl"

// ** Custom
import SearchForm from "./atoms/searchForm"
import BreadCrumb from "../../components/BreadCrumb/"
import NoData from "../../components/NoData"
import InfoPanel from "./atoms/Tabs"
import CarDetailsModal from "./atoms/CarDetailsModal"
import CarTable from "./atoms/CarTableData"
import Spinner from "reactstrap/lib/Spinner"

// Avto Qidiruv

const LochinKoz = ({ intl }) => {
  const [car_pic_data, SetCar_pic_data] = useState([])
  const [carOnMap, setCarOnMap] = useState(null)
  const [car_number, setCar_number] = useState("00A000AA")
  const [onImageLoading, setImageLoading] = useState(false)
  const [cameraTypeFilter, setCameraTypeFilter] = useState("")
  const [detailsModal, setDetailsModal] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [checkAllDataCome, setCheckAllDataCome] = useState(0)
  const [camerasLoading, setCamerasLoading] = useState([])
  const [filterProps, setFilterProps] = useState([])
  const [searchCrossroadTimer, setSearchCrossroadTimer] = useState(null)
  const [searchPerimeterTimer, setSearchPerimeterTimer] = useState(null)
  const [searchRadarTimer, setSearchRadarTimer] = useState(null)
  const [tableFilter, setTableFilter] = useState({})
  const [filteredColorValues, setFilteredColorValues] = useState([])
  const [filteredCountryValues, setFilteredCountryValues] = useState([])
  const [filteredModelValues, setFilteredModelValues] = useState([])
  const [crossroadErrorLoading, setCrossroadErrorLoading] = useState(false)
  const [perimeterErrorLoading, setPerimeterErrorLoading] = useState(false)
  const [radarErrorLoading, setRadarErrorLoading] = useState(false)

  // ** Pagination
  const [currentPage, setCurrentPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(30)
  const [pageCount, setPageCount] = useState(1)
  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState([])
  const [renderData, setrenderData] = useState([])
  const [filteredData, setFilteredData] = useState([])

  const handlePagination = async (page) => {
    setLoading(true)
    const { selected } = page
    setCurrentPage(selected)
    // const limit = rowsPerPage
    // const offset = page.selected * limit
    // const newData = filteredData.slice(offset, offset + limit)
    setrenderData(tableData)
    // setLoading(false)
  }

  useEffect(() => {
    setrenderData(tableData)
    SetCar_pic_data([])
    setCar_number("00A000AA")
  }, [tableData])

  useEffect(() => {
    // if (tableData.length === 0) return
    // if (cameraTypeFilter) {
    //   if (filteredData.length === 0) {
    //     setFilteredData(tableData.filter((d) => d.type === cameraTypeFilter))
    //   } else {
    //     setFilteredData(filteredData.filter((d) => d.type === cameraTypeFilter))
    //   }
    // }
  }, [cameraTypeFilter])

  useEffect(() => {
    // setPageCount(Math.ceil(parseInt(filteredData.length) / rowsPerPage).toFixed(0))
    // if (filteredData.length > 0) handlePagination({ selected: 0 })
    // else setrenderData([])
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
            <SearchForm
              setFilterProps={setFilterProps}
              setCheckAllDataCome={setCheckAllDataCome}
              setTotalCount={setTotalCount}
              setTableLoading={setLoading}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              setPageCount={setPageCount}
              rowsPerPage={rowsPerPage}
              loading={loading}
              tableData={tableData}
              setTableData={setTableData}
              setCamerasLoading={setCamerasLoading}
              searchRadarTimer={searchRadarTimer}
              searchPerimeterTimer={searchPerimeterTimer}
              searchCrossroadTimer={searchCrossroadTimer}
              setSearchCrossroadTimer={setSearchCrossroadTimer}
              setSearchRadarTimer={setSearchRadarTimer}
              setSearchPerimeterTimer={setSearchPerimeterTimer}
              tableFilter={tableFilter}
              setCrossroadErrorLoading={setCrossroadErrorLoading}
              setPerimeterErrorLoading={setPerimeterErrorLoading}
              setRadarErrorLoading={setRadarErrorLoading}
            />
          </Card>
        </Col>
        <Col md={8}>
          <Card className="p-1" style={loading ? { height: "54vh" } : { height: "96%" }}>
            {checkAllDataCome.cond ? (
              <div className="d-flex justify-content-around mb-1">
                {checkAllDataCome.arr && checkAllDataCome.arr[0].data.length > 0 ? (
                  <div className="w-25">
                    <Progress
                      color={crossroadErrorLoading ? "danger" : camerasLoading === "chorraxa" ? "success" : "primary"}
                      animated={crossroadErrorLoading ? false : !camerasLoading.includes("chorraxa")}
                      value={camerasLoading.includes("chorraxa") || crossroadErrorLoading ? 100 : 50}
                    >
                      {intl.formatMessage({ id: "NavCROSSROAD" })}
                    </Progress>
                  </div>
                ) : null}

                {checkAllDataCome.arr && checkAllDataCome.arr[1].data.length > 0 ? (
                  <div className="w-25">
                    <Progress
                      color={perimeterErrorLoading ? "danger" : camerasLoading === "perimeter" ? "success" : "primary"}
                      animated={perimeterErrorLoading ? false : !camerasLoading.includes("perimeter")}
                      value={camerasLoading.includes("perimeter") || perimeterErrorLoading ? 100 : 50}
                    >
                      {intl.formatMessage({ id: "NavPERIMETER" })}
                    </Progress>
                  </div>
                ) : null}
                {checkAllDataCome.arr && checkAllDataCome.arr[2].data.length > 0 ? (
                  <div className="w-25">
                    <Progress
                      color={radarErrorLoading ? "danger" : camerasLoading === "radar" ? "success" : "primary"}
                      animated={radarErrorLoading ? false : !camerasLoading.includes("radar")}
                      value={camerasLoading.includes("radar") || radarErrorLoading ? 100 : 50}
                    >
                      {intl.formatMessage({ id: "NavRADAR" })}
                    </Progress>
                  </div>
                ) : null}
              </div>
            ) : null}
            {loading ? (
              <div className="mt-3" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                <Spinner />
              </div>
            ) : tableData.length === 0 ? (
              <NoData />
            ) : (
              <>
                <CarTable
                  tableData={tableData}
                  pageCount={pageCount}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
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
                  totalCount={totalCount}
                  filterProps={filterProps}
                  setTableFilter={setTableFilter}
                  tableFilter={tableFilter}
                  setFilteredColorValues={setFilteredColorValues}
                  setFilteredModelValues={setFilteredModelValues}
                  setFilteredCountryValues={setFilteredCountryValues}
                  filteredModelValues={filteredModelValues}
                  filteredColorValues={filteredColorValues}
                  filteredCountryValues={filteredCountryValues}
                />
                <p className="m-0" style={{ position: "absolute", bottom: 10, fontWeight: "bold" }}>
                  {intl.formatMessage({ id: "TableTotal" })}: {new Intl.NumberFormat().format(totalCount)}
                </p>
              </>
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
