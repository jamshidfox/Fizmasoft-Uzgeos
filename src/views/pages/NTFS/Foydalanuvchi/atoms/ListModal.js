import React, { useState, useEffect } from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Table, Row, Col, Spinner } from "reactstrap"
import Avatar from "../../../../../@core/components/avatar"
import ReactBasicMap from "../../../Map/utils/ReactBasicMap"
import ReactPaginate from "react-paginate"
import { useSelector } from "react-redux"
import CustomTable from "../../../../components/table"
import { injectIntl } from "react-intl"

// ** JwT
import useJwt from "@src/auth/jwt/useJwt"
const config = useJwt.jwtConfig

const ListModal = ({ userImage, open, toggle, intl }) => {
  const [data, setData] = useState([])
  const foydalanuvchilogDetails = useSelector((state) => state.foydalanuvchi.logDetails)

  // ** pagination
  const [currentPage, setCurrentPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [pageCount, setPageCount] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open) setData([])
  }, [open])

  useEffect(() => {
    if (foydalanuvchilogDetails.length > 0) {
      const offset = currentPage * rowsPerPage

      const pageData = foydalanuvchilogDetails.slice(offset, offset + rowsPerPage)

      setData(pageData)
    }
  }, [currentPage, foydalanuvchilogDetails])

  useEffect(() => {
    setCurrentPage(0)
    setPageCount(Math.ceil(foydalanuvchilogDetails.length / rowsPerPage))
  }, [foydalanuvchilogDetails])

  const handlePagination = (page) => {
    setLoading(true)
    const { selected } = page
    const selectedPage = selected * rowsPerPage
    setData([])
    setCurrentPage(selected)
    setLoading(false)
  }
  const columns = [
    {
      title: intl.formatMessage({ id: "NtfsSearchName" }),
      name: "name"
    },
    {
      title: intl.formatMessage({ id: "NtfsSearchPassport" }),
      name: "passport"
    },
    {
      title: intl.formatMessage({ id: "NtfsSearchDateOfBirth" }),
      name: "date_of_birth"
    },
    {
      title: intl.formatMessage({ id: "NtfsSearchSimilarity" }),
      name: "percent"
    },
    {
      title: intl.formatMessage({ id: "NtfsSearchAddress" }),
      name: "address"
    },
    {
      title: intl.formatMessage({ id: "NtfsSearchRepo" }),
      name: "repository"
    }
  ]
  const renderColumns = () => columns.map((col, index) => <th key={col.name}>{col.title}</th>)
  const renderRows = () => {
    return data.map((lm) => (
      <tr key={lm.id}>
        <td>{lm.fullname}</td>
        <td>{lm.passport}</td>
        <td>{lm.birthday}</td>
        <td>{lm.similarity}%</td>
        <td>{lm.address}</td>
        <td>{lm.repository_id}</td>
      </tr>
    ))
  }

  return (
    <Modal isOpen={open} toggle={toggle} className="modal-dialog-centered modal-xl">
      <ModalHeader toggle={toggle}>{intl.formatMessage({ id: "NtfsSearchFullInfo" })}</ModalHeader>
      <ModalBody>
        <Row>
          <Col lg="8">
            <div className="d-flex ">
              <Avatar style={{ objectFit: "cover" }} img={userImage ? `${config.url}/ntface-logs/${userImage}` : ""} size="xl" />
              <h5 className="my-auto ml-1 text-primary">{intl.formatMessage({ id: "NtfsSearchImageInfo" })}</h5>
            </div>
            <CustomTable count={pageCount} loading={loading} columns={renderColumns} rows={renderRows} currentPage={currentPage} handlePagination={handlePagination} />
          </Col>
          <Col lg={4}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
              <div style={{ height: "85%", width: 500 }}>
                <ReactBasicMap zoom={12} resize1={pageCount} resize2={loading}></ReactBasicMap>
              </div>
            </div>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button onClick={toggle} color="info">
          OK
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default injectIntl(ListModal)
