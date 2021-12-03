import React, { useState, useRef, useEffect } from "react"
import { Image, List, PlayCircle } from "react-feather"
import { TiExport } from "react-icons/ti"
import { injectIntl } from "react-intl"
import videoDetectionApi from "../api"
import filterTypes from "../filter.json"
import moment from "moment"
import noImg from "../noImg.png"
import { useDispatch, useSelector } from "react-redux"
import { setSearchFace, setTabs, setSearchChannel } from "../store/actions/index"
import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import VideoModal from "../Components/VideoModal"
import { withRouter } from "react-router-dom"

const FoundCard = ({ data, history, intl, gender, setSelected, selected }) => {
  const [active, setActive] = useState(false)
  const [close, setClose] = useState(false)
  const [checked, setChecked] = useState(false)
  const [imagesTypeChecked, setImagesTypeChecked] = useState(null)
  const [imagesTypeCheckedStatus, setImagesTypeCheckedStatus] = useState(false)
  const [infoModal, setInfoModal] = useState(false)
  const [video, setVideo] = useState(false)
  const [modal, setModal] = useState(false)
  const imageRef = useRef()
  const devices = useSelector((state) => state.videoDetectionReducer.devices)

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
  const faceClick = async (toNtface, params) => {
    const res = await fetch(imageRef.current.src)
    const blobImg = await res.blob()
    const reader = new FileReader()
    reader.readAsDataURL(blobImg)
    reader.onloadend = function () {
      const base64data = reader.result
      dispatch(setSearchFace(base64data))
      dispatch(setSearchChannel(params.channel_id))
      if (toNtface) history.push("/ntfaceQidiruv")
      else dispatch(setTabs(1))
    }
  }
  useEffect(() => {
    setImagesTypeChecked(null)
    setImagesTypeCheckedStatus(false)
  }, [modal])
  const onHover = () => {
    setActive(true)
    setClose(false)
  }
  const outHover = () => {
    setActive(false)
    setClose(true)
  }
  const handleChecked = () => {
    setChecked(!checked)
    if (checked === false) {
      setSelected(selected + 1)
    } else {
      setSelected(selected - 1)
    }
  }
  const toggleCheckbox = (key, status) => {
    setImagesTypeChecked(key)
    setImagesTypeCheckedStatus(!status)
  }
  const imageTypeSubmit = (data) => {
    setModal(false)
    if (imagesTypeChecked === 2) {
      faceClick(true, data)
    } else if (imagesTypeChecked === 1) {
      faceClick(false, data)
    } else {
      faceClick(false, data)
    }
  }
  return (
    <div>
      <div>
        <Modal style={{ width: "350px" }} isOpen={modal} toggle={() => setModal(!modal)} className="modal-dialog-centered">
          <ModalHeader toggle={() => setModal(!modal)}>{intl.formatMessage({ id: "NavSearch" })}</ModalHeader>
          <ModalBody style={{ height: "40px" }} className="d-flex justify-content-around">
            {data.face_id ? (
              <FormGroup style={{ visibility: imagesTypeChecked === null || imagesTypeCheckedStatus === false || imagesTypeChecked === 0 ? "visible" : "hidden" }}>
                <Input onChange={() => toggleCheckbox(0, imagesTypeCheckedStatus)} className="cursor-pointer" type="checkbox" id="face" />
                <Label className="cursor-pointer" for="face">
                  {intl.formatMessage({ id: "DETECT_BY_FACE" })}
                </Label>
              </FormGroup>
            ) : null}

            <FormGroup style={{ visibility: imagesTypeChecked === null || imagesTypeCheckedStatus === false || imagesTypeChecked === 1 ? "visible" : "hidden" }}>
              <Input onChange={() => toggleCheckbox(1, imagesTypeCheckedStatus)} className="cursor-pointer" type="checkbox" id="body" />
              <Label className="cursor-pointer" for="body">
                {intl.formatMessage({ id: "DETECT_BY_BODY" })}
              </Label>
            </FormGroup>

            {data.face_id ? (
              <FormGroup style={{ visibility: imagesTypeChecked === null || imagesTypeCheckedStatus === false || imagesTypeChecked === 2 ? "visible" : "hidden" }}>
                <Input onChange={() => toggleCheckbox(2, imagesTypeCheckedStatus)} className="cursor-pointer" type="checkbox" id="human" />
                <Label className="cursor-pointer" for="human">
                  {intl.formatMessage({ id: "DETECT_BY_HUMAN" })}
                </Label>
              </FormGroup>
            ) : null}
          </ModalBody>
          <ModalFooter style={{ height: "50px", padding: "0 10px 0 0" }}>
            <Button style={{ padding: "5px 10px" }} color="primary" disabled={imagesTypeCheckedStatus === false} onClick={() => imageTypeSubmit(data)}>
              {intl.formatMessage({ id: "NavSearch" })}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <VideoModal url={videoDetectionApi.getVideoUrl(data.start_time, data.channel_id)} channel={data.channel_id} time={data.start_time} open={video} setOpen={setVideo} />
      <Modal isOpen={infoModal} toggle={() => setInfoModal(!infoModal)} className="modal-dialog-centered">
        <ModalHeader toggle={() => setInfoModal(!infoModal)}></ModalHeader>
        <ModalBody>
          <div>
            {objArr(data.human_attr).map((d) => (
              <div key={d.type} className="d-flex justify-content-between">
                <h5 style={{ fontWeight: "bold", fontSize: "11px" }}>{intl.formatMessage({ id: d.type })}:</h5>
                <h5 style={{ fontSize: "11px", textAlign: "end" }}>
                  {Object.keys(filterTypes).includes(d.type) && filterTypes[d.type][d.val] !== undefined ? intl.formatMessage({ id: filterTypes[d.type][d.val] }) : d.val}
                </h5>
              </div>
            ))}
            <hr />
            {objArr(data.face_attr).map((d) => (
              <div key={d.type} className="d-flex justify-content-between">
                <h5 style={{ fontWeight: "bold", fontSize: "11px" }}>{intl.formatMessage({ id: d.type })}:</h5>
                <h5 style={{ fontSize: "11px", textAlign: "end" }}>{Object.keys(filterTypes).includes(d.type) ? intl.formatMessage({ id: filterTypes[d.type][d.val] }) : d.val}</h5>
              </div>
            ))}
          </div>
        </ModalBody>
      </Modal>
      <div onMouseEnter={() => onHover()} onMouseLeave={() => outHover()} className="border-secondary d-flex flex-column justify-content-between  mb-1 mr-1 mt-0" style={{ width: 200, height: 180 }}>
        <div style={{ padding: "5px 10px" }} className="d-flex justify-content-between bg-secondary align-items-center mb-1">
          <h5 style={{ fontSize: "11px" }} className="mb-0 text-white">
            {devices.filter((d) => d.channel === data.channel_id)[0].title}
          </h5>
          <div style={{ position: "relative" }} className="d-flex align-items-center">
            <h5 style={{ fontSize: "11px" }} className="mb-0 text-white">
              {moment(data.start_time).format("DD.MM.YYYY HH:mm")}
            </h5>
            <input
              onChange={handleChecked}
              style={{ marginLeft: "5px", position: "absolute", right: -15, top: -6, zIndex: 9999 }}
              className={checked ? "d-flex cursor-pointer" : active ? "d-flex cursor-pointer" : "d-none"}
              type="checkbox"
            />
          </div>
        </div>
        <div style={{ padding: "0 10px", height: 140 }} className="d-flex justify-content-around">
          {data.human_id ? (
            <img src={videoDetectionApi.getImageUrl(data.human_id)} style={{ width: 60, height: 100, objectFit: "contain" }} alt="human" />
          ) : (
            <img src={noImg} style={{ width: 60, height: 100, objectFit: "contain" }} />
          )}
          {data.face_id ? (
            <img src={videoDetectionApi.getImageUrl(data.face_id)} ref={imageRef} style={{ width: 60, height: 100, objectFit: "contain" }} alt="face" />
          ) : (
            <div style={{ marginLeft: "8px", overflowX: "hidden" }} className="d-flex w-100 d-flex flex-column">
              {objArr(data.human_attr)
                .slice(0, 4)
                .map((d) => (
                  <div key={d.type} className="d-flex justify-content-between">
                    <h5 style={{ fontWeight: "bold", fontSize: "11px" }}>{intl.formatMessage({ id: d.type })}:</h5>
                    <h5 style={{ fontSize: "11px", textAlign: "end" }}>
                      {Object.keys(filterTypes).includes(d.type) && filterTypes[d.type][d.val] !== undefined ? intl.formatMessage({ id: filterTypes[d.type][d.val] }) : d.val}
                    </h5>
                  </div>
                ))}
            </div>
          )}
        </div>
        {!active ? (
          <div style={{ padding: "1px 10px" }} className="bg-secondary text-white">
            {intl.formatMessage({ id: "HUMAN_DETECTION" })}
          </div>
        ) : (
          <div style={{ padding: "2px 10px" }} className="bg-secondary d-flex justify-content-around w-full text-white">
            <PlayCircle onClick={() => setVideo(true)} className="cursor-pointer" style={{ width: 20, height: 20 }} />
            <TiExport className="cursor-pointer" style={{ width: 20, height: 20 }} />
            <Image style={{ padding: "0" }} className="cursor-pointer" onClick={() => setModal(true)} style={{ width: 20, height: 20 }} />
            <List onClick={() => setInfoModal(true)} className="cursor-pointer" style={{ width: 20, height: 20 }} />
          </div>
        )}
      </div>
    </div>
  )
}

export default withRouter(injectIntl(FoundCard))
