import { useState } from "react"
import { Card, CardBody, CardText, CardImg, Spinner, Row, Col, ModalHeader, Modal, ModalBody } from "reactstrap"
import CarPlate from "./car_plate"
// import { SRLWrapper, useLightbox } from "simple-react-lightbox"
import default_car from "../../../assets/background/car_default.jpg"
import Lightbox from "react-image-lightbox"
import "react-image-lightbox/style.css"
const CarPanel = ({ onImageLoading, car_pic_data, car_number, onLoad }) => {
  // const { openLightbox, closeLightbox } = useLightbox()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
     {/* <Modal style={{ minWidth: "50%" }} isOpen={isOpen} className="modal-dialog-centered"> */}
  {isOpen && car_pic_data[1] && <Lightbox  mainSrc={car_pic_data[1]} onCloseRequest={() => setIsOpen(false)} />}
  {/* </Modal> */}
      {/* <SRLWrapper
        options={{
          thumbnails: {
            showThumbnails: false
          },
          buttons: {
            backgroundColor: "rgba(30,30,36,0.8)",
            iconColor: "rgba(255, 255, 255, 0.8)",
            iconPadding: "10px",
            showAutoplayButton: false,
            showCloseButton: true,
            showDownloadButton: true,
            showFullscreenButton: true,
            showNextButton: false,
            showPrevButton: false,
            showThumbnailsButton: false,
            size: "40px"
          },
          progressBar: {
            showProgressBar: false
          }
        }}
      >
        <img src={car_pic_data[1] ? car_pic_data[1] : default_car} style={{ display: "none" }} alt="Card cap" onLoad={onLoad} />
      </SRLWrapper> */}
      <Row className="match-height">
        <Col lg="12" md="12">
          <Card style={{ height: 440, width: "100%" }}>
            {onImageLoading && (
              <div style={{ height: 400, width: "100%" }} className="d-flex justify-content-center align-items-center">
                <Spinner color="primary" />
              </div>
            )}

            <img
              // onClick={() => openLightbox(0)}
              onClick={() => setIsOpen(true)}
              src={car_pic_data[0] ? car_pic_data[0] : default_car}
              style={onImageLoading ? { objectFit: "contain", display: "none" } : { width: "100%", height: "80%", objectFit: "contain" }}
              alt="Card cap"
              onLoad={onLoad}
            />
            <CardBody>
              {/* <CardText> */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <CarPlate item={car_number} isDisabled={true} />
              </div>
              {/* </CardText> */}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default CarPanel

