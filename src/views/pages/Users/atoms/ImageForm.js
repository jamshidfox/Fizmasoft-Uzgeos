import React, { useState } from "react"
import { Button, Col, FormGroup, Row } from "reactstrap"
import { DragDrop } from "@uppy/react"
import Uppy from "@uppy/core"
import thumbnailGenerator from "@uppy/thumbnail-generator"
import { injectIntl } from "react-intl"
import { getUsers, updateUserImage } from "../store/actions"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"

const ImageForm = ({ intl, setCenteredModalImageEdit, avatarId, setCenteredModal, rowsPerPage, currentPage }) => {
  const [img, setImg] = useState(null)
  const [prevImg, setPrevImg] = useState(null)
  const user_photoInfo = intl.formatMessage({ id: "SetUserPhotoInfo" })

  const dispatch = useDispatch()

  const uppy = new Uppy({
    meta: { type: "avatar" },
    restrictions: { maxNumberOfFiles: 1 },
    autoProceed: true
  })

  uppy.use(thumbnailGenerator)
  uppy.on("thumbnail:generated", (file, preview) => {
    setPrevImg(preview)
  })
  uppy.on("file-added", function (file) {
    const reader = new FileReader()
    reader.readAsDataURL(file.data)
    reader.onloadend = function () {
      const base64data = reader.result
      setImg(base64data)
    }
  })

  const handleUpdate = async () => {
    const limit = rowsPerPage
    const offset = currentPage * limit
    const newData = {
      avatar: img
    }
    if (img === null || img === undefined) {
      toast.error(intl.formatMessage({ id: "SetUserEnterPhoto" }))
    } else {
      await dispatch(updateUserImage(newData, avatarId))
      await dispatch(getUsers(limit, offset))
      toast.success(intl.formatMessage({ id: "SetUserImageSuccess" }))

      setCenteredModalImageEdit(false)
      setCenteredModal(false)
    }
  }
  return (
    <Row>
      <Col sm="12">
        {img !== null ? (
          <div className="mx-2 mt-2 mb-2" style={{ overflow: "hidden", marginBottom: "1em" }}>
            <img className="rounded" src={prevImg} alt="avatar" style={{ width: "100%" }} />
          </div>
        ) : (
          <div className="mb-2 mx-2">
            <span style={{ fontSize: 20, display: "flex" }} className="text-danger pt-1"></span>
            <DragDrop
              note={intl.formatMessage({ id: "SetUserPhotoNote" })}
              restrictions={{
                allowedFileType: ["image/*", ".jpg", ".jpeg", ".png"]
              }}
              locale={{
                strings: {
                  dropHereOr: user_photoInfo
                }
              }}
              uppy={uppy}
            />
          </div>
        )}
      </Col>
      <Col sm="12">
        <FormGroup className="d-flex justify-content-center">
          <Button.Ripple onClick={handleUpdate} className="mr-1" color="primary" type="submit">
            {intl.formatMessage({ id: "SetUserImageUpdate" })}
          </Button.Ripple>
          <Button.Ripple onClick={() => setCenteredModalImageEdit(false)} color="danger">
            {intl.formatMessage({ id: "SetButtonCancel" })}
          </Button.Ripple>
        </FormGroup>
      </Col>
    </Row>
  )
}

export default injectIntl(ImageForm)
