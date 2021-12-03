// ** React
import React, { useEffect, useState } from "react"

// ** Third Part
import { Row, Col, Button, Badge, Card, Collapse } from "reactstrap"
import { Edit2 } from "react-feather"
import { toast } from "react-toastify"
import { injectIntl } from "react-intl"

// ** Custom Components
import Avatar from "@components/avatar"
import Sidebar from "../../components/sidebar"
import Table from "../../components/table/"
import UserForm from "./atoms/userForm"
import ImageModal from "./atoms/ImageModal"
import CustomEditModal from "../../components/editModal/"
import EditUserForm from "./atoms/editForm"
import CustomPopconfirm from "../../components/popconfirm/"

// ** Store & Reducer
import { useSelector, useDispatch } from "react-redux"
import { getUsers, getGroup, getService, addUsers, updateUsers, deleteUsers, getGroupLeader } from "./store/actions/"

// ** JwT
import useJwt from "@src/auth/jwt/useJwt"
const config = useJwt.jwtConfig

// ** Icons
import { FaUserAlt } from "react-icons/fa"

const Users = ({ intl }) => {
  const dispatch = useDispatch()
  const usersStore = useSelector((state) => state.usersSettings)

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [img, setImg] = useState(null)
  const [prevImg, setPrevImg] = useState(null)
  const [group_lider, setGroup_lider] = useState(false)
  const [user_status, setUser_status] = useState(true)
  const [inspektor, setInspektor] = useState(false)
  const [editableData, setEditableData] = useState([])
  const [serviceList, setServiceList] = useState(false)
  const [showHideServicesId, setShowHideServicesId] = useState(null)
  const [generatedPassword, setGeneratedPassword] = useState("")

  // ** pagination
  const [currentPage, setCurrentPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [pageCount, setPageCount] = useState(1)

  // ** Form Validation for datePicker & select
  const [picker, setPicker] = useState([])
  const [selectedData, setSelectedData] = useState(true)
  const [isUserRole, setUserRole] = useState(true)
  const [isImage, setIsImage] = useState(true)
  const [loading, setLoading] = useState(false)

  const userPictureTitle = intl.formatMessage({ id: "SetUserPicture" })
  const userNameTitle = intl.formatMessage({ id: "SetUserName" })
  const userDateTitle = intl.formatMessage({ id: "SetUserDate" })
  const userCoinTitle = intl.formatMessage({ id: "SetUserCoin" })
  const userRankTitle = intl.formatMessage({ id: "SetUserUnvoni" })
  const userGroupTitle = intl.formatMessage({ id: "SetGroupName" })
  const userAccessTitle = intl.formatMessage({ id: "SetUserAccess" })
  const userEditTitle = intl.formatMessage({ id: "SetButtonEdit" })

  const columns = [
    {
      title: userPictureTitle,
      name: "picture"
    },
    {
      title: userNameTitle,
      name: "full_name"
    },
    {
      title: userDateTitle,
      name: "date_of_birth"
    },
    {
      title: userCoinTitle,
      name: "coin_number"
    },
    {
      title: userRankTitle,
      name: "position"
    },
    {
      title: userGroupTitle,
      name: "group"
    },
    {
      title: userAccessTitle,
      name: "access_role"
    },
    {
      title: userEditTitle,
      name: "action"
    }
  ]

  useEffect(() => {
    setLoading(true)
    const limit = rowsPerPage
    const offset = currentPage * limit
    dispatch(getUsers(limit, offset))
    dispatch(getGroup())
    dispatch(getService())
    dispatch(getGroupLeader())
    setLoading(false)
  }, [])

  useEffect(() => {
    setPageCount(Math.ceil(usersStore?.user_count / rowsPerPage).toFixed(0))
  }, [usersStore?.user_count])

  const handleGroupChange = (value) => setGroup_lider(!value)
  const handleUserChange = (value) => setUser_status(!value)
  const handleInspektorChange = (value) => setInspektor(!value)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const handlePagination = async (page) => {
    setLoading(true)
    const { selected } = page
    setCurrentPage(selected)

    const limit = rowsPerPage
    const offset = page.selected * limit
    await dispatch(getUsers(limit, offset))
    setLoading(false)
  }

  const handleSubmit = async (params) => {
    if (params.date_of_birth === undefined) {
      setPicker(null)
    } else {
      setPicker([])
    }
    if (params.group === undefined) {
      setSelectedData(false)
    } else {
      setSelectedData(true)
    }

    if (params.user_roles === undefined) {
      setUserRole(false)
      setIsImage(false)
    } else if (params.user_roles !== undefined) {
      const service = []
      if (params.user_roles) {
        params.user_roles.forEach((d) => {
          return service.push(d.value)
        })
      }

      const limit = rowsPerPage
      const offset = currentPage * limit

      const newData = {
        username: params.username,
        password: params.password,
        fullName: params.full_name,
        position: params.position,
        dateOfBirth: params.date_of_birth,
        groupId: params.group.value,
        isGroupLeader: group_lider,
        userRoles: service,
        status: user_status,
        isInspector: inspektor
      }
      if (img) newData.avatar = img
      if (params.mfy_id) newData.mfyId = params.mfy_id
      if (params.device_uid) newData.deviceId = params.device_uid
      setGroup_lider(false)
      setUser_status(true)
      setInspektor(false)
      setPicker([])
      setSelectedData(true)
      setUserRole(true)
      setImg(null)
      setPrevImg(null)
      setGeneratedPassword("")
      setSidebarOpen(false)
      setIsImage(true)

      toast.success("Маълумот қ‎ўшилди")
      await dispatch(addUsers(newData))
      await dispatch(getUsers(limit, offset))
    }
  }

  const handleDelete = async (id) => {
    setLoading(true)
    const limit = rowsPerPage
    const offset = currentPage * limit
    await dispatch(deleteUsers(id))
    await dispatch(getUsers(limit, offset))
    setLoading(false)
  }

  const handleGetEditableData = (params) => {
    setOpenModal(true)
    setEditableData(params)
  }

  const handleUpdate = async (params) => {
    const limit = rowsPerPage
    const offset = currentPage * limit
    if (img === null) {
      setIsImage(false)
    }
    if (params.user_roles.length === 0) {
      setUserRole(false)
    }
    if (!params.group_name) {
      setSelectedData(false)
    }

    if (params.group_name && params.user_roles.length !== 0) {
      const service = []
      if (params.user_roles) {
        params.user_roles.forEach((d) => {
          return service.push(d.value)
        })
      }
      setIsImage(true)
      setUserRole(true)
      setSelectedData(true)

      const newData = {
        id: editableData.id,
        username: params.username,
        password: params.password,
        fullName: params.full_name,
        position: params.position,
        dateOfBirth: params.date_of_birth,
        groupId: params.group_name.value,
        isGroupLeader: params.group_leader,
        userRoles: service,
        isInspector: params.is_inspector,
        status: params.status
      }
      if (img) newData.avatar = img
      if (params.mfy_id) newData.mfyId = params.mfy_id
      if (params.device_uid) newData.deviceId = params.device_uid
      await dispatch(updateUsers(newData))
      await dispatch(getUsers(limit, offset))

      setGroup_lider(false)
      setUser_status(true)
      setInspektor(false)
      setPicker([])
      setImg(null)
      setPrevImg(null)
      setGeneratedPassword("")
      setOpenModal(false)
      toast.success("Маълумот ўзгартирилди")
    }
  }

  const handleToggleServices = (index) => {
    setServiceList(showHideServicesId === index ? false : index)
    setShowHideServicesId(showHideServicesId === index ? null : index)
  }

  const [centeredModal, setCenteredModal] = useState(false)
  const [avatarShow, setAvatarShow] = useState("")
  const [avatarId, setAvatarId] = useState("")
  const handleModalOpen = (row) => {
    setCenteredModal(!centeredModal)
    setAvatarShow(row.avatar ? <img src={`${config.url}/images/${row.avatar}`} alt="" /> : <FaUserAlt />)
    setAvatarId(row.id)
  }

  const renderColumns = () => columns.map((col, index) => <th key={col.name}>{col.title}</th>)
  const renderRows = () => {
    if (usersStore.userData) {
      return usersStore.userData.map((row, index) => (
        <tr key={row.id}>
          <td onClick={() => handleModalOpen(row)}>
            {row.avatar ? <Avatar style={{ objectFit: "cover" }} className="rounded" size="lg" img={`${config.url}/images/${row.avatar}`} alt="" /> : <FaUserAlt size={20} />}
          </td>
          <td>{row.full_name}</td>
          <td>{row.date_of_birth}</td>
          <td>{row.username}</td>
          <td>{row.position}</td>
          <td>
            <Badge className="mr-1" color="primary">
              {row?.group?.name}
            </Badge>
          </td>
          <td width={50}>
            {row.services && row.services.length > 1 ? (
              <>
                <span>
                  <Badge className="d-block" color="danger" onClick={() => handleToggleServices(row.id)}>
                    {row.services[0].name}, +{row.services.length - 1}
                  </Badge>
                </span>
                <Collapse isOpen={serviceList}>
                  {row.services.map((d) => {
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
              row.services &&
              row.services.map((d) => (
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
                <CustomPopconfirm row={row} handleDelete={handleDelete} />
              </Col>
            </Row>
          </td>
        </tr>
      ))
    }
  }

  const handleSideBarClose = () => {
    setSidebarOpen(false)
    setGroup_lider(false)
    setUser_status(true)
    setInspektor(false)
    setPicker()
    setGeneratedPassword("")
    setImg(null)
    setPrevImg(null)
  }

  const handleModalClose = () => {
    setOpenModal(false)
    setGroup_lider(false)
    setUser_status(true)
    setInspektor(false)
    setGeneratedPassword("")
    setPicker()
    setImg(null)
    setPrevImg(null)
  }

  return (
    <div>
      <ImageModal centeredModal={centeredModal} setCenteredModal={setCenteredModal} avatarShow={avatarShow} avatarId={avatarId} rowsPerPage={rowsPerPage} currentPage={currentPage} />
      <Button.Ripple style={{ marginBottom: "0.5em" }} size="sm" color="primary" onClick={() => toggleSidebar()}>
        {intl.formatMessage({ id: "SetUsersAdd" })}
      </Button.Ripple>
      <Row>
        <Col sm="12" md="12">
          <Card>
            <Table count={pageCount} loading={loading} columns={renderColumns} rows={renderRows} currentPage={currentPage} handlePagination={handlePagination} />
          </Card>
          <Sidebar size="lg" open={sidebarOpen} title={intl.formatMessage({ id: "SetUsersAdd" })} headerClassName="mb-1" contentClassName="pt-0" toggleSidebar={handleSideBarClose}>
            <UserForm
              onSubmit={handleSubmit}
              handleClose={() => handleSideBarClose()}
              img={img}
              setImg={setImg}
              prevImg={prevImg}
              setPrevImg={setPrevImg}
              picker={picker}
              selectedData={selectedData}
              group_lider={group_lider}
              user_status={user_status}
              isUserRole={isUserRole}
              inspektor={inspektor}
              isImage={isImage}
              setGeneratedPassword={setGeneratedPassword}
              generatedPassword={generatedPassword}
              handleGroupChange={handleGroupChange}
              handleUserChange={handleUserChange}
              handleInspektorChange={handleInspektorChange}
            />
          </Sidebar>
          <CustomEditModal openModal={openModal} setOpenModal={setOpenModal}>
            <EditUserForm
              editableData={editableData}
              onSubmit={handleUpdate}
              handleClose={() => handleModalClose()}
              img={img}
              setImg={setImg}
              prevImg={prevImg}
              setPrevImg={setPrevImg}
              isUserRole={isUserRole}
              inspektor={inspektor}
              selectedData={selectedData}
              picker={picker}
              isImage={isImage}
              group_lider={group_lider}
              inspektor={inspektor}
              user_status={user_status}
              handleGroupChange={handleGroupChange}
              handleUserChange={handleUserChange}
              handleInspektorChange={handleInspektorChange}
            />
          </CustomEditModal>
        </Col>
      </Row>
    </div>
  )
}

export default injectIntl(Users)
