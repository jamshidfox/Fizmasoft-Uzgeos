import React, { useEffect, useState } from "react"
import CustomTable from "../../../components/table"
import { injectIntl } from "react-intl"
import { Tooltip } from "antd"
import moment from "moment"
import ClearAllFilterButton from "../components/ClearAllFilterButton"
import CarInputFilter from "../components/CarInputFilter"
import CarFilterIcon from "../components/CarFilterIcon"

const CarTable = ({
  intl,
  tableData,
  loading,
  pageCount,
  currentPage,
  renderData,
  handlePagination,
  SetCar_pic_data,
  setCarOnMap,
  setCar_number,
  filteredData,
  setFilteredData,
  setCameraTypeFilter,
  setImageLoading,
  car_number
}) => {
  const [inputCarNumberVisible, setInputCarNumberVisible] = useState(false)
  const [inputDateVisible, setInputDateVisible] = useState(false)
  const [inputCameraVisible, setInputCameraVisible] = useState(false)
  const [inputCameraTypeVisible, setInputCameraTypeVisible] = useState(false)
  const [clearAllButtonFilter, setClearAllButtonFilter] = useState(false)
  const [prevDate, setPrevDate] = useState("")
  const token = localStorage.getItem("access_token")?.replaceAll('"', "")

  const handleShowCarDetail = async (params) => {
    if (params.car_number === car_number && prevDate === params.the_date) return
    setPrevDate(params.the_date)
    setImageLoading(true)
    setCar_number(params.car_number)
    const pic = params.type === "radar" ? `${params.event_photo}?token=${token}` : `${params.event_photo}&token=${token}`
    const pic2 = params.type === "radar" ? `${params?.main_photo}?token=${token}` : `${params?.main_photo}&token=${token}`
    SetCar_pic_data([pic, pic2])
    const carAllOccurances = tableData.filter((d) => d.car_number === params.car_number && d.coordinates)
    setCarOnMap(carAllOccurances)
  }

  useEffect(() => {
    inputCarNumberVisible || inputDateVisible || inputCameraVisible || inputCameraTypeVisible ? setClearAllButtonFilter(true) : setClearAllButtonFilter(false)
  }, [inputCarNumberVisible, inputDateVisible, inputCameraVisible, inputCameraTypeVisible])

  const handleSearchByNumberFilter = (e) => {
    const text = e.target.value
    if (filteredData.length === 0) {
      const result = tableData.filter((d) => d.car_number.toLowerCase().includes(text.toLowerCase()))
      setFilteredData(result)
    } else {
      const result = filteredData.filter((d) => d.car_number.toLowerCase().includes(text.toLowerCase()))
      setFilteredData(result)
    }
  }
  const handleSearchByDateFilter = (e) => {
    const text = e.target.value
    if (filteredData.length === 0) {
      const result = tableData.filter((d) => moment(d.the_date).format("DD.MM.YYYY HH:mm:ss").includes(text))
      setFilteredData(result)
    } else {
      const result = filteredData.filter((d) => moment(d.the_date).format("DD.MM.YYYY HH:mm:ss").includes(text))
      setFilteredData(result)
    }
  }
  const handleSearchByCameraFilter = (e) => {
    const text = e.target.value
    if (filteredData.length === 0) {
      const result = tableData.filter((d) => d.object_title.toLowerCase().includes(text.toLowerCase()))
      setFilteredData(result)
    } else {
      const result = filteredData.filter((d) => d.object_title.toLowerCase().includes(text.toLowerCase()))
      setFilteredData(result)
    }
  }
  const handleClearCameraFilter = () => {
    setInputCameraVisible(false)
    setFilteredData(tableData)
  }
  const handleClearCameraTypeFilter = () => {
    setInputCameraTypeVisible(false)
    setCameraTypeFilter("")
    setFilteredData(tableData)
  }
  const handleClearDateFilter = () => {
    setInputDateVisible(false)
    setFilteredData(tableData)
  }
  const handleClearCarNumberFilter = () => {
    setInputCarNumberVisible(false)
    setFilteredData(tableData)
  }
  const handleClearAllFilter = () => {
    setFilteredData(tableData)
    setInputCarNumberVisible(false)
    setInputDateVisible(false)
    setInputCameraVisible(false)
    setInputCameraTypeVisible(false)
    setClearAllButtonFilter(false)
    setCameraTypeFilter("")
  }

  const renderRows = () => {
    if (renderData) {
      return renderData.map((row) => (
        <tr
          style={{ textAlign: "center", backgroundColor: row.the_date === prevDate && row.car_number === car_number ? "rgb(115,103,240,0.5)" : "inherit" }}
          onClick={() => handleShowCarDetail(row)}
          key={`${row.object_title}/${row.the_date}/${row.car_number}/${row.id}`}
        >
          <td>{row.car_number}</td>
          <td>{moment(row.the_date).format("DD.MM.YYYY HH:mm:ss")}</td>
          <td>
            {row.object_title.length > 11 ? (
              <Tooltip title={row.object_title} placement="right">
                {`${row.object_title.slice(0, 11)}...`}
              </Tooltip>
            ) : (
              row.object_title
            )}
          </td>
          <td>{row.type}</td>
        </tr>
      ))
    }
  }

  const columns = [
    {
      content: (
        <div>
          {!inputCarNumberVisible && intl.formatMessage({ id: "LochinKozCarNumber" })}
          {tableData.length > 0 && (
            <>
              {inputCarNumberVisible ? (
                <CarInputFilter setInputCarVisible={setInputCarNumberVisible} handleSearch={handleSearchByNumberFilter} handleClear={handleClearCarNumberFilter} lang="LochinKozCarNumber" />
              ) : (
                <CarFilterIcon setInputVisible={setInputCarNumberVisible} inputVisible={inputCarNumberVisible} />
              )}
            </>
          )}
        </div>
      ),
      name: "car_number"
    },
    {
      content: (
        <div className="ml-1">
          {!inputDateVisible && intl.formatMessage({ id: "LochinKozDate" })}
          {tableData.length > 0 && (
            <>
              {inputDateVisible ? (
                <CarInputFilter setInputCarVisible={setInputDateVisible} handleSearch={handleSearchByDateFilter} handleClear={handleClearDateFilter} lang="LochinKozDate" />
              ) : (
                <CarFilterIcon setInputVisible={setInputDateVisible} inputVisible={inputDateVisible} />
              )}
            </>
          )}
        </div>
      ),
      name: "the_date"
    },
    {
      content: (
        <div className="ml-1">
          {!inputCameraVisible && intl.formatMessage({ id: "LochinKozCamera" })}
          {tableData.length > 0 && (
            <>
              {inputCameraVisible ? (
                <CarInputFilter setInputCarVisible={setInputCameraVisible} handleSearch={handleSearchByCameraFilter} handleClear={handleClearCameraFilter} lang="LochinKozCamera" />
              ) : (
                <CarFilterIcon setInputVisible={setInputCameraVisible} inputVisible={inputCameraVisible} />
              )}
            </>
          )}
        </div>
      ),
      name: "object_title"
    },
    {
      content: (
        <div className="ml-1">
          {!inputCameraTypeVisible && intl.formatMessage({ id: "LochinKozKameraType" })}
          {tableData.length > 0 && (
            <>
              {inputCameraTypeVisible ? (
                <CarInputFilter
                  setInputCarVisible={setInputCameraTypeVisible}
                  handleSearch={(e) => setCameraTypeFilter(e.target.value)}
                  handleClear={handleClearCameraTypeFilter}
                  lang="LochinKozKameraType"
                />
              ) : (
                <CarFilterIcon setInputVisible={setInputCameraTypeVisible} inputVisible={inputCameraTypeVisible} />
              )}
            </>
          )}
        </div>
      ),
      name: "type"
    }
  ]

  const renderColumns = () => {
    return columns.map((column, index) => {
      return (
        <th style={{ textAlign: "center", padding: "10px 5px", width: "25%", height: "100%", verticalAlign: "middle" }} key={index}>
          {column.content}
        </th>
      )
    })
  }
  return (
    <div>
      <ClearAllFilterButton handleClearAllFilter={handleClearAllFilter} clearAllButtonFilter={clearAllButtonFilter} />
      <CustomTable size="md" loading={loading} columns={renderColumns} rows={renderRows} count={pageCount} currentPage={currentPage} handlePagination={handlePagination} />
    </div>
  )
}

export default injectIntl(CarTable)
