import { Fragment, useState } from "react"
import { Row, Col, TabContent, TabPane, Card, CardBody } from "reactstrap"

import Tabs from "./atoms/Tabs"
import Users from "../Users/Users"
import Layers from "../Layers/Layers"
import Groups from "../Groups/Groups"
// import BreadCrumb from '../../components/BreadCrumb/'
import ApexCharts from "../systemHealth/SystemHealth"
import RoyhatTable from "../MuhumRoyhat/Royhat"

import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/react/pages/page-account-settings.scss"

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState("1")

  const toggleTab = (tab) => {
    setActiveTab(tab)
  }

  return (
    <Fragment>
      <Row>
        <Col className="mb-2 mb-md-0" md="2">
          <Tabs activeTab={activeTab} toggleTab={toggleTab} />
        </Col>
        <Col md="10">
          <Card>
            <CardBody>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <Users />
                </TabPane>
                <TabPane tabId="2">
                  <Layers />
                </TabPane>
                <TabPane tabId="3">
                  <Groups />
                </TabPane>
                <TabPane tabId="4">
                  <ApexCharts />
                </TabPane>
                <TabPane tabId="5">
                  <RoyhatTable />
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

export default AccountSettings
