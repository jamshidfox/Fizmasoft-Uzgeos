import React, { useState, useEffect } from "react"
import { DragDrop } from "@uppy/react"
import { Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button, Spinner, CardImg } from "reactstrap"
import Uppy from "@uppy/core"
import thumbnailGenerator from "@uppy/thumbnail-generator"
import { useHistory } from "react-router-dom"
import Nouislider from "nouislider-react"
import { injectIntl } from "react-intl"

import { useDispatch, useSelector } from "react-redux"

import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/react/libs/noui-slider/noui-slider.scss"
import styled from "styled-components"
import { setSearchFace } from "../../VideoDetection/store/actions"

const ImageModal = ({ intl, open, img, setImg, setFile, submit, setSimilarity, loading }) => {
  const history = useHistory()
  const user_photoInfo = intl.formatMessage({ id: "SetUserPhotoInfo" })
  const uppy = new Uppy({
    meta: { type: "avatar" },
    restrictions: { maxNumberOfFiles: 1 },
    autoProceed: true
  })
  const dispatch = useDispatch()
  const { videoDetectionFace } = useSelector((data) => data.videoDetectionReducer)

  useEffect(() => {
    if (!videoDetectionFace) return
    setImg(videoDetectionFace)
    setFile(videoDetectionFace)
    dispatch(setSearchFace(null))
  }, [])

  uppy.use(thumbnailGenerator)

  uppy.on("thumbnail:generated", (file, preview) => {
    setImg(preview)
  })

  uppy.on("file-added", function (file) {
    const reader = new FileReader()
    reader.readAsDataURL(file.data)
    reader.onloadend = function () {
      const base64data = reader.result
      setFile(base64data)
    }
  })
  return (
    <Modal keyboard={false} backdrop="static" isOpen={open} className="modal-dialog-centered">
      <ModalHeader toggle={() => history.goBack()}>
        <div className="d-flex justify-content-between" style={{ width: 350 }}>
          <span>{intl.formatMessage({ id: "NtfsSearchImageModal" })}</span>
        </div>
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col md="6">
            <DragDrop
              uppy={uppy}
              width="100%"
              height="100%"
              note={intl.formatMessage({ id: "SetUserPhotoNote" })}
              restrictions={{
                allowedFileType: ["image/*", ".jpg", ".jpeg", ".png"]
              }}
              locale={{
                strings: {
                  // Text to show on the droppable area.
                  // `%{browse}` is replaced with a link that opens the system file selection dialog.
                  // Used as the label for the link that opens the system file selection dialog.
                  dropHereOr: user_photoInfo
                }
              }}
            />
          </Col>
          <Col md="6">
            <div style={{ height: 330, overflow: "hidden" }}>{img !== null ? <img className="rounded" style={{ width: "100%" }} src={img} alt="avatar" /> : null}</div>
          </Col>
        </Row>
      </ModalBody>
      <StyledModalFooter>
        <hr />
        <Row>
          <Col md="7">
            <div style={{ marginTop: "1em", marginLeft: "1em" }}>
              <Nouislider
                start={75}
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
          <Col md="2">
            <div style={{ marginBottom: "1em", marginLeft: "1em" }}>
              <Button style={!loading ? { width: 150 } : {}} disabled={img === null} onClick={submit} color="primary">
                {loading ? (
                  <div className="d-flex ">
                    <Spinner color="white" size="sm" />
                    <span className="ml-50">{intl.formatMessage({ id: "NtfsSearchImageModalButtonBefore" })}</span>
                  </div>
                ) : (
                  intl.formatMessage({ id: "NtfsSearchImageModalButtonAfter" })
                )}
              </Button>
            </div>
          </Col>
        </Row>
      </StyledModalFooter>
    </Modal>
  )
}

export default injectIntl(ImageModal)

const StyledModalFooter = styled.div`
  /* display: flex; */
  /* justify-content: space-between; */
`
