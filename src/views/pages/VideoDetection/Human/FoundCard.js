import { Card, Button, ButtonGroup, Modal, ModalBody, ModalHeader, UncontrolledPopover, PopoverBody, PopoverHeader } from "reactstrap"
import videoDetectionApi from "../api"
import noImg from "../noImg.png"
import moment from "moment"
import { List, PlayCircle } from "react-feather"
import { useState } from "react"
import ReactHlsPlayer from "react-hls-player"
import filterTypes from "../filter.json"
import { injectIntl } from "react-intl"
import { useDispatch } from "react-redux"
import { setSearchFace } from "../store/actions"
import { withRouter } from "react-router-dom"

const FoundCard = ({ intl, history, data, gender }) => {
  const [videoModal, setVideoModal] = useState(false)
  const [infoModal, setInfoModal] = useState(false)
  const dispatch = useDispatch()
  const objArr = (d) => {
    const arr = []
    for (const key in d) {
      if (key === "gender") {
        arr.push({ type: key, val: gender })
      } else {
        arr.push({ type: key, val: d[key] })
      }
    }
    return arr
  }

  const faceClick = async (e) => {
    const res = await fetch(e.target.src)
    const blobImg = await res.blob()
    const reader = new FileReader()
    reader.readAsDataURL(blobImg)
    reader.onloadend = function () {
      const base64data = reader.result
      dispatch(setSearchFace(base64data))
      history.push("/ntfaceQidiruv")
    }
  }

  return (
    <>
      <Modal isOpen={videoModal} toggle={() => setVideoModal(!videoModal)} className="modal-dialog-centered">
        <ModalBody>
          <ReactHlsPlayer src={videoDetectionApi.getVideoUrl(data.start_time, data.channel_id)} autoPlay={true} controls={true} width="100%" height="auto" />
        </ModalBody>
      </Modal>
      <Modal isOpen={infoModal} toggle={() => setInfoModal(!infoModal)} className="modal-dialog-centered">
        <ModalHeader toggle={() => setInfoModal(!infoModal)}></ModalHeader>
        <ModalBody>
          <div>
            {objArr(data.face_attr).map((d) => (
              <div key={d} className="d-flex justify-content-between">
                <h5 style={{ fontWeight: "bold", margin: "6px 0" }}>{intl.formatMessage({ id: d.type })}</h5>
                <h5 style={{ margin: "6px 0" }}>{Object.keys(filterTypes).includes(d.type) ? intl.formatMessage({ id: filterTypes[d.type][d.val] }) : d.val}</h5>
              </div>
            ))}
            <hr />
            {objArr(data.human_attr).map((d) => (
              <div key={d} className="d-flex justify-content-between">
                <h5 style={{ fontWeight: "bold", margin: "6px 0" }}>{intl.formatMessage({ id: d.type })}</h5>
                <h5 style={{ margin: "6px 0" }}>
                  {Object.keys(filterTypes).includes(d.type) && filterTypes[d.type][d.val] !== undefined ? intl.formatMessage({ id: filterTypes[d.type][d.val] }) : d.val}
                </h5>
              </div>
            ))}
          </div>
        </ModalBody>
      </Modal>

      <Card className="mr-2">
        <div style={{ width: 400, height: 380 }}>
          <h4 className="m-1" style={{ textAlign: "center" }}>
            {`${moment(data.start_time).format("DD.MM.YYYY HH:mm")}`}
          </h4>
          <div className="d-flex justify-content-around">
            {data.human_id ? (
              <img src={videoDetectionApi.getImageUrl(data.human_id)} style={{ width: 190, height: 280, objectFit: "cover", border: "1px solid red", borderRadius: 10 }} />
            ) : (
              <img src={noImg} style={{ width: 190, height: 280, objectFit: "contain", border: "1px solid red", borderRadius: 10 }} />
            )}
            {data.face_id ? (
              <img src={videoDetectionApi.getImageUrl(data.face_id)} onClick={faceClick} style={{ width: 190, height: 280, objectFit: "cover", border: "1px solid red", borderRadius: 10 }} />
            ) : (
              <img src={noImg} style={{ width: 190, height: 280, objectFit: "contain", border: "1px solid red", borderRadius: 10 }} />
            )}
          </div>
          <ButtonGroup className="d-flex justify-content-center mt-1">
            <Button onClick={() => setInfoModal(true)}>
              <List />
            </Button>
            <Button onClick={() => setVideoModal(true)}>
              <PlayCircle />
            </Button>
          </ButtonGroup>
        </div>
      </Card>
    </>
  )
}

export default withRouter(injectIntl(FoundCard))
