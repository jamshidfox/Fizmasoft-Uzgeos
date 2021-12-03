import React from 'react'
import { Card, CardBody, CardText } from 'reactstrap'


const ProfileAbout = () => {
  const token = JSON.parse(localStorage.getItem("userData"))
  return (
    <Card>
      <CardBody>
        <h5 className="mb-75">Фойдаланувчи Ҳақида маълумот</h5>
        <CardText>{token.full_name}</CardText>
        <div className="mt-2">
          <h5 className="mb-75"> Tug'ilgan sanasi:</h5>
          <CardText>{token.date_of_birth}</CardText>
        </div>
        <div className="mt-2">
          <h5 className="mb-75">Унвони:</h5>
          <CardText>{token.position}</CardText>
        </div>
      </CardBody>
    </Card>
  )
}
 
export default ProfileAbout