// ** 
import { useState, useEffect } from 'react'

// ** Table Columns
// import { data, basicColumns } from './maleculas/data'

// ** Third Party Components
import { Edit2 } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, CardHeader, CardTitleCustomTable, Button, Row, Col } from 'reactstrap'
import useJwt from "@src/auth/jwt/useJwt"
import axios from "axios"
import { toast } from "react-toastify"
import { injectIntl } from "react-intl"

import CustomTable from "../../components/table"
import Sidebar from "../../components/sidebar"
import PopConfirm from "../../components/popconfirm/"
import CustomEditModal from "../../components/editModal/"
import ListForm from "./maleculas/ListForm"
import EditListForm from "./maleculas/EditListForm"

const config = useJwt.jwtConfig

const RoyhatTable = ({ intl }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [editableData, setEditableData] = useState([])

  // ** pagination
  const [currentPage, setCurrentPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [pageCount, setPageCount] = useState(1)

  const getMemebers = async () => {
    const { data } = await axios.get(`${config.url}/configurations/vip-list`)
    setData(data.data)
  }

  useEffect(() => {
    setLoading(true)
    getMemebers()
    setLoading(false)
  }, [])

  const addMembers = (params) => {
    axios.post(`${config.url}/configurations/vip-list`, params)
  }

  const updateMembers = (params) => {
    axios.put(`${config.url}/configurations/vip-list`, params)
  }

  const deleteMembers = (params) => {
    axios.delete(`${config.url}/configurations/vip-list`, { data: params })
  }

  const handleCloseSider = () => {
    setSidebarOpen(false)
  }
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleGetEditableData = (data) => {
    setEditableData(data)
    setOpenModal(true)
  }

  const handleDelete = async (id) => {
    const limit = rowsPerPage
    const offset = currentPage * limit

    await deleteMembers({ id })
    await getMemebers()
    toast.success("Маълумот ўчирилди")
  }

  const handleSubmit = async (params) => {
    setLoading(true)
    const limit = rowsPerPage
    const offset = currentPage * limit
    const newData = {
      passport_raqami: params.passport
    }
    await addMembers(newData)
    await getMemebers()
    toast.success("Маьлумоть қ‎ўшилди")
    setSidebarOpen(false)
    setLoading(false)
  }

  const handleUpdateGroup = async (params) => {
    const limit = rowsPerPage
    const offset = currentPage * limit

    const newData = {
      id: editableData.id,
      passport_raqami: params.passport_raqami
    }
    updateMembers(newData)
    getMemebers()
    toast.success("Маьлумоть ўзгартирилди")
    setOpenModal(false)
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const columns = [
    {
      title: intl.formatMessage({ id: "SetVIPPassport" }),
      name: "passport"
    },
    {
      title: intl.formatMessage({ id: "SetVIPDate" }),
      name: "date_time"
    },
    {
      title: intl.formatMessage({ id: "SetButtonEdit" }),
      name: "action"
    }
  ]

  const renderColumns = () => columns.map((col, index) => <th key={col.name}>{col.title}</th>)

  const renderRows = () => {
    if (data) {
      return data.map((row) => (
        <tr key={row.id}>
          <td>{row.passport_raqami}</td>
          <td>{row.to_char}</td>

          <td width={200}>
            <Row>
              <Col md="6">
                <Button.Ripple color="info" size="sm" onClick={() => handleGetEditableData(row)}>
                  <Edit2 size={12} />
                </Button.Ripple>
              </Col>

              <Col ml="6">
                <PopConfirm row={row} handleDelete={handleDelete} />
              </Col>
            </Row>
          </td>
        </tr>
      ))
    }
  }

  const handlePagination = async (page) => {
    setLoading(true)
    const limit = rowsPerPage
    const offset = page.selected * limit
    setCurrentPage(page.selected)
    await dispatch(getGroup(limit, offset))
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <Button.Ripple color="primary" onClick={() => toggleSidebar()}>
          {intl.formatMessage({ id: "SetVIPListAdd" })}
        </Button.Ripple>
      </CardHeader>
      <CustomTable count={pageCount} loading={loading} columns={renderColumns} rows={renderRows} currentPage={currentPage} handlePagination={handlePagination} />
      <Sidebar size="lg" open={sidebarOpen} title={intl.formatMessage({ id: "SetVIPListAdd" })} headerClassName="mb-1" contentClassName="pt-0" toggleSidebar={handleCloseSider}>
        <ListForm onSubmit={handleSubmit} handleClose={() => handleCloseSider()} />
      </Sidebar>
      <CustomEditModal openModal={openModal} setOpenModal={setOpenModal}>
        <EditListForm editableData={editableData} onSubmit={handleUpdateGroup} handleClose={() => handleCloseModal()} />
      </CustomEditModal>
    </Card>
  )
}

export default injectIntl(RoyhatTable)
