import React, { useState, useEffect } from "react"

// ** Third party libraries **
import PerfectScrollbar from "react-perfect-scrollbar"
import { Card, Row, Col, CardFooter, CardTitle, CardText, CardBody, Button, Spinner, Progress } from "reactstrap"
import styled from "styled-components"
import Nouislider from "nouislider-react"
import { injectIntl } from "react-intl"
import axios from "axios"
import useJwt from "@src/auth/jwt/useJwt"
const config = useJwt.jwtConfig

// ** Components
import InfoModal from "./InfoModal"
import ImageModal from "./ImageModal"
import BreadCrumb from "../../../components/BreadCrumb/"
import NoData from "../../../components/NoData/"

// ** Store & Reducer
import { useSelector, useDispatch } from "react-redux"
import { searchUser } from "../store/actions/"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"
const MySwal = withReactContent(Swal)

// ** styles
import "uppy/dist/uppy.css"
import "@uppy/status-bar/dist/style.css"
import "@styles/react/libs/file-uploader/file-uploader.scss"
import "react-perfect-scrollbar/dist/css/styles.css"
import { ArrowRight, Filter } from "react-feather"
import Passport from "../../../components/Passport/Passport"

const NTFace = ({ intl }) => {
  const dispatch = useDispatch()
  const ntfsStore = useSelector((state) => state.ntfs)

  const alarmStatus = useSelector((state) => state.alarm)
  const alarmData = useSelector((state) => state.alarm.data)

  const [imgModal, setImgModal] = useState(true)
  const [infoModal, setInfoModal] = useState(false)
  const [img, setImg] = useState(null)
  const [base64, setBase64] = useState(null)
  const [moreInfoData, setMoreInfoData] = useState([])
  const [similarity, setSimilarity] = useState(0.75)
  const [loading, setLoading] = useState(false)
  const [onImageLoading, setImageLoading] = useState(false)
  const [infoLoading, setInfoLoading] = useState(false)
  const [hasPcitizen, setHasPcitizen] = useState(false)
  const [location, setLocation] = useState(null)

  const token = localStorage.getItem("access_token")

  const onLoad = () => {
    setImageLoading(false)
  }

  const handleInfo = () => {
    return MySwal.fire({
      title: "Фуқаро ҳақида маълумот мавжуд эмас!",
      icon: "info",
      customClass: {
        confirmButton: "btn btn-primary"
      },
      buttonsStyling: false
    })
  }

  const fileSubmit = async () => {
    setLoading(true)
    setImageLoading(true)

    await dispatch(searchUser({ img: base64, similarity, isMobile: false }))
    setImgModal(false)
    setLoading(false)
  }

  const toggleInfoModal = async (params) => {
    setInfoModal((prev) => !prev)
    if (params.pcitizen) {
      setHasPcitizen(true)
      setInfoLoading(true)
      const { data } = await axios.post(`${config.url}/foreign/xatlov/forma1`, { pcitizen: params.pcitizen })
      const { data: cad_info } = await axios.get(`${config.url}/foreign/xatlov/kadastr-info?kadastr=${params.kadastr_raqami}`)
      setLocation(cad_info.data)
      setInfoLoading(false)
      setMoreInfoData(data.data)
    } else if (params) {
      setHasPcitizen(false)
      handleInfo()
    }
  }

  const handleSearchPerson = async () => {
    setLoading(true)
    await dispatch(searchUser({ img: base64, similarity, isMobile: false }))
    setLoading(false)
  }

  useEffect(() => {
    if (imgModal && infoModal && alarmStatus.status) {
      setImgModal(false)
      setInfoModal(false)
    }
  }, [alarmStatus])
  return (
    <div>
      <Row>
        <Col md="12">
          <BreadCrumb />
          <hr />
        </Col>
      </Row>
      <ImageModal open={imgModal} img={img} setImg={setImg} setFile={(file) => setBase64(file)} submit={fileSubmit} setSimilarity={setSimilarity} loading={loading} />
      {hasPcitizen && <Passport openModal={infoModal} setOpenModal={toggleInfoModal} data={moreInfoData} loading={infoLoading} location={location ? location[0] : false} />}
      {!imgModal && (
        <div>
          <Row>
            <Col md="4">
              <Row>
                <Col>
                  <div style={{ position: "relative", top: 15 }}>
                    <Nouislider
                      start={similarity * 100}
                      direction={"ltr"}
                      orientation="horizontal"
                      onSlide={(render, handle, value, un, percent) => setSimilarity(value[0].toFixed(0) / 100)}
                      tooltips={true}
                      format={{
                        from: Number,
                        to: (value) => parseInt(value)
                      }}
                      range={{
                        min: 0,
                        max: 100
                      }}
                    />
                  </div>
                </Col>
                <Col>
                  <Button color="primary" className="btn-icon" onClick={() => handleSearchPerson()}>
                    <Filter size="16" />
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col md="7">
              <h2 className="mx-auto text-left  text-primary">{intl.formatMessage({ id: "NtfsSearchedImageInformation" })}</h2>
            </Col>
            <Col>
              <Button
                color="primary"
                size="sm"
                onClick={() => {
                  setImgModal(true)
                  setImg(null)
                }}
              >
                {intl.formatMessage({ id: "NtfsReSearch" })}
              </Button>
            </Col>
            <Col md="12">
              <hr />
            </Col>
          </Row>

          <PerfectScrollbar>
            <Row>
              <Col md="3">
                <div className="d-flex h-100 justify-content-center align-items-center">
                  <Card style={{ height: 420, width: 300 }}>
                    <img style={onImageLoading ? { display: "none" } : { objectFit: "contain", height: "100%" }} onLoad={onLoad} src={base64} alt="Card cap" />
                    <CardBody>
                      <CardTitle style={{ fontSize: 25 }} className="text-success">
                        {intl.formatMessage({ id: "NtfsReUploadedImage" })}
                      </CardTitle>
                    </CardBody>
                  </Card>
                </div>
              </Col>
              <Col md="1">
                <div className="h-100 d-flex justify-content-center align-items-center">
                  <ArrowRight size={400} className="text-success" />
                </div>
              </Col>
              {
                loading ? (
                  <div style={{ height: 500, width: "100%" }} className="d-flex justify-content-center align-items-center">
                    <Spinner color="primary" />
                  </div>
                ) : ntfsStore && ntfsStore.userData.length !== 0 ? (
                  ntfsStore.userData.map((user, index) => (
                    <Col lg="3" md="4" key={index}>
                      <Card style={{ height: 650, width: 300 }}>
                        {onImageLoading && (
                          <div style={{ height: 300, width: "100%" }} className="d-flex justify-content-center align-items-center">
                            <Spinner color="primary" />
                          </div>
                        )}

                        <div style={{ overflow: "hidden", height: 450 }}>
                          <img style={onImageLoading ? { display: "none" } : { objectFit: "cover", width: "100%" }} onLoad={onLoad} src={`${user.img}?token=${JSON.parse(token)}`} alt="Card cap" />
                        </div>

                        <CardBody>
                          <CardTitle tag="h4">{user.fullname}</CardTitle>
                          <CardText>
                            <strong>{intl.formatMessage({ id: "NtfsPassportNumber" })}: </strong>
                            {user.passport}
                          </CardText>
                          <CardText>
                            <strong>{intl.formatMessage({ id: "NtfsDateOfBirth" })}: </strong>
                            <em>{user.birthday} </em>
                          </CardText>
                          <CustomProgressBar value={user.similarity} className="mb-1 progress-bar-primary">
                            <span style={{ fontSize: 15 }}>{user.similarity}%</span>
                          </CustomProgressBar>
                        </CardBody>
                        <CardFooter>
                          <Button.Ripple block onClick={() => toggleInfoModal(user)} color="primary" outline>
                            {intl.formatMessage({ id: "NtfsMoreInfo" })}
                          </Button.Ripple>
                        </CardFooter>
                      </Card>
                    </Col>
                  ))
                ) : null
                // <NoData />
              }
            </Row>
          </PerfectScrollbar>
        </div>
      )}
    </div>
  )
}

export default injectIntl(NTFace)

const CustomProgressBar = styled(Progress)`
  height: 20px;
  background-color: transparent !important;
  .progress-bar-success {
  }
`
