import React, { useState } from "react"
import { Modal, ModalHeader } from "reactstrap"
import { IoImageSharp } from "react-icons/io5"
import { RiImageEditFill } from "react-icons/ri"
import ImageForm from "./ImageForm"

const ImageModal = ({ setCenteredModal, centeredModal, avatarId, avatarShow, currentPage, rowsPerPage }) => {
  const [centeredModalImage, setCenteredModalImage] = useState(false)
  const [centeredModalImageEdit, setCenteredModalImageEdit] = useState(false)

  return (
    <div>
      <div className="vertically-centered-modal">
        <Modal onBlur={() => setCenteredModal(false)} style={{ width: "300px" }} isOpen={centeredModal} toggle={() => setCenteredModal(!centeredModal)} className="modal-dialog-centered">
          <ModalHeader toggle={() => setCenteredModal(!centeredModal)}></ModalHeader>
          <div className="d-flex align-items-center justify-content-center py-2">
            {avatarShow.props && avatarShow.props.src ? (
              <IoImageSharp onClick={() => setCenteredModalImage(!centeredModalImage)} className="w-50 text-primary cursor-pointer" style={{ width: "48px", height: "48px" }} color="primary" />
            ) : null}
            <RiImageEditFill
              className="w-50 text-primary cursor-pointer"
              style={{ width: "48px", height: "48px" }}
              color="primary"
              onClick={() => setCenteredModalImageEdit(!centeredModalImageEdit)}
            />
          </div>
        </Modal>
      </div>
      <div className="vertically-centered-modal">
        <Modal
          onBlur={() => setCenteredModalImage(false)}
          style={{ minWidth: "20%" }}
          isOpen={centeredModalImage}
          toggle={() => setCenteredModalImage(!centeredModalImage)}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={() => setCenteredModalImage(!centeredModalImage)}></ModalHeader>
          {avatarShow}
        </Modal>
      </div>
      <div className="vertically-centered-modal">
        <Modal style={{ minWidth: "30%" }} isOpen={centeredModalImageEdit} toggle={() => setCenteredModalImageEdit(!centeredModalImageEdit)} className="modal-dialog-centered">
          <ModalHeader toggle={() => setCenteredModalImageEdit(!centeredModalImageEdit)}></ModalHeader>
          <ImageForm setCenteredModalImageEdit={setCenteredModalImageEdit} avatarId={avatarId} setCenteredModal={setCenteredModal} rowsPerPage={rowsPerPage} currentPage={currentPage} />
        </Modal>
      </div>
    </div>
  )
}

export default ImageModal
