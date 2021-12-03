import { Fragment, useState } from "react"

import { Image, MapPin } from "react-feather"
import { injectIntl } from "react-intl"
import { TabContent, TabPane, Nav, NavItem, NavLink, Button } from "reactstrap"
import CarPanel from "../../../components/CarPlate/carPanel"
import CustomMap from "./customMap"

const InfoPanel = ({ intl, onImageLoading, carOnMap, car_pic_data, car_number, onLoad }) => {
  const [active, setActive] = useState("1")
  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab)
    }
  }
  return (
    <Fragment>
      <Nav tabs className="justify-content-center">
        <NavItem>
          <NavLink
            active={active === "1"}
            onClick={() => {
              toggle("1")
            }}
          >
            <Image size={14} />
            <span className="align-middle">{intl.formatMessage({ id: "LochinKozCarPicture" })}</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === "2"}
            onClick={() => {
              toggle("2")
            }}
          >
            <MapPin size={14} />
            <span className="align-middle">{intl.formatMessage({ id: "LochinKozCarLocation" })}</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="py-50" activeTab={active}>
        <TabPane tabId="1" className="animate__animated animate__flipInY">
          <CarPanel onImageLoading={onImageLoading} onLoad={onLoad} car_pic_data={car_pic_data} car_number={car_number} />
        </TabPane>
        <TabPane tabId="2" className="animate__animated animate__flipInY">
          <CustomMap carOnMap={carOnMap ? carOnMap : []} resize={active} />
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default injectIntl(InfoPanel)
