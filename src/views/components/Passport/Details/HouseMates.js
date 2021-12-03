import CustomTable from "../../table"
import useJwt from "@src/auth/jwt/useJwt"
const config = useJwt.jwtConfig
import axios from "axios"
import { useState } from "react"
import Passport from "../Passport"
import Badge from "reactstrap/lib/Badge"

import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"
const MySwal = withReactContent(Swal)

const Housemates = ({ data, error }) => {
  const [passportInfo, setPassportInfo] = useState({})
  const [isModal, setIsModal] = useState(false)
  const handleInfo = () => {
    return MySwal.fire({
      title: "Фуқаро ҳақида маълумот мавжуд эмас!",
      icon: "info",
      customClass: {
        confirmButton: "btn btn-primary"
      },
      buttonsStyling: false
    })
  }

  const handleShowPassportModal = (params) => {
    if (params.pcitizen && params.pcitizen !== "null") {
      setPassportInfo({})
      axios.post(`${config.url}/foreign/xatlov/forma1`, { pcitizen: params.pcitizen }).then((res) => {
        if (res.status === 200) {
          setPassportInfo(res.data.data)
        }
      })
      setIsModal(true)
    } else {
      handleInfo()
    }
  }

  const renderPeopleRows = (data) => {
    return data?.map((td, index) => (
      <tr onClick={() => handleShowPassportModal(td)} key={index}>
        <td>{td.full_name}</td>
        <td>{td.birthday}</td>
        <td>{td.is_rent ? <Badge color="primary">xa</Badge> : null}</td>
      </tr>
    ))
  }

  const renderPeopleColumns = () => {
    return [
      {
        title: "Исми шарифи",
        name: "name",
        key: "name"
      },
      {
        title: "Туғулган куни",
        name: "birthday",
        key: "birthday"
      },
      {
        title: "Ижара",
        name: "passport",
        key: "passport"
      }
    ].map((column, index) => {
      return <th key={column.key}>{column.title} </th>
    })
  }
  return (
    <div>
      {data.address && <h5>{data.address}</h5>}
      <CustomTable size="sm" pagination={false} columns={renderPeopleColumns} rows={() => renderPeopleRows(data.persons)} />
      <Passport openModal={isModal} setOpenModal={setIsModal} data={passportInfo} footer={false} />
    </div>
  )
}

export default Housemates
