import axios from "axios"
import { useEffect, useState } from "react"
import { injectIntl } from "react-intl"
import { withRouter } from "react-router-dom"
import { Modal, ModalHeader, ModalFooter, ModalBody, Button, Spinner } from "reactstrap"
import Passport from "../../../components/Passport/Passport"
import avtoQidiruvApi from "../api"
import useJwt from "@src/auth/jwt/useJwt"
import CarOwnerDetailsModal from "./CarOwnerDetailsModal"
const config = useJwt.jwtConfig

const CarDetailsModal = ({ history, intl, carNumber, open, setOpen }) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})

  const [paspModal, setPaspModal] = useState(false)
  const [paspLoading, setPaspLoading] = useState(false)
  const [passportInfo, setPassportInfo] = useState([])

  useEffect(async () => {
    if (carNumber === "00A000AA") return
    try {
      setLoading(true)
      const { data } = await avtoQidiruvApi.getCarDetails(carNumber)
      setData(data)
    } catch {}
    setLoading(false)
  }, [carNumber])

  const ownerData = () => {
    setPaspModal(true)
    setPaspLoading(true)
    try {
      axios.post(`${config.url}/foreign/xatlov/forma1`, { pcitizen: data.pCitizen }).then((res) => {
        setLoading(false)
        if (res.status === 200) {
          setPassportInfo(res.data.data)
        }
      })
    } catch {}
    setPaspLoading(false)
  }

  return (
    <>
      <Modal style={{ minWidth: "50%" }} isOpen={open} toggle={() => setOpen(!open)} className="modal-dialog-centered">
        <ModalHeader style={{ position: "relative", padding: "20px" }} toggle={() => setOpen(!open)}>
          <div style={{ width: "100%", position: "absolute" }}>
            <h5 style={{ textAlign: "center" }}>{intl.formatMessage({ id: "Vehicle registration sheet" })}</h5>
          </div>
        </ModalHeader>
        <ModalBody>
          {loading ? (
            <Spinner />
          ) : data && data.pResult > 0 ? (
            <div>
              <div style={{ fontSize: "20px" }} className="d-flex justify-content-center align-items-center border w-100 font-weight-bold">
                {intl.formatMessage({ id: "Vehicle registration" })}
              </div>
              <div className="d-flex w-100">
                <div style={{ padding: "5px" }} className="d-flex justify-content-between align-items-center border w-50">
                  <h6 style={{ paddingRight: "10px" }} className="m-0  text-right border-r w-50">
                    {intl.formatMessage({ id: "Car division" })}
                  </h6>
                  <p style={{ paddingLeft: "10px" }} className="m-0  border-left w-50">{`${data.VehicleInfoResult.pDivision}`}</p>
                </div>
                <div style={{ padding: "5px" }} className="d-flex justify-content-between align-items-center border w-50">
                  <h6 style={{ paddingRight: "10px" }} className="m-0 w-50 text-right border-r">
                    {intl.formatMessage({ id: "Car plate number" })}
                  </h6>
                  <p style={{ paddingLeft: "10px" }} className="m-0 w-50 border-left">{`${data.VehicleInfoResult.pPlateNumber}`}</p>
                </div>
              </div>
              <div className="d-flex w-100">
                <div style={{ padding: "5px" }} className="d-flex justify-content-center align-items-center border w-50">
                  <h6 style={{ paddingRight: "10px", fontSize: "16px" }} className="m-0 w-50 text-center border-r text-primary">
                    {intl.formatMessage({ id: "AMT record sheet" })}
                  </h6>
                </div>
                <div style={{ padding: "5px" }} className="d-flex justify-content-center align-items-center border w-50">
                  <h6 style={{ paddingRight: "10px", fontSize: "16px" }} className="m-0 w-50 text-center border-r text-primary">
                    {intl.formatMessage({ id: "Car owner details" })}
                  </h6>
                </div>
              </div>

              <div className="d-flex w-100">
                <div className="w-50">
                  <div style={{ padding: "5px" }} className="d-flex justify-content-between align-items-center border">
                    <h6 style={{ paddingRight: "10px" }} className="m-0 w-50 text-right border-r">
                      {intl.formatMessage({ id: "Car owner" })}
                    </h6>
                    <p style={{ paddingLeft: "10px" }} className="m-0 w-50 border-left">{`${data.pOwner.pSurname} ${data.pOwner.pName}`}</p>
                  </div>

                  <div style={{ padding: "5px" }} className="d-flex justify-content-between align-items-center border">
                    <h6 style={{ paddingRight: "10px" }} className="m-0 w-50 text-right border-r">
                      {intl.formatMessage({ id: "Registration date" })}
                    </h6>
                    <p style={{ paddingLeft: "10px" }} className="m-0 w-50 border-left">
                      {data.VehicleInfoResult.pRegistrationDate}
                    </p>
                  </div>
                  <div style={{ padding: "5px" }} className="d-flex justify-content-between align-items-center border">
                    <h6 style={{ paddingRight: "10px" }} className="m-0 w-50 text-right border-r">
                      {intl.formatMessage({ id: "Car plate number" })}
                    </h6>
                    <p style={{ paddingLeft: "10px" }} className="m-0 w-50 border-left font-weight-bold">{`${data.VehicleInfoResult.pPlateNumber}`}</p>
                  </div>
                  <div style={{ padding: "5px" }} className="d-flex justify-content-between align-items-center border">
                    <h6 style={{ paddingRight: "10px" }} className="m-0 w-50 text-right border-r">
                      {intl.formatMessage({ id: "Year" })}
                    </h6>
                    <p style={{ paddingLeft: "10px" }} className="m-0 w-50 border-left">
                      {data.VehicleInfoResult.pYear}
                    </p>
                  </div>
                  <div style={{ padding: "5px" }} className="d-flex justify-content-between align-items-center border">
                    <h6 style={{ paddingRight: "10px" }} className="m-0 w-50 text-right border-r">
                      {intl.formatMessage({ id: "LochinKozCarModel" })}
                    </h6>
                    <p style={{ paddingLeft: "10px" }} className="m-0 w-50 border-left">
                      {data.VehicleInfoResult.pModel}
                    </p>
                  </div>
                  <div style={{ padding: "5px" }} className="d-flex justify-content-between align-items-center border">
                    <h6 style={{ paddingRight: "10px" }} className="m-0 w-50 text-right border-r">
                      {intl.formatMessage({ id: "Vehicle type" })}
                    </h6>
                    <p style={{ paddingLeft: "10px" }} className="m-0 w-50 border-left">
                      {data.VehicleInfoResult.pVehicleType}
                    </p>
                  </div>
                  <div style={{ padding: "5px" }} className="d-flex justify-content-between align-items-center border">
                    <h6 style={{ paddingRight: "10px" }} className="m-0 w-50 text-right border-r">
                      {intl.formatMessage({ id: "LochinKozColor" })}
                    </h6>
                    <p style={{ paddingLeft: "10px" }} className="m-0 w-50 border-left">
                      {data.VehicleInfoResult.pVehicleColor}
                    </p>
                  </div>
                  {data.VehicleInfoResult.pFullWeight ? (
                    <div style={{ padding: "5px" }} className="d-flex justify-content-between align-items-center border">
                      <h6 style={{ paddingRight: "10px" }} className="m-0 w-50 text-right border-r">
                        {intl.formatMessage({ id: "Car full weight" })}
                      </h6>
                      <p style={{ paddingLeft: "10px" }} className="m-0 w-50 border-left">
                        {data.VehicleInfoResult.pFullWeight}
                      </p>
                    </div>
                  ) : null}
                  {data.VehicleInfoResult.pEmptyWeight ? (
                    <div style={{ padding: "5px" }} className="d-flex justify-content-between align-items-center border">
                      <h6 style={{ paddingRight: "10px" }} className="m-0 w-50 text-right border-r">
                        {intl.formatMessage({ id: "Car weight" })}
                      </h6>
                      <p style={{ paddingLeft: "10px" }} className="m-0 w-50 border-left">
                        {data.VehicleInfoResult.pEmptyWeight}
                      </p>
                    </div>
                  ) : null}

                  <div style={{ padding: "5px" }} className="d-flex justify-content-between align-items-center border">
                    <h6 style={{ paddingRight: "10px" }} className="m-0 w-50 text-right border-r">
                      {intl.formatMessage({ id: "Seats count" })}
                    </h6>
                    <p style={{ paddingLeft: "10px" }} className="m-0 w-50 border-left">
                      {data.VehicleInfoResult.pSeats}
                    </p>
                  </div>

                  {data.VehicleInfoResult.pStands ? (
                    <div style={{ padding: "5px" }} className="d-flex justify-content-between align-items-center border">
                      <h6 style={{ paddingRight: "10px" }} className="m-0 w-50 text-right border-r">
                        Stands
                      </h6>{" "}
                      <p style={{ paddingLeft: "10px" }} className="m-0 w-50 border-left">
                        {data.VehicleInfoResult.pStands}
                      </p>{" "}
                    </div>
                  ) : null}

                  <div style={{ padding: "5px" }} className="d-flex justify-content-between align-items-center border">
                    <h6 style={{ paddingRight: "10px" }} className="m-0 w-50 text-right border-r">
                      {intl.formatMessage({ id: "Fuel type" })}
                    </h6>
                    <p style={{ paddingLeft: "10px" }} className="m-0 w-50 border-left">
                      {data.VehicleInfoResult.pFuelType}
                    </p>
                  </div>
                  <div style={{ padding: "5px" }} className="d-flex justify-content-between align-items-center border">
                    <h6 style={{ paddingRight: "10px" }} className="m-0 w-50 text-right border-r">
                      {intl.formatMessage({ id: "Motor number" })}
                    </h6>
                    <p style={{ paddingLeft: "10px" }} className="m-0 w-50 border-left">
                      {data.VehicleInfoResult.pMotor}
                    </p>
                  </div>
                  <div style={{ padding: "5px" }} className="d-flex justify-content-between align-items-center border">
                    <h6 style={{ paddingRight: "10px" }} className="m-0 w-50 text-right border-r">
                      {intl.formatMessage({ id: "Kuzov number" })}
                    </h6>
                    <p style={{ paddingLeft: "10px" }} className="m-0 w-50 border-left">
                      {data.VehicleInfoResult.pKuzov}
                    </p>
                  </div>
                  {data.VehicleInfoResult.pComments ? (
                    <div style={{ padding: "5px" }} className="d-flex justify-content-between align-items-center border">
                      <h6 style={{ paddingRight: "10px" }} className="m-0 w-50 text-right border-r">
                        {intl.formatMessage({ id: "Car comments" })}
                      </h6>
                      <p style={{ paddingLeft: "10px" }} className="m-0 w-50 border-left">
                        {data.VehicleInfoResult.pComments}
                      </p>
                    </div>
                  ) : null}
                </div>
                <div className="w-50">
                  <CarOwnerDetailsModal data={data} />
                  <div style={{ padding: "5px" }} className="d-flex justify-content-center align-items-center border">
                    <h6 style={{ paddingRight: "10px", fontSize: "16px" }} className="m-0 w-100 text-center border-r text-primary">
                      {intl.formatMessage({ id: "NtfsMoreInfo" })}
                    </h6>
                  </div>
                  {data.TonirovkaInfoResult ? (
                    <>
                      <div style={{ padding: "5px" }} className="d-flex justify-content-center align-items-center border">
                        <h6 style={{ paddingRight: "10px", fontSize: "16px" }} className="m-0 w-100 text-center border-r">
                          {intl.formatMessage({ id: "Car Tonirovka" })}
                        </h6>
                      </div>
                      <div style={{ padding: "5px" }} className="d-flex justify-content-between align-items-center border">
                        <h6 style={{ paddingRight: "10px" }} className="m-0 w-50 text-right border-r">
                          {intl.formatMessage({ id: "FuqaroDetailIssueDate" })}
                        </h6>
                        <p style={{ paddingLeft: "10px" }} className="m-0 w-50 border-left">
                          {data.TonirovkaInfoResult && data.TonirovkaInfoResult.IssuedDate}
                        </p>
                      </div>
                      <div style={{ padding: "5px" }} className="d-flex justify-content-between align-items-center border">
                        <h6 style={{ paddingRight: "10px" }} className="m-0 w-50 text-right border-r">
                          {intl.formatMessage({ id: "LochinKozSearchEndTime" })}
                        </h6>
                        <p style={{ paddingLeft: "10px" }} className="m-0 w-50 border-left">
                          {data.TonirovkaInfoResult && data.TonirovkaInfoResult.ValidDate}
                        </p>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          ) : (
            <h1>Ma'lumot yo'q</h1>
          )}
        </ModalBody>
        {Object.keys(data).length !== 0 && (
          <ModalFooter>
            <Button color="primary" onClick={ownerData}>
              {intl.formatMessage({ id: "Car owner details" })}
            </Button>
          </ModalFooter>
        )}
      </Modal>
      <Passport openModal={paspModal} setOpenModal={setPaspModal} data={passportInfo} loading={paspLoading} />
    </>
  )
}

export default withRouter(injectIntl(CarDetailsModal))
