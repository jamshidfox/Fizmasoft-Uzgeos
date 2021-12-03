import React, { useEffect, useState } from "react"

// ** Third Part
import { Row, Col } from "reactstrap"
import { useDispatch } from "react-redux"

// ** Custom
import UserSideBar from "./atoms/sidebar"
import UserList from "./atoms/userList"
import ListModal from "./atoms/ListModal"
import SearchBar from "./atoms/SearchBar"
import BreadCrumb from "../../../components/BreadCrumb/"

// ** CONFIG JWT
// const config = useJwt.jwtConfig

// ** Store and Redux

// ** Actions
import { handleGetNtfcInspektors, handleGetNtfsLogs, handleGetNtfsLogsDetail } from "../store/actions/foydalanuvchiAction"
import { onTimerStart } from "../../../../@core/auth/jwt/jwtService"

const Foydalanuvchi = () => {
  const dispatch = useDispatch()

  const [isModal, setIsModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [logId, setLogId] = useState(0)
  const [userImage, setUserImage] = useState(null)

  useEffect(() => {
    dispatch(handleGetNtfcInspektors())
  }, [])

  const handleShowLog = async (params) => {
    if (params.id) {
      setLoading(true)
      setLogId(params.id)
      await dispatch(handleGetNtfsLogs(params.id))
      setLoading(false)
    }
  }
  useEffect(() => {
    const time = onTimerStart(30000, () => dispatch(handleGetNtfsLogs(logId)))
    return () => clearInterval(time)
  }, [loading])

  const handleShowModal = (params) => {
    if (params && params.id) {
      dispatch(handleGetNtfsLogsDetail(params.id))
      setUserImage(params.img)
      setIsModal(true)
    }
  }
  const toggleInfoModal = () => setIsModal((prev) => !prev)

  return (
    <div style={{ height: "calc(100vh - 100px)" }}>
      <Row>
        <Col md="12">
          <BreadCrumb />
          <hr />
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <SearchBar />
        </Col>
        <Col md="3">
          <UserSideBar handleShowLog={handleShowLog} userId={logId} />
        </Col>
        <Col md="9">
          <UserList handleShowModal={handleShowModal} />
        </Col>
        <ListModal userImage={userImage} toggle={toggleInfoModal} open={isModal} />
      </Row>
    </div>
  )
}
export default Foydalanuvchi