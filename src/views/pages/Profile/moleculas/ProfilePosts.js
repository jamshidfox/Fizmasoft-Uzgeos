import React from 'react'
import {Row, Col, Card, CardBody, CardTitle, CardText} from 'reactstrap'

const ProfilePost = () => {
    return (
        <>
    <Card>
        <CardBody>
            <CardTitle tag='h4'>
            <Row>
                <Col md='10'>NTFS</Col>
                <Col md='2'>12.02.2020</Col>
            </Row>
            </CardTitle>
            <CardText>
                Some quick example text to build on the card title and make up the bulk of the card's content.
            </CardText>       
          </CardBody>
    </Card>
    <Card>
        <CardBody>
            <CardTitle tag='h4'>
            <Row>
                <Col md='10'>Kvlite</Col>
                <Col md='2'>30.03.2020</Col>
            </Row>
            </CardTitle>
            <CardText>
                Some quick example text to build on the card title and make up the bulk of the card's content.
            </CardText>       
          </CardBody>
    </Card>
    <Card>
        <CardBody>
            <CardTitle tag='h4'>
            <Row>
                <Col md='10'>Lochin ko'z</Col>
                <Col md='2'>12.12.2020</Col>
            </Row>
            </CardTitle>
            <CardText>
                Some quick example text to build on the card title and make up the bulk of the card's content.
            </CardText>       
          </CardBody>
    </Card>
    </>
    )
}
 
export default ProfilePost 