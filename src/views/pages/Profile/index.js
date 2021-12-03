// ** React
import React, { Fragment } from "react"

// ** Third Part
import { Row, Col } from "reactstrap"

// ** Custom
import ProfileHeader from "./moleculas/ProfileHeader"
import ProfileAbout from "./moleculas/ProfileAbout"
import ProfilePosts from "./moleculas/ProfilePosts"
import ProfileStatus from "./moleculas/ProfileStatus"
import BreadCrumb from "../../components/BreadCrumb/"

//** Custom Style
import "@styles/react/pages/page-profile.scss"

const Profile = () => {
  return (
    <Fragment>
      <Row>
        <Col md="12">
          <BreadCrumb />
          <hr />
        </Col>
      </Row>
      <div id="user-profile">
        <Row>
          <Col sm="12">
            <ProfileHeader />
          </Col>
        </Row>
      </div>
      <section id="profile-info" className="mt-2">
        <Row>
          <Col lg={{ size: 3, order: 1 }} sm={{ size: 12 }} xs={{ order: 2 }}>
            <ProfileAbout />
          </Col>
          <Col lg={{ size: 6, order: 2 }} sm={{ size: 12 }} xs={{ order: 1 }}>
            <ProfilePosts />
          </Col>
          <Col lg={{ size: 3, order: 3 }} sm={{ size: 12 }} xs={{ order: 3 }}>
            <ProfileStatus />
          </Col>
        </Row>
      </section>
    </Fragment>
  )
}
export default Profile
