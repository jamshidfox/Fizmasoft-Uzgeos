import React from 'react'
import { Card, CardImg } from 'reactstrap'


import coverImage from '../../../../assets/images/profile/timeline.jpg'
import AvatarImage from '../../../../assets/images/avatars/2.png'
import useJwt from "@src/auth/jwt/useJwt"
const config = useJwt.jwtConfig

const ProfileHeader = () => {
  const token = JSON.parse(localStorage.getItem("userData"))
  return (
    <Card className="profile-header mb-2 h-100">
      <CardImg src={coverImage} />
      <div className="position-relative">
        <div className="profile-img-container d-flex align-items-center">
          <div className="profile-img">
            <img className="rounded img-fluid" src={`${config.url}/images/${token?.avatar}` || AvatarImage} alt="" />
          </div>
          <div className="profile-title ml-3">
            <h2 className="text-white">{token?.full_name}</h2>
            <p className="text-white">{token?.username}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
export default ProfileHeader 