import React from "react"
import { Modal, ModalHeader, ModalBody, CardImg } from "reactstrap"
import { Marker } from "react-leaflet"
import ReactBasicMap from "../../Map/utils/ReactBasicMap"

import L from "leaflet"
import icon from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"


const AlarmModal = ({ open, toggle, alarm }) => {
  const token = localStorage.getItem("access_token")

  const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  })

  L.Marker.prototype.options.icon = DefaultIcon

  return (
    <Modal isOpen={open} toggle={toggle} className="modal-dialog-centered modal-xl">
      <ModalHeader toggle={toggle}>Фуқаро бўйича тўлиқ маълумотлар</ModalHeader>
      <ModalBody className="d-flex justify-content-around mt-1">
        {alarm.alertData?.results &&
          alarm.alertData?.results.map((item, index) => (
            <div style={{ display: "flex", justifyContent: "space-between" }} key={index}>
              <div>
                <h4 className="mx-auto text-primary">Маълумотлар омбори: {item?.repository?.name} </h4>
                <CardImg style={{ width: 350, height: 340, objectFit: "cover" }} src={`${item.img}?token=${JSON.parse(token)}`} alt="img" />
              </div>
              <div style={{ width: 400 }} className="ml-1 p-1 ">
                <h4 className="mx-auto text-primary">Умумий маълумотлар</h4>
                <div className="d-flex  justify-content-between mt-1 ">
                  <strong>Исми Шарифи:</strong>
                  <em>{item.fullname}</em>
                </div>
                <div className="d-flex  justify-content-between mt-1">
                  <strong>Туғилган сана:</strong>
                  <em>{item.birthday}</em>
                </div>

                <div className="d-flex  justify-content-between mt-1">
                  <strong>Шаҳри: </strong>
                  <em>{item?.permanent?.region}</em>
                </div>
                <div className="d-flex  justify-content-between mt-1">
                  <strong>Тумани: </strong>
                  <em>{item?.permanent?.district} </em>
                </div>
                <div className="d-flex  justify-content-between mt-1">
                  <strong>Манзили: </strong>
                  <em>
                    {item?.permanent?.street} {item?.permanent?.house} уй{" "}
                  </em>
                </div>
                <div className="d-flex  justify-content-between mt-1">
                  <strong>Паспорт рақами:</strong>
                  <em>{item.passport}</em>
                </div>
                <div className="d-flex  justify-content-between mt-1">
                  <strong>Ўхшашлиги:</strong>
                  <em>{item.similarity}%</em>
                </div>
                <h5 className="pt-1 mx-auto text-primary">Қўшимча маълумотлар</h5>
              </div>
              <div style={{ width: 400 }} className="ml-1 p-1 ">
                <h4 className="mx-auto text-primary">Харитада яшаш манзили</h4>
                <div style={{ width: 400, height: 340 }}>
                  <ReactBasicMap center={item?.coordinates} zoom={18} fullscreen={true}>
                    {item?.coordinates && <Marker position={item?.coordinates} />}
                  </ReactBasicMap>
                </div>
              </div>
            </div>
          ))}
      </ModalBody>
    </Modal>
  )
}

export default AlarmModal
