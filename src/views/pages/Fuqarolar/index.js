// ** React
import React, { useEffect, useState } from "react"

// ** Third Part
import { Row, Col, Card, Badge } from "reactstrap"

// ** Custom
import CustomTable from "../../components/table"
import SearchForm from "./atom/searchForm"
import BreadCrumb from "../../components/BreadCrumb/"

// ** Store & Reducer
import { useSelector, useDispatch } from "react-redux"

// ** Service
import { handleSearchFuqarolar, handleGetUserDetails, handleGetFuqaroLocation, handleGetUserAge } from "./store/actions/"
import Collapse from "reactstrap/lib/Collapse"
import { toast } from "react-toastify"
import { injectIntl } from "react-intl"
import Passport from "../../components/Passport/Passport"

const Fuqarolar = ({ intl }) => {
  const [picker, setPicker] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchedInfo, setSearchedInfo] = useState({})
  const [showAddressDetails, setShowAddressDetails] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [ageInputMin, setAgeInputMin] = useState("")
  const [ageInputMax, setAgeInputMax] = useState("")

  // **  Action
  const dispatch = useDispatch()

  // ** Store
  const fuqarolarData = useSelector((state) => state.fuqarolar.data)
  const fuqarolarCount = useSelector((state) => state.fuqarolar.count)
  const fuqaroDetails = useSelector((state) => state.fuqarolar.userDetails)
  const fuqarolarLocation = useSelector((state) => state.fuqarolar.userLocation)
  const fuqarolarAge = useSelector((state) => state.fuqarolar.userAge)

  // ** pagination
  const [currentPage, setCurrentPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [pageCount, setPageCount] = useState(1)

  useEffect(() => {
    setPageCount(Math.ceil(fuqarolarCount / rowsPerPage).toFixed(0))
  }, [fuqarolarCount])

  useEffect(() => {
    dispatch(handleGetUserAge())
  }, [])

  const columns = [
    {
      // title: "Фамиляси",
      title: intl.formatMessage({ id: "FuqaroSurname" }),
      name: "surname"
    },
    {
      // title: "Исми",
      title: intl.formatMessage({ id: "FuqaroName" }),
      name: "name"
    },
    {
      // title: "Шарифи",
      title: intl.formatMessage({ id: "FuqaroPatronym" }),
      name: "patronym"
    },
    {
      // title: "Туғилган санаси",
      title: intl.formatMessage({ id: "FuqaroBirthDay" }),
      name: "birthday"
    },
    {
      // title: "Паспорт рақами",
      title: intl.formatMessage({ id: "FuqaroPassport" }),
      name: "passport"
    },
    {
      // title: "Маьлумоти",
      title: intl.formatMessage({ id: "FuqaroEducation" }),
      name: "education_status"
    },
    {
      // title: "Яшаш манзили",
      title: intl.formatMessage({ id: "FuqaroAddress" }),
      name: "address"
    },

    {
      // title: "Касби",
      title: intl.formatMessage({ id: "FuqaroProfession" }),
      name: "profession"
    },
    {
      // title: "Оилавий холати",
      title: intl.formatMessage({ id: "FuqaroFamily" }),
      name: "family_status"
    },
    {
      // title: "Ижарада туриши",
      title: intl.formatMessage({ id: "FuqaroRent" }),
      name: "temp_is_rent"
    }
  ]

  const renderColumns = () => {
    return columns.map((column, index) => {
      return <th key={column.name}>{column.title}</th>
    })
  }

  const handleShowUser = async (params) => {
    if (params.pcitizen && params.pcitizen !== "null") {
      const newData = {
        pcitizen: params.pcitizen
      }
      await dispatch(handleGetUserDetails(newData))
      await dispatch(handleGetFuqaroLocation(params.kadastr_raqami))
      setIsModal(true)
    } else {
      toast.info("Фуқаро ҳақида маълумот йўқ")
    }
  }

  const handleSearchFuqaro = async (params) => {
    if (params.age) {
      params.from = +params.age.split(",")[0]
      params.to = +params.age.split(",")[1]
    } else {
      params.from = ageInputMin
      params.to = ageInputMax
    }

    delete params.age
    Object.keys(params).forEach((key) => (params[key] === undefined || params[key] === "") && delete params[key])
    setSearchedInfo(params)
    const limit = rowsPerPage
    const offset = currentPage * limit
    setLoading(true)
    await dispatch(handleSearchFuqarolar(params, limit, offset))
    setLoading(false)
  }

  const handlePagination = async (page) => {
    const { selected } = page
    const limit = rowsPerPage
    const offset = page.selected * limit
    setCurrentPage(selected)
    setLoading(true)
    await dispatch(handleSearchFuqarolar(searchedInfo, limit, offset))
    setLoading(false)
  }

  const renderRows = () => {
    return fuqarolarData.map((row, index) => (
      <tr key={index} onClick={() => handleShowUser(row)}>
        <td>{row.surname}</td>
        <td>{row.name}</td>
        <td>{row.patronym}</td>
        <td>{row.birthday}</td>
        <td>{row.passport}</td>
        <td>{row.education_status}</td>
        <td onClick={() => setShowAddressDetails(!showAddressDetails)}>
          {row.address.length > 10 ? `${row.address.slice(0, 13)}...` : row.address}
          <Collapse isOpen={showAddressDetails}>{row.address}</Collapse>
        </td>
        <td>{row.profession}</td>
        <td>{row.family_status}</td>
        <td>{row.temp_is_rent ? <Badge color="success">{intl.formatMessage({ id: "PopConfirmOK" })}</Badge> : <Badge color="danger">{intl.formatMessage({ id: "PopConfirmCancel" })}</Badge>}</td>
      </tr>
    ))
  }
  return (
    <Row>
      <Col md="12">
        <BreadCrumb />
        <hr />
      </Col>
      <Col md={12}>
        <Card className="pl-2">
          <div style={{ padding: "1em" }}>
            <SearchForm
              picker={picker}
              onSubmit={handleSearchFuqaro}
              fuqarolarAge={fuqarolarAge}
              setAgeInputMax={setAgeInputMax}
              ageInputMax={ageInputMax}
              setAgeInputMin={setAgeInputMin}
              ageInputMin={ageInputMin}
            />
          </div>
        </Card>
      </Col>
      <Col md={12}>
        <Card className="p-1" style={loading ? { height: "calc(100vh - 31vh)" } : {}}>
          <CustomTable count={pageCount} currentPage={currentPage} handlePagination={handlePagination} loading={loading} columns={renderColumns} rows={renderRows} />
        </Card>
      </Col>
      <Passport openModal={isModal} setOpenModal={setIsModal} data={fuqaroDetails} location={fuqarolarLocation ? fuqarolarLocation[0] : false} />
    </Row>
  )
}

export default injectIntl(Fuqarolar)
