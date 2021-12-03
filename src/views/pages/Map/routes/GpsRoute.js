// ** React
import React, { useState } from "react"

// ** Third Part
import AppCollapse from "@components/app-collapse"
import { FormGroup, Input, UncontrolledTooltip } from "reactstrap"

// ** Custom components
import CustomTable from "../../../components/table"

// ** Icons
import { AiFillSignal, AiFillCar, AiFillEyeInvisible } from "react-icons/ai"
import { BsBatteryFull } from "react-icons/bs"
import { BiTime } from "react-icons/bi"
import CustomInput from "reactstrap/lib/CustomInput"

const GpsRoute = () => {
  const [tableData, setTableData] = useState([
    {
      id: 1,
      title: "Toshkent Shahar",
      status: (
        <div>
          <AiFillSignal />,<BsBatteryFull />
          <AiFillCar />
        </div>
      ),
      date: (
        <>
          <BiTime id={"date"} />
          <UncontrolledTooltip placement="bottom" target="date">
            18.08.2018
          </UncontrolledTooltip>
        </>
      )
    }
  ])

  const columns = [
    {
      title: "Название",
      name: "title",
      key: "title"
    },
    {
      title: "Холати",
      name: "status",
      key: "key"
    },
    {
      title: "Дата",
      name: "data",
      key: "key"
    }
  ]

  const renderColumns = () => {
    return columns.map((column, index) => {
      return <th key={column.name}>{column.title} </th>
    })
  }

  const renderRows = () => {
    return tableData.map((td) => (
      <tr key={td.id}>
        <td>
          <AiFillEyeInvisible /> {td.title}
        </td>
        <td>{td.status}</td>
        <td>{td.date}</td>
      </tr>
    ))
  }

  return (
    <>
      <FormGroup>
        <Input type="text" id="gpsSearch" placeholder="Номини киритинг" />
      </FormGroup>
      <CustomTable size="sm" pagination={false} columns={renderColumns} rows={renderRows} />
    </>
  )
}

export default GpsRoute
