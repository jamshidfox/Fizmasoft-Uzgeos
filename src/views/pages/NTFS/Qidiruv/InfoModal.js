import React from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Progress, CardImg, Badge } from "reactstrap"

import { Marker } from "react-leaflet"
import ReactBasicMap from "../../Map/utils/ReactBasicMap"
import { injectIntl } from "react-intl"

import L from "leaflet"
import icon from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"

const InfoModal = ({ open, toggle, data, intl, findData }) => {
  const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  })

  L.Marker.prototype.options.icon = DefaultIcon

  const token = localStorage.getItem("access_token")

  return (
    <Modal isOpen={open} toggle={toggle} className="modal-dialog-centered modal-xl">
      <ModalHeader toggle={toggle}> {intl.formatMessage({ id: "NtfsInfoModal" })}</ModalHeader>
      <ModalBody className="d-flex justify-content-around mt-1">
        <>
          <div>
            <h4 className="mx-auto text-primary">
              {intl.formatMessage({ id: "NtfsInfoModalText" })}: {data?.repository?.name}{" "}
            </h4>
            <CardImg style={{ width: 350 }} src={`${data.img}?token=${JSON.parse(token)}`} alt="img" />
          </div>
          <div style={{ width: 400 }} className="ml-1 p-1 ">
            <h4 className="mx-auto text-primary"> {intl.formatMessage({ id: "NtfsInfoModalGeneral" })}</h4>
            <div className="d-flex  justify-content-between mt-1 ">
              <strong>{intl.formatMessage({ id: "NtfsInfoModalFullName" })}:</strong>
              <em>{data.fullname}</em>
            </div>
            <div className="d-flex  justify-content-between mt-1">
              <strong>{intl.formatMessage({ id: "NtfsInfoModalBirthDate" })}:</strong>
              <em>{data.birthday}</em>
            </div>
            {/* <div className="d-flex  justify-content-between mt-1">
              <strong>Jinsi:</strong>
              <em>{data.gender === 1 ? "Erkak" : "Ayol"}</em>
            </div> */}
            <div className="d-flex  justify-content-between mt-1">
              <strong>{intl.formatMessage({ id: "NtfsInfoModalCity" })}: </strong>
              <em>{data?.permanent?.region}</em>
            </div>
            <div className="d-flex  justify-content-between mt-1">
              <strong>{intl.formatMessage({ id: "NtfsInfoModalRegion" })}: </strong>
              <em>{data?.permanent?.district} </em>
            </div>
            <div className="d-flex  justify-content-between mt-1">
              <strong>{intl.formatMessage({ id: "NtfsInfoModalAddress" })}: </strong>
              <em>
                {data?.permanent?.street} {data?.permanent?.house} {intl.formatMessage({ id: "NtfsInfoModalDormitory" })}{" "}
              </em>
            </div>
            <div className="d-flex  justify-content-between mt-1">
              <strong>{intl.formatMessage({ id: "NtfsInfoModalPassport" })}:</strong>
              <em>{data.passport}</em>
            </div>
            <div className="d-flex  justify-content-between mt-1">
              <strong>{intl.formatMessage({ id: "NtfsInfoModalSimilarity" })}:</strong>
              <em>{data.similarity}%</em>
            </div>
            <h5 className="pt-1 mx-auto text-primary">Қўшимча маълумотлар</h5>
            <div className="d-flex  justify-content-evenly" style={{ width: 50 }}>
              {data.abd && (
                <Badge className="ml-1" color="warning">
                  Abd
                </Badge>
              )}
              {data.amt && (
                <Badge className="ml-1" color="warning">
                  Amt
                </Badge>
              )}
              {data.dosye && (
                <Badge className="ml-1" color="warning">
                  Dosye
                </Badge>
              )}
              {data.forma1 && (
                <Badge className="ml-1" color="warning">
                  Forma 1
                </Badge>
              )}
              {data.military && (
                <Badge className="ml-1" color="warning">
                  Military
                </Badge>
              )}
            </div>
          </div>
          <div style={{ width: 400 }} className="ml-1 p-1 ">
            <h4 className="mx-auto text-primary">{intl.formatMessage({ id: "NtfsInfoModalMapLocation" })}</h4>
            <div style={{ width: 400, height: 340 }}>
              <ReactBasicMap center={data?.coordinates} zoom={18} fullscreen={true}>
                {data?.coordinates && <Marker position={data?.coordinates} />}
              </ReactBasicMap>
            </div>
          </div>
        </>
      </ModalBody>
      <ModalFooter>
        <Button onClick={toggle} color="info">
          {intl.formatMessage({ id: "NtfsInfoModalOk" })}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default injectIntl(InfoModal)

// <Col md="5">
//               <Row style={{ position: "relative", top: 30 }}>
//                 <Col md="5" style={{ position: "relative", top: 15 }}>
//                   <Nouislider
//                     start={similarity * 100}
//                     direction={"ltr"}
//                     orientation="horizontal"
//                     onSlide={(render, handle, value, un, percent) => setSimilarity(value[0].toFixed(0) / 100)}
//                     tooltips={true}
//                     range={{
//                       min: 0,
//                       max: 100
//                     }}
//                   />
//                 </Col>

//                 <Button color="primary" style={{ height: 50 }} onClick={() => handleSearchPerson()}>
//                   <Search size="16" />
//                 </Button>
//               </Row>
//             </Col>
//             <Col md="12">
//               <h2 className="mx-auto text-center text-primary">Кидирилган расм бойича маълумотлар</h2>{" "}
//
//             </Col>
//             <Col md="12">
//               <hr />
//             </Col>
