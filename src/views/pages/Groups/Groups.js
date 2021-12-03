// ** React
import React, { useEffect, useState } from "react"

// ** Third Part
import { Row, Col, Button, Badge, Card, Collapse } from "reactstrap"
import { toast } from "react-toastify"
import { Edit2 } from "react-feather"
import { Tooltip } from "antd"
import { injectIntl } from "react-intl"

// ** Store & Reducer
import { useSelector, useDispatch } from "react-redux"
import { getGroup, getRegionList, addGroup, updateGroup, deleteGroup } from "./store/actions/"

// ** Custom Components
import Table from "../../components/table/"
import Sidebar from "../../components/sidebar"
import GroupForm from "./atom/groupForm"
import EditGroupForm from "./atom/editGroupForm"
import CustomEditModal from "../../components/editModal/"
import PopConfirm from "../../components/popconfirm/"

const Groups = ({ intl }) => {
  const dispatch = useDispatch()
  const groupStore = useSelector((state) => state.groupSettings)

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState([])
  const [editableData, setEditableData] = useState([])
  const [regionList, setRegionList] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showHideServicesId, setShowHideServicesId] = useState(null)
  const [regionError, setRegionError] = useState(false)

  // ** pagination
  const [currentPage, setCurrentPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [pageCount, setPageCount] = useState(1)

  // ** int translation's
  const group_name_title = intl.formatMessage({ id: "SetGroupName" })
  const group_leader_title = intl.formatMessage({ id: "SetUserLeader" })
  const region_title = intl.formatMessage({ id: "SetGroupRegion" })
  const edit_title = intl.formatMessage({ id: "SetButtonEdit" })

  useEffect(() => {
    const limit = rowsPerPage
    const offset = currentPage * limit
    dispatch(getRegionList())
    dispatch(getGroup(limit, offset))
  }, [])

  useEffect(() => {
    setPageCount(Math.ceil(groupStore?.count / rowsPerPage).toFixed(0))
  }, [groupStore?.count])

  const columns = [
    { title: group_name_title, name: "name" },
    { title: group_leader_title, name: "role_name" },
    { title: region_title, name: "region" },
    {
      title: edit_title,
      name: "action"
    }
  ]

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const handlePagination = async (page) => {
    setLoading(true)
    const limit = rowsPerPage
    const offset = page.selected * limit
    setCurrentPage(page.selected)
    await dispatch(getGroup(limit, offset))
    setLoading(false)
  }

  const handleSubmit = async (params) => {
    if (selectedRegion.length === 0) {
      setRegionError(true)
    } else {
      const limit = rowsPerPage
      const offset = currentPage * limit
      const newData = {
        name: params.group_name,
        regionIds: selectedRegion
      }
      await dispatch(addGroup(newData))
      await dispatch(getGroup(limit, offset))
      toast.success("Маьлумоть қ‎ўшилди")
      setSidebarOpen(false)
      setRegionError(false)
      setSelectedRegion([])
    }
  }

  const handleCloseSider = () => {
    setSidebarOpen(false)
    setRegionError(false)
    setSelectedRegion([])
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedRegion([])
  }

  const handleGetEditableData = (data) => {
    setEditableData(data)
    setOpenModal(true)
  }

  const handleUpdateGroup = async (params) => {
    const limit = rowsPerPage
    const offset = currentPage * limit
    const regionIds = []
    if (editableData.regions) {
      editableData.regions.forEach((region) => regionIds.push(parseInt(region.id)))
    }
    const newData = {
      groupId: editableData.id,
      name: params.name,
      regionIds: selectedRegion.length !== 0 ? selectedRegion : regionIds
    }
    await dispatch(updateGroup(newData))
    await dispatch(getGroup(limit, offset))
    setSelectedRegion([])
    toast.success("Маьлумоть ўзгартирилди")
    setOpenModal(false)
  }

  const handleDelete = async (params) => {
    const limit = rowsPerPage
    const offset = currentPage * limit
    await dispatch(deleteGroup(params))
    await dispatch(getGroup(limit, offset))
    toast.success("Маълумот ўчирилди")
  }

  const handleToggleRegions = (index) => {
    setRegionList(showHideServicesId === index ? false : index)
    setShowHideServicesId(showHideServicesId === index ? null : index)
  }

  const renderColumns = () => columns.map((col) => <th key={col.name}>{col.title}</th>)

  const renderRows = () => {
    if (groupStore.groupData) {
      return groupStore.groupData.map((row) => (
        <tr key={row.id}>
          <td>{row.name}</td>

          <td>{row.group_leader ? <Tooltip title={row.group_leader.username}>{row.group_leader.full_name}</Tooltip> : <Badge color="danger">Mavjud emas</Badge>}</td>
          <td width={50}>
            {row.regions && row.regions.length > 1 ? (
              <>
                <span>
                  <Badge className="d-block" color="warning" onClick={() => handleToggleRegions(row.id)}>
                    {row.regions[0].name}, +{row.regions.length - 1}
                  </Badge>
                </span>
                <Collapse isOpen={regionList}>
                  {row.regions.map((d) => {
                    return (
                      showHideServicesId === row.id && (
                        <Badge className="d-block" key={d.id} style={{ marginTop: "0.5em" }} color="success">
                          {d.name}
                        </Badge>
                      )
                    )
                  })}
                </Collapse>
              </>
            ) : (
              row.regions &&
              row.regions.map((d) => (
                <Badge key={d} className="mr-1" color="warning">
                  {d.name}
                </Badge>
              ))
            )}
          </td>

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
  const handleChangeSelectedRegion = (params) => {
    const selectedNodes = []
    params.forEach((sn) => {
      if (typeof sn !== "string") {
        return selectedNodes.push(sn)
      }
    })
    setSelectedRegion(selectedNodes)
  }

  return (
    <div>
      <Row className="mb-2">
        <Col md="12">
          <Button.Ripple className="ml-1" size="sm" color="primary" onClick={() => toggleSidebar()}>
            {intl.formatMessage({ id: "SetAddGroup" })}
          </Button.Ripple>
        </Col>
      </Row>
      <Row>
        <Col sm="12" md="12">
          <Card className="p-1">
            <Table loading={loading} currentPage={currentPage} columns={renderColumns} rows={renderRows} count={pageCount} handlePagination={handlePagination} />
          </Card>
          <Sidebar size="lg" open={sidebarOpen} title={intl.formatMessage({ id: "SetAddGroup" })} headerClassName="mb-1" contentClassName="pt-0" toggleSidebar={handleCloseSider}>
            <GroupForm handleChange={handleChangeSelectedRegion} selectedRegion={selectedRegion} regionError={regionError} onSubmit={handleSubmit} handleClose={() => handleCloseSider()} />
          </Sidebar>
          <CustomEditModal openModal={openModal} setOpenModal={setOpenModal}>
            <EditGroupForm editableData={editableData} onSubmit={handleUpdateGroup} handleClose={() => handleCloseModal()} onChange={handleChangeSelectedRegion} />
          </CustomEditModal>
        </Col>
      </Row>
    </div>
  )
}

export default injectIntl(Groups)
