// ** React
import React from "react"

// ** Third Part
import { Row, Col, Card } from "reactstrap"
import styled from "styled-components"

// ** Custom
import CustomTable from "../../components/table"
import SearchForm from "./atom/searchFrom"
import BreadCrumb from "../../components/BreadCrumb/"

const Cars = () => {
  const columns = [
    {
      title: "Исми",
      name: "full_name"
    },
    {
      title: "Туғилган санаси",
      name: "birth_date"
    },
    {
      title: "Яшаш манзили",
      name: "address"
    },
    {
      title: "Давлат рақ‎ами",
      name: "car_number"
    },
    {
      title: "Русуми",
      name: "car_type"
    },
    {
      title: "Ранги",
      name: "car_color"
    },

    {
      title: "ЙХХ Бошқармаси бўлими",
      name: "yhx"
    },
    {
      title: "Стир",
      name: "stir"
    },
    {
      title: "Тоифаси",
      name: "type"
    },
    {
      title: "Берилган санаси",
      name: "gived_date"
    }
  ]

  const data = [
    {
      id: 1,
      full_name: "Искандаров Жамшид",
      birth_date: "27.7.1996",
      address: "Учтепа тумани",
      car_number: "01A225SS",
      car_type: "Жентра",
      car_color: "Оқ‎",
      yhx: "Тошкент файзобод риб",
      stir: 3500729000,
      type: "BC",
      gived_date: "22.08.2018"
    },
    {
      id: 2,
      full_name: "Олимов Темур",
      birth_date: "17.7.1993",
      address: "Миробод тумани",
      car_number: "01B225SS",
      car_type: "Спарк",
      car_color: "қ‎ора",
      yhx: "Тошкент файзобод риб",
      stir: 5010629000,
      type: "B",
      gived_date: "22.08.2019"
    }
  ]
  const renderColumns = () => {
    return columns.map((column, index) => {
      return <th key={index}>{column.title}</th>
    })
  }
  const renderRows = () => {
    return data.map((row, index) => (
      <tr key={row.id}>
        <td>{row.full_name}</td>
        <td>{row.birth_date}</td>
        <td>{row.address}</td>
        <td>{row.car_number}</td>
        <td>{row.car_type}</td>
        <td>{row.car_color}</td>
        <td>{row.yhx}</td>
        <td>{row.stir}</td>
        <td>{row.type}</td>
        <td>{row.gived_date}</td>
      </tr>
    ))
  }

  return (
    <Row>
      <Col md="12">
        <hr />
      </Col>
      <Col md={12}>
        <Card className="p-1">
          <SearCarsBox>
            <SearchForm />
          </SearCarsBox>
        </Card>
      </Col>
      <Col md={12}>
        <Card className="p-1">
          <CustomTable columns={renderColumns} rows={renderRows} />
        </Card>
      </Col>
    </Row>
  )
}

export default Cars

const SearCarsBox = styled.div`
  margin-top: 1em;
  margin-bottom: 2em;
`
