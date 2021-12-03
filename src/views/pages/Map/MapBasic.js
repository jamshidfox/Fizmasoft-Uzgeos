import { useState, useEffect, useRef } from "react"
import { CardBody } from "reactstrap"
import ReactBasicMap from "./utils/ReactBasicMap"
import { Marker } from "react-leaflet"

import LFMap from "./utils/LFMap"

const MapsBasic = ({ resize }) => {
  return (
    <CardBody>
      <LFMap resize1={resize}></LFMap>
      {/* <ReactBasicMap center={[40.712216, -74.22655]} resize1={resize1} resize2={resize2} ruler={ruler}>
        <Marker position={[40.712216, -74.22655]} />
        <Marker position={[41.33931375309347, 69.27068710327147]} />
        <Marker position={[41.33738044540721, 69.23721313476562]} />
        <Marker position={[41.31739957239333, 69.22725677490233]} />
        <Marker position={[41.32590830609208, 69.27120208740234]} />
        <Marker position={[41.32758413782777, 69.21987533569336]} />
        <Marker position={[41.30411857136123, 69.24613952636719]} />
        <Marker position={[41.3226854316097, 69.25025939941406]} />
        <Marker position={[41.35220100440021, 69.22107696533203]} />
        <Marker position={[41.31159752610863, 69.20940399169922]} />
        <Marker position={[41.34562882493661, 69.24476623535156]} />
      </ReactBasicMap> */}
    </CardBody>
  )
}
export default MapsBasic
