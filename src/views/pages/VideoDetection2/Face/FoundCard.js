import moment from "moment"
import React, { useEffect, useRef, useState } from "react"
import { Image, PlayCircle } from "react-feather"
import { TiExport } from "react-icons/ti"
import { injectIntl } from "react-intl"
import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Progress } from "reactstrap"
import videoDetectionApi from "../../VideoDetection2/api"
import VideoModal from "../Components/VideoModal"
import filterTypes from "../filter.json"
import { useDispatch, useSelector } from "react-redux"
import { setSearchFace, setTabs, setSearchChannel } from "../store/actions"

import { withRouter } from "react-router-dom"

const FoundCard = ({ intl, history, data, setSelected, selected }) => {
  const [active, setActive] = useState(false)
  const [close, setClose] = useState(false)
  const [checked, setChecked] = useState(false)
  const [imagesTypeChecked, setImagesTypeChecked] = useState(null)
  const [imagesTypeCheckedStatus, setImagesTypeCheckedStatus] = useState(false)
  const [video, setVideo] = useState(false)
  const dispatch = useDispatch()
  const [modal, setModal] = useState(false)
  const imageRef = useRef()
  const devices = useSelector((state) => state.videoDetectionReducer.devices)

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
  useEffect(() => {
    setImagesTypeChecked(null)
    setImagesTypeCheckedStatus(false)
  }, [modal])
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
  const toggleCheckbox = (key, status) => {
    setImagesTypeChecked(key)
    setImagesTypeCheckedStatus(!status)
  }
  const imageTypeSubmit = (params) => {
    setModal(false)
    if (imagesTypeChecked === 1) {
      faceClick(true, params)
    } else {
      faceClick(false, params)
    }
  }
  return (
    <>
      <div>
        <Modal style={{ width: "350px" }} isOpen={modal} toggle={() => setModal(!modal)} className="modal-dialog-centered">
          <ModalHeader toggle={() => setModal(!modal)}>{intl.formatMessage({ id: "NavSearch" })}</ModalHeader>
          <ModalBody style={{ height: "40px" }} className="d-flex justify-content-around">
            <FormGroup style={{ visibility: imagesTypeChecked === null || imagesTypeCheckedStatus === false || imagesTypeChecked === 0 ? "visible" : "hidden" }}>
              <Input onChange={() => toggleCheckbox(0, imagesTypeCheckedStatus)} className="cursor-pointer" type="checkbox" id="face" />
              <Label className="cursor-pointer" for="face">
                {intl.formatMessage({ id: "DETECT_BY_FACE" })}
              </Label>
            </FormGroup>
            <FormGroup style={{ visibility: imagesTypeChecked === null || imagesTypeCheckedStatus === false || imagesTypeChecked === 1 ? "visible" : "hidden" }}>
              <Input onChange={() => toggleCheckbox(1, imagesTypeCheckedStatus)} className="cursor-pointer" type="checkbox" id="human" />
              <Label className="cursor-pointer" for="human">
                {intl.formatMessage({ id: "DETECT_BY_HUMAN" })}
              </Label>
            </FormGroup>
          </ModalBody>
          <ModalFooter style={{ height: "50px", padding: "0 10px 0 0" }}>
            <Button style={{ padding: "5px 10px" }} color="primary" disabled={imagesTypeCheckedStatus === false} onClick={() => imageTypeSubmit(data)}>
              {intl.formatMessage({ id: "NavSearch" })}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <VideoModal url={videoDetectionApi.getVideoUrl(data.the_date, data.channel_id)} channel={data.channel_id} time={data.the_date} open={video} setOpen={setVideo} />
      <div onMouseEnter={() => onHover()} onMouseLeave={() => outHover()} className="border-secondary d-flex flex-column justify-content-between  mb-1 mr-1 mt-0" style={{ width: 200, height: 180 }}>
        <div style={{ padding: "5px 10px" }} className="d-flex justify-content-between bg-secondary align-items-center mb-1">
          <h5 style={{ fontSize: "11px" }} className="mb-0 text-white">
            {devices.filter((d) => d.channel === data.channel_id)[0].title}
          </h5>
          <div style={{ position: "relative" }} className="d-flex align-items-center">
            <h5 style={{ fontSize: "11px" }} className="mb-0 text-white">
              {moment(data.the_date).format("DD.MM.YYYY HH:mm")}
            </h5>
            <input
              onChange={handleChecked}
              style={{ marginLeft: "5px", position: "absolute", right: -15, top: -6, zIndex: 9999 }}
              className={checked ? "d-flex cursor-pointer" : active ? "d-flex cursor-pointer" : "d-none"}
              type="checkbox"
            />
          </div>
        </div>
        <div style={{ padding: "0 10px", height: 70 }} className="d-flex justify-content-between">
          <img ref={imageRef} style={{ width: 60, height: 80, objectFit: "contain" }} src={videoDetectionApi.getImageUrl(data.event_id)} alt="human" />
          <div className="w-100 px-1">
            {!data.age && (
              <div className="d-flex justify-content-between">
                <p style={{ fontWeight: "bold", fontSize: "11px" }}>{intl.formatMessage({ id: "Glasses" })}:</p>
                <p style={{ fontSize: "11px", textAlign: "end" }}></p>
              </div>
            )}
            {!data.age && (
              <div className="d-flex justify-content-between">
                <p style={{ fontWeight: "bold", fontSize: "11px" }}>{intl.formatMessage({ id: "Gender" })}:</p>
                <p style={{ fontSize: "11px", textAlign: "end" }}></p>
              </div>
            )}
            {!data.age && (
              <div className="d-flex justify-content-between">
                <p style={{ fontWeight: "bold", fontSize: "11px" }}>{intl.formatMessage({ id: "age" })}:</p>
                <p style={{ fontSize: "11px", textAlign: "end" }}></p>
              </div>
            )}
            {data.age && (
              <div className="d-flex justify-content-between">
                <p style={{ fontWeight: "bold", fontSize: "11px" }}>{intl.formatMessage({ id: "age" })}:</p>
                <p style={{ fontSize: "11px", textAlign: "end" }}>{data.age}</p>
              </div>
            )}
            {data.gender && (
              <div className="d-flex justify-content-between">
                <p style={{ fontWeight: "bold", fontSize: "11px" }}>{intl.formatMessage({ id: "gender" })}:</p>
                <p style={{ fontSize: "11px", textAlign: "end" }}>{intl.formatMessage({ id: filterTypes.gender[data.gender] })}</p>
              </div>
            )}
          </div>
        </div>
        {data.similarity && (
          <div style={{ padding: "5px 10px 0px" }} className="d-flex justify-content-between align-items-center">
            <div style={{ width: "80%", height: "5px" }}>
              <Progress min="0" max="100" value={data.similarity} />
            </div>
            <p style={{ fontSize: "12px", fontWeight: "bold" }} className="m-0">
              {data.similarity}%
            </p>
          </div>
        )}
        {!active ? (
          <div style={{ padding: "1px 10px", marginTop: "5px" }} className=" mb-0 bg-secondary text-white">
            {intl.formatMessage({ id: "FACE_DETECTION" })}
          </div>
        ) : (
          <div style={{ padding: "2px 10px", marginTop: "5px" }} className="bg-secondary d-flex justify-content-around w-full text-white">
            <PlayCircle onClick={() => setVideo(true)} className="cursor-pointer" style={{ width: 20, height: 20 }} />
            <TiExport className="cursor-pointer" style={{ width: 20, height: 20 }} />
            <Image style={{ padding: "0" }} className="cursor-pointer" onClick={() => setModal(true)} style={{ width: 20, height: 20 }} />
          </div>
        )}
      </div>
    </>
  )
}

export default withRouter(injectIntl(FoundCard))
