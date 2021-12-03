import { Card, Button, ButtonGroup, Modal, ModalBody } from "reactstrap"
import videoDetectionApi from "../api"
import noImg from "../noImg.png"
import moment from "moment"
import { List, PlayCircle } from "react-feather"
import { useState } from "react"
import ReactHlsPlayer from "react-hls-player"
import filterTypes from "../filter.json"
import { injectIntl } from "react-intl"
import { withRouter } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux"
import { setSearchFace } from "../store/actions"

const FoundCard = ({ intl, history, data }) => {
  const [videoModal, setVideoModal] = useState(false)
  const [infoModal, setInfoModal] = useState(false)
  const dispatch = useDispatch()

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
          <ReactHlsPlayer src={videoDetectionApi.getVideoUrl(data.the_date, data.channel_id)} autoPlay={true} controls={true} width="100%" height="auto" />
        </ModalBody>
      </Modal>
      <Modal isOpen={infoModal} toggle={() => setInfoModal(!infoModal)} className="modal-dialog-centered">
        <ModalBody>
          <div>
            <div className="d-flex justify-content-between">
              <h5>{intl.formatMessage({ id: "age" })}</h5>
              <h5>{intl.formatMessage({ id: data.age })}</h5>
            </div>
            <div className="d-flex justify-content-between">
              <h5>{intl.formatMessage({ id: "gender" })}</h5>
              <h5>{intl.formatMessage({ id: filterTypes.gender[data.gender] })}</h5>
            </div>
          </div>
        </ModalBody>
      </Modal>
      <Card className="mr-2">
        <div style={{ width: 251, height: 370 }}>
          <h4 className="m-1" style={{ textAlign: "center" }}>
            {`${moment(data.start_time).format("DD.MM.YYYY HH:mm")}`}
          </h4>
          <div className="d-flex justify-content-around">
            {data.event_id ? (
              <img
                src={videoDetectionApi.getImageUrl(data.event_id)}
                onClick={faceClick}
                style={{ width: 190, height: 280, objectFit: "cover", border: "1px solid red", borderRadius: 10, cursor: "pointer" }}
              />
            ) : (
              <img src={noImg} style={{ width: 190, height: 280, objectFit: "contain", border: "1px solid red", borderRadius: 10 }} />
            )}
          </div>
          <ButtonGroup className="d-flex justify-content-center mt-1">
            <Button size="sm" onClick={() => setInfoModal(true)}>
              <List />
            </Button>
            <Button size="sm" onClick={() => setVideoModal(true)}>
              <PlayCircle />
            </Button>
          </ButtonGroup>
        </div>
      </Card>
    </>
  )
}

export default withRouter(injectIntl(FoundCard))
