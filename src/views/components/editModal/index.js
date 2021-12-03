import React from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import styled from "styled-components"

const EditModal = ({ openModal, customWidth, style, setOpenModal, size = "md", title = "Маьлумотьни ўзгартириш", children, footerContent = null }) => {
  return (
    <CustomStyledModal unmountOnClose={true} style={style} customwidth={customWidth} isOpen={openModal} toggle={() => setOpenModal(false)} className={`modal-dialog-centered modal-${size} `}>
      <ModalHeader style={style} toggle={() => setOpenModal(false)}>
        {title}
      </ModalHeader>
      <ModalBody style={style}>{children}</ModalBody>
      <ModalFooter>{footerContent}</ModalFooter>
    </CustomStyledModal>
  )
}
export default EditModal
const CustomStyledModal = styled(Modal)`
  .modal-content {
    width: ${(props) => `${props.customwidth}px`};
  }
  .modal-footer {
    width: ${(props) => `${props.customwidth}px`};
  }
`
