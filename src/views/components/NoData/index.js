import React from "react"
import { CardImg, CardTitle, Card, CardBody, Spinner } from "reactstrap"

import notFound from "../../../assets/images/pages/404.png"

const NoData = ({ style = { width: "100%", height: "calc(100vh - 50vh)" }, loading }) => {
  return (
    <Card style={style} className="d-flex justify-content-center">
      {/* <h1 className="mt-5 text-center text-info">Маълумот мавжуд эмас</h1> */}
      <div className="mt-3" style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {loading && <Spinner />}
        <img src={notFound} alt="notFound"></img>
      </div>
    </Card>
  )
}

export default NoData
