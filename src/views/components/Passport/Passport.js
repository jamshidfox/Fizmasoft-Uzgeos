import React, { useState, useEffect } from "react"
import { Row, Col, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle, CustomInput, Button } from "reactstrap"
import CustomModal from "../editModal"
import ReactBasicMap from "../../pages/Map/utils/ReactBasicMap"
import { Marker } from "react-leaflet"

import "./passport.css"

import L from "leaflet"
import icon from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"
import Details from "./Details/index"
import { injectIntl } from "react-intl"
import Spinner from "reactstrap/lib/Spinner"

const getExpiryDate = (issueDate) => {
  if (issueDate) {
    const arr = issueDate.split(".")
    const [day, month, year] = arr
    const expiryDay = +day - 1 < 10 ? `0${+day - 1}` : +day - 1
    const expiryYear = +year + 10
    const expiryMonth = month
    return `${expiryDay}.${expiryMonth}.${expiryYear}`
  }
}

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
})
L.Marker.prototype.options.icon = DefaultIcon

const Passport = ({ intl, openModal, setOpenModal, data, location, footer = true, loading = false }) => {
  const [detailsModal, setDetailsModal] = useState(false)
  const [databasesList, setDatabasesList] = useState([])
  const list =
    data.foreignServiceList &&
    data.foreignServiceList.map((d) => {
      return { title: d.title, name: d.name }
    })
  useEffect(() => {
    if (data.foreignServiceList) {
      list.unshift({ title: intl.formatMessage({ id: "Housemates" }), name: intl.formatMessage({ id: "Housemates" }) })
      setDatabasesList(list)
    }
  }, [data])
  const getFooter = (data) => {
    if (!data.foreignServiceList) return
    // if (data.foreignServiceList.length === 0) return intl.formatMessage({ id: "NotOnList" })

    return (
      <>
        <CustomModal size="lg" openModal={detailsModal} setOpenModal={setDetailsModal} title={intl.formatMessage({ id: "NavFuqaro" })}>
          <Details databases={databasesList} data={data} />
        </CustomModal>
        <Button onClick={() => setDetailsModal(true)} color="primary">
          {intl.formatMessage({ id: "List" })}
        </Button>
      </>
    )
  }
  return (
    <CustomModal
      size={location ? "lg" : "md"}
      customWidth={location ? undefined : 540}
      openModal={openModal}
      setOpenModal={setOpenModal}
      title={intl.formatMessage({ id: "NavFuqaro" })}
      footerContent={footer ? getFooter(data) : null}
    >
      {loading ? (
        <Spinner />
      ) : (
        <Row>
          <Col md={7}>
            <div className="cont">
              <div id="p" className="passport-info">
                <div id="p__title" className="passport-info__title">
                  O'ZBEKISTON RESPUBLIKASI / REPUBLIC OF UZBEKISTAN
                </div>
                <div className="passport-info__sub-head">
                  <div className="passport-info__sub-head-bold">PASPORT</div>
                  <div className="passport-info__sub-head-bold">PASSPORT</div>
                  <div>
                    <div className="passport-info__sub-head-normal">TURI / TYPE</div>
                    <div id="p__type" className="passport-info__sub-head-bold">
                      P
                    </div>
                  </div>
                  <div>
                    <div className="passport-info__sub-head-normal">DAVLAT KODI / COUNTRY CODE</div>
                    <div id="p__country" className="passport-info__sub-head-bold">
                      UZB
                    </div>
                  </div>
                  <div>
                    <div className="passport-info__sub-head-normal">PASPORT RAQAMI / PASSPORT No.</div>
                    <div id="p__passport-number" className="passport-info__sub-head-bold">
                      {data.pPsp}
                    </div>
                  </div>
                </div>
                <div className="passport-info__content">
                  <div className="passport-info__content-img">
                    <span>&#8515;</span>
                    <img id="p__img" src={`data:image/png;base64,${data.pPhoto}`} alt="passport-pic" />
                  </div>
                  <div className="passport-info__content-details">
                    <div className="passport-info__content-details-normal">FAMILIYASI / SURNAME</div>
                    <div id="p__surname" className="passport-info__content-details-bold">
                      {data.pSurname}
                    </div>
                    <div className="passport-info__content-details-normal">ISMI / GIVEN NAMES</div>
                    <div id="p__name" className="passport-info__content-details-bold">
                      {data.pName}
                    </div>
                    <div className="passport-info__content-details-normal">FUQAROLIGI / NATIONALITY</div>
                    <div id="p__nationality" className="passport-info__content-details-bold">
                      UZBEKISTAN
                    </div>
                    <div className="passport-info__content-details-normal">TUG'ILGAN SANASI / DATE OF BIRTH</div>
                    <div id="p__dob" className="passport-info__content-details-bold">
                      {data.pDateBirth}
                    </div>
                    <div className="passport-info__content-details-cols">
                      <div className="passport-info__content-details-cols-center">
                        <div className="passport-info__content-details-normal">JINSI / SEX</div>
                        <div id="p__sex" className="passport-info__content-details-bold">
                          {data.pSex}
                        </div>
                      </div>
                      <div>
                        <div className="passport-info__content-details-normal">TUG'ILGAN JOYI / PLACE OF BIRTH</div>
                        <div id="p__pob" className="passport-info__content-details-bold">
                          {data.pPlaceBirth}
                        </div>
                      </div>
                    </div>
                    <div className="passport-info__content-details-cols">
                      <div>
                        <div className="passport-info__content-details-normal">BERILGAN SANASI / DATE OF ISSUE</div>
                        <div id="p__doi" className="passport-info__content-details-bold">
                          {data.pIssueDate}
                        </div>
                      </div>
                      <div>
                        <div className="passport-info__content-details-normal">AMAL QILISH MUDDATI / DATE OF EXPIRY</div>
                        <div id="p__doe" className="passport-info__content-details-bold">
                          {getExpiryDate(data.pIssueDate)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          {location && (
            <Col>
              <div style={{ marginLeft: 50, width: 250, height: 320, paddingRight: "1em" }}>
                <ReactBasicMap zoom={18} center={location.coordinates} fullscreen={true} resize1={loading}>
                  <Marker position={location.coordinates} />
                </ReactBasicMap>
              </div>
            </Col>
          )}
        </Row>
      )}
    </CustomModal>
  )
}

export default injectIntl(Passport)
