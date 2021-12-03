import React, { useContext, useState } from "react"
import CustomTable from "../../../components/table"
import { injectIntl } from "react-intl"
import { Tooltip } from "antd"
import moment from "moment"
import CarFilterIcon from "../components/CarFilterIcon"
import { IntlContext } from "../../../../utility/context/Internationalization"

const CarTable = ({
  intl,
  tableData,
  loading,
  pageCount,
  currentPage,
  setCurrentPage,
  renderData,
  handlePagination,
  SetCar_pic_data,
  setCarOnMap,
  setCar_number,
  setImageLoading,
  car_number,
  totalCount,
  filterProps,
  setTableFilter,
  tableFilter,
  setFilteredColorValues,
  setFilteredCountryValues,
  setFilteredModelValues,
  filteredColorValues,
  filteredCountryValues,
  filteredModelValues
}) => {
  const [prevSelected, setPrevSelected] = useState("")
  const token = localStorage.getItem("access_token")?.replaceAll('"', "")
  const [colorDropdown, setColorDropdown] = useState(false)
  const [countryDropdown, setCountryDropdown] = useState(false)
  const [modelDropdown, setModelDropdown] = useState(false)

  const toggleColorDropdown = () => {
    setColorDropdown(!colorDropdown)
    setCountryDropdown(false)
    setModelDropdown(false)
  }
  const toggleCountryDropdown = () => {
    setCountryDropdown(!countryDropdown)
    setColorDropdown(false)
    setModelDropdown(false)
  }
  const toggleModelDropdown = () => {
    setModelDropdown(!modelDropdown)
    setCountryDropdown(false)
    setColorDropdown(false)
  }

  const handleShowCarDetail = async (params) => {
    if (params.car_number === car_number && prevSelected === params.id) return
    setPrevSelected(params.id)
    setImageLoading(true)
    setCar_number(params.car_number)
    const pic = params.type === "radar" ? `${params.event_photo}?token=${token}` : `${params.event_photo}&token=${token}`
    const pic2 = params.type === "radar" ? `${params?.main_photo}?token=${token}` : `${params?.main_photo}&token=${token}`
    SetCar_pic_data([pic, pic2])
    const carAllOccurances = tableData.filter((d) => d.car_number === params.car_number && d.coordinates)
    setCarOnMap(carAllOccurances)
  }

  const handleKeyDown = (e) => {
    const { keyCode: code } = e
    if (code === 38 || code === 40) {
      let flag = false
      renderData.forEach((data, i) => {
        if (data.id === prevSelected) {
          flag = true
          code === 38 ? handleShowCarDetail(renderData[i >= 1 ? i - 1 : i]) : handleShowCarDetail(renderData[i <= renderData.length - 2 ? i + 1 : i])
        }
      })
      if (!flag) return handleShowCarDetail(renderData[0])
    } else if (code === 37 || code === 39) {
      code === 37 ? setCurrentPage(currentPage === 0 ? 0 : currentPage - 1) : setCurrentPage(currentPage === pageCount - 1 ? pageCount - 1 : currentPage + 1)
    }
  }

  const intlContext = useContext(IntlContext)

  const colorByLang = (color) => {
    const colorLang = filterProps?.colors?.filter((d) => d.key === color)
    return colorLang?.map((d) => (intlContext === "en" ? d.value_en : intlContext === "ru" ? d.value_ru : intlContext === "uz" ? d.value_uz : d.value_kr))
  }
  const countryByLang = (country) => {
    const countryLang = filterProps?.countries?.filter((d) => d.key === country)
    return countryLang?.map((d) => (intlContext === "en" ? d.value_en : intlContext === "ru" ? d.value_ru : intlContext === "uz" ? d.value_uz : d.value_kr))
  }
  const modelByLang = (model) => {
    const modelLang = filterProps?.models?.filter((d) => d.key === model)
    return modelLang?.map((d) => (intlContext === "en" ? d.value_en : intlContext === "ru" ? d.value_ru : intlContext === "uz" ? d.value_uz : d.value_kr))
  }

  const renderRows = () => {
    if (renderData) {
      return renderData.map((row) => (
        <tr
          style={{ textAlign: "center", backgroundColor: row.id === prevSelected && row.car_number === car_number ? "rgb(115,103,240,0.5)" : "inherit" }}
          onClick={() => handleShowCarDetail(row)}
          key={`${row.object_title}/${row.the_date}/${row.car_number}/${row.id}/${row.color}/${row.country}/${row.model}`}
        >
          <td style={{ width: "10%" }}>{row.car_number !== "" ? row.car_number : intl.formatMessage({ id: "Undefined" })}</td>
          <td style={{ width: "15%" }}>{moment(row.the_date).format("DD.MM.YYYY HH:mm:ss")}</td>
          <td style={{ width: "10%" }}>
            {row.object_title.length > 11 ? (
              <Tooltip title={row.object_title} placement="right">
                {`${row.object_title.slice(0, 11)}...`}
              </Tooltip>
            ) : (
              row.object_title
            )}
          </td>
          <td style={{ width: "10%" }}>
            {row.rules.length > 11 ? (
              <Tooltip title={row.rules} placement="right">
                {`${row.rules.slice(0, 11)}...`}
              </Tooltip>
            ) : !row.rules ? (
              intl.formatMessage({ id: "Undefined" })
            ) : (
              row.rules
            )}
          </td>
          <td style={{ width: "10%" }}>{!row.country ? intl.formatMessage({ id: "Undefined" }) : countryByLang(row.country)}</td>
          <td style={{ width: "10%" }}>{row.color === null ? intl.formatMessage({ id: "Undefined" }) : colorByLang(row.color)}</td>
          <td style={{ width: "10%" }}>
            {!row.model ? (
              intl.formatMessage({ id: "Undefined" })
            ) : (
              <Tooltip title={modelByLang(row.model)} placement="right">
                {modelByLang(row.model)}
              </Tooltip>
            )}
          </td>
          <td style={{ width: "10%" }}>{row.type}</td>
          {/* <td style={{ width: "10%" }}>{!row.country ? intl.formatMessage({ id: "Undefined" }) : row.country}</td> */}
          {/* <td style={{ width: "10%" }}>{row.color === null ? intl.formatMessage({ id: "Undefined" }) : row.color}</td> */}
          {/* <td style={{ width: "10%" }}>{!row.model ? intl.formatMessage({ id: "Undefined" }) : row.model}</td> */}
        </tr>
      ))
    }
  }

  const handleClick = () => {
    setTableFilter({ ...tableFilter, colors: filteredColorValues, models: filteredModelValues, countries: filteredCountryValues })
  }

  const columns = [
    {
      content: <div>{intl.formatMessage({ id: "LochinKozCarNumber" })}</div>,
      name: "car_number"
    },
    {
      content: <div>{intl.formatMessage({ id: "LochinKozDate" })}</div>,
      name: "the_date"
    },
    {
      content: <div>{intl.formatMessage({ id: "LochinKozCamera" })}</div>,
      name: "object_title"
    },
    {
      content: <div>{intl.formatMessage({ id: "LochinKozRule" })}</div>,
      name: "rules"
    },
    {
      content: (
        <div style={{ position: "relative" }}>
          {intl.formatMessage({ id: "LochinKozCarCountry" })}
          <CarFilterIcon
            filterProps={filterProps.countries}
            toggleDropdown={toggleCountryDropdown}
            dropdownOpen={countryDropdown}
            valueSelect={filteredCountryValues}
            setValueSelect={setFilteredCountryValues}
            handleClick={handleClick}
          />
        </div>
      ),
      name: "country"
    },
    {
      content: (
        <div style={{ position: "relative" }}>
          {intl.formatMessage({ id: "LochinKozColor" })}
          <CarFilterIcon
            filterProps={filterProps.colors}
            toggleDropdown={toggleColorDropdown}
            dropdownOpen={colorDropdown}
            valueSelect={filteredColorValues}
            setValueSelect={setFilteredColorValues}
            handleClick={handleClick}
          />
        </div>
      ),
      name: "color"
    },
    {
      content: (
        <div style={{ position: "relative" }}>
          {intl.formatMessage({ id: "LochinKozCarModel" })}
          <CarFilterIcon
            filterProps={filterProps.models}
            toggleDropdown={toggleModelDropdown}
            dropdownOpen={modelDropdown}
            valueSelect={filteredModelValues}
            setValueSelect={setFilteredModelValues}
            handleClick={handleClick}
          />
        </div>
      ),
      name: "model"
    },

    {
      content: <div>{intl.formatMessage({ id: "LochinKozKameraType" })}</div>,
      name: "type"
    }
  ]

  const renderColumns = () => {
    return columns.map((column, index) => {
      return (
        <th scope="col" style={{ textAlign: "center", padding: "10px 5px", height: "100%", verticalAlign: "middle", position: "sticky", top: -2 }} key={index}>
          {column.content}
        </th>
      )
    })
  }
  return (
    <div style={{ height: "54vh" }} tabIndex="0" onKeyDown={handleKeyDown}>
      <CustomTable totalCount={totalCount} size="sm" loading={loading} columns={renderColumns} rows={renderRows} count={pageCount} currentPage={currentPage} handlePagination={handlePagination} />
    </div>
  )
}

export default injectIntl(CarTable)
