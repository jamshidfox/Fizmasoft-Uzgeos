import React from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Progress, CardImg, Badge } from "reactstrap"
import img from "./hello.jpg"

import { Marker } from "react-leaflet"
import ReactBasicMap from "../../Map/utils/ReactBasicMap"

import L from "leaflet"
import icon from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"

const InfoModal = ({ open, toggle }) => {
  const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  })

  L.Marker.prototype.options.icon = DefaultIcon
  return (
    <Modal backdrop="static" isOpen={open} toggle={toggle} className="modal-dialog-centered modal-xl">
      <ModalHeader toggle={toggle}>Фукаро бойича толик маълумотлар</ModalHeader>
      <ModalBody className="d-flex justify-content-around mt-1">
        <div>
          <h4 className="mx-auto text-primary">Fuqaro</h4>
          <CardImg style={{ width: 350 }} src={img} alt="img" />
          <Progress striped value="85" className="mt-2">
            85%
          </Progress>
        </div>
        <div style={{ width: 400 }} className="ml-1 p-1 ">
          <h4 className="mx-auto text-primary">Umumiy ma'lumotlar</h4>
          <div className="d-flex  justify-content-between mt-1 ">
            <strong>Ismi Sharifi:</strong>
            <em>Palonchiyev Pismadonchi</em>
          </div>
          <div className="d-flex  justify-content-between mt-1">
            <strong>Tugulgan sana:</strong>
            <em>09/09/1909</em>
          </div>
          <div className="d-flex  justify-content-between mt-1">
            <strong>Manzili: </strong>
            <em>B. Aliev ko'chasi 22</em>
          </div>
          <div className="d-flex  justify-content-between mt-1">
            <strong>Passport raqami:</strong>
            <em>AA 000000</em>
          </div>
          <div className="d-flex  justify-content-between mt-1">
            <strong>Oxshashligi:</strong>
            <em>85%</em>
          </div>
          <h5 className="pt-1 mx-auto text-primary">Qoshimcha ma'lumotlar</h5>
          <div className="d-flex  justify-content-evenly">
            <Badge color="warning">Narkoman</Badge>
            <Badge color="warning">Quroli bor</Badge>
            <Badge color="warning">Psix</Badge>
          </div>
        </div>
        <div style={{ width: 400 }} className="ml-1 p-1 ">
          <h4 className="mx-auto text-primary">Xaritada yashash manzili</h4>
          <div style={{ width: 400, height: 250 }}>
            <ReactBasicMap zoom={16} fullscreen={true}>
              <Marker position={[41.31, 69.29]} />
            </ReactBasicMap>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button onClick={toggle} color="info">
          OK
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default InfoModal
