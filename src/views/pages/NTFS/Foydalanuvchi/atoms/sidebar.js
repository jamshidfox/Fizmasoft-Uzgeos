import React from "react"

// ** Custom Components
import Avatar from "@components/avatar"
import { useSelector } from "react-redux"

// ** Third Party Components
import PerfectScrollbar from "react-perfect-scrollbar"
import { Row, Col, Card } from "reactstrap"
import classnames from "classnames"
import styled from "styled-components"

// ** JwT
import useJwt from "@src/auth/jwt/useJwt"
const config = useJwt.jwtConfig

// ** Style
import "react-perfect-scrollbar/dist/css/styles.css"

const UserSideBar = ({ handleShowLog, userId }) => {
  const foydalanuvchiData = useSelector((state) => state.foydalanuvchi.data)

  return (
    <Card>
      <div style={{ height: "calc(100vh - 305px)" }}>
        <PerfectScrollbar>
          {foydalanuvchiData.map((user) => (
            <UserDiv className={classnames("p-1", { "bg-primary": userId === user.id })} key={user.id}>
              <Row style={{ width: "100%" }}>
                <Col md="1" onClick={() => handleShowLog(user)}>
                  <Avatar
                    className="avatar"
                    img={`${config.url}/images/${user.avatar}`}
                    status={user.status ? "online" : "offline"}
                    style={{ objectFit: "cover" }}
                    imgHeight="42"
                    imgWidth="42"
                    onClick={() => handleShowLog(user)}
                  />
                </Col>
                <Col md="11" onClick={() => handleShowLog(user)}>
                  <div style={{ margin: "0.5em 0px 0px 2em" }}>
                    <h4
                      className={classnames("mb-0 ", {
                        "text-dark": user.id !== userId,
                        "text-light": user.id === userId
                      })}
                    >
                      {user.full_name}
                    </h4>
                    <h6
                      className={classnames("mb-0 ", {
                        "text-secondary": user.id !== userId,
                        "text-light": user.id === userId
                      })}
                    >
                      {user.position}
                    </h6>
                  </div>
                </Col>
              </Row>
            </UserDiv>
          ))}
        </PerfectScrollbar>
      </div>
    </Card>
  )
}

export default UserSideBar

const UserDiv = styled.div`
  &:hover {
    background-color: aliceblue;
  }
  cursor: pointer;
`
