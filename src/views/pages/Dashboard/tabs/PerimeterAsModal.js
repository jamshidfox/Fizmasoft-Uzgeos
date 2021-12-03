import ByDistricts from "../maleculas/perimeter/ByDistricts"
import DailyAll from "../maleculas/perimeter/DailyAll"
import { Modal, ModalBody, ModalHeader } from "reactstrap"
import { useState } from "react"
import moment from "moment"

const PerimeterAsModal = ({ open, setOpen }) => {
  const [date, setDate] = useState([moment(new Date().setHours(0, 0, 0, 0)).format("DD.MM.YYYY HH:mm:ss"), moment(new Date()).format("DD.MM.YYYY HH:mm:ss")])
  const [loading, setLoading] = useState(false)

  return (
    <Modal isOpen={open} toggle={() => setOpen(!open)} className="modal-dialog-centered modal-xl">
      <ModalHeader toggle={() => setOpen(!open)}></ModalHeader>
      <ModalBody>
        <div style={{ height: "87vh" }}>
          <div style={{ height: "35%" }}>
            <DailyAll sendDate={date} setLoading={setLoading} />
          </div>
          <div style={{ height: "60%", marginTop: 80 }}>
            <ByDistricts sendDate={date} setLoadingDistrict={setLoading} />
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default PerimeterAsModal
