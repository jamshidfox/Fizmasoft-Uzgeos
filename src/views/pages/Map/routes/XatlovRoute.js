import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import AppCollapse from "@components/app-collapse"
import { Spinner, Badge } from "reactstrap"
import CustomTable from "../../../components/table"
import CutomModal from "../../../components/editModal/"
import axios from "axios"
import useJwt from "@src/auth/jwt/useJwt"

import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const config = useJwt.jwtConfig
const MySwal = withReactContent(Swal)

// ** Styles
import "animate.css/animate.css"
import "@styles/base/plugins/extensions/ext-component-sweet-alerts.scss"
import Passport from "../../../components/Passport/Passport"
import { injectIntl } from "react-intl"

const XatlovRoute = ({ intl, toggleSidebar }) => {
  const [domData, setDomData] = useState([])
  const [hovliData, setHovliData] = useState([])
  const [businessData, setBusinessData] = useState([])
  const [passportInfo, setPassportInfo] = useState({})
  const [isModal, setIsModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const xatlovState = useSelector((state) => state.xatlov)

  const handleInfo = () => {
    return MySwal.fire({
      title: intl.formatMessage({ id: "No information about person" }),
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
      setLoading(true)
      axios.post(`${config.url}/foreign/xatlov/forma1`, { pcitizen: params.pcitizen }).then((res) => {
        setLoading(false)
        if (res.status === 200) {
          setPassportInfo(res.data.data)
        }
      })
      setIsModal(true)
    } else {
      handleInfo()
    }
  }

  const renderPeopleColumns = () => {
    return [
      {
        title: intl.formatMessage({ id: "Full name" }),
        name: "name",
        key: "name"
      },
      {
        title: intl.formatMessage({ id: "Date of birth" }),
        name: "birthday",
        key: "birthday"
      },
      {
        title: intl.formatMessage({ id: "Rent" }),
        name: "passport",
        key: "passport"
      }
    ].map((column, index) => {
      return <th key={column.key}>{column.title} </th>
    })
  }

  const renderCompanyColumns = () => {
    return [
      {
        title: intl.formatMessage({ id: "Name" }),
        name: "name",
        key: "name"
      },
      {
        title: "STIR",
        name: "stir",
        key: "stir"
      }
    ].map((column, index) => {
      return <th key={column.key}>{column.title} </th>
    })
  }

  const renderPeopleRows = (data) => {
    return data?.map((td, index) => (
      <tr key={index}>
        <td onClick={() => handleShowPassportModal(td)}>{td.full_name}</td>
        <td onClick={() => handleShowPassportModal(td)}>{td.birthday}</td>
        <td onClick={() => handleShowPassportModal(td)}>{td.is_rent ? <Badge color="primary">{intl.formatMessage({ id: "Yes" })}</Badge> : null}</td>
      </tr>
    ))
  }

  const renderCompanyRows = (data) => {
    return data?.map((td, index) => (
      <tr key={index}>
        <td>{td.company_name}</td>
        <td>{td.company_stir}</td>
      </tr>
    ))
  }

  const flatContent = (data) => {
    const kvname = (
      <div style={{ width: 250, height: 22 }} className=" d-flex justify-content-between">
        <p>{`${parseInt(data.kadastr_raqami.substr(-3))} - xonadon`}</p>
        <Badge color="info">{data.persons.length}</Badge>
      </div>
    )
    return {
      title: kvname,
      content: <CustomTable size="sm" pagination={false} columns={renderPeopleColumns} rows={() => renderPeopleRows(data.persons)} />
    }
  }

  const businessContent = (data) => {
    return {
      title: (
        <div style={{ width: 270, height: 22 }} className=" d-flex justify-content-between">
          <p>{data.kadastr_raqami}</p>
          <Badge color="info">{data.companies.length}</Badge>
        </div>
      ),
      content: <CustomTable size="sm" pagination={false} columns={renderCompanyColumns} rows={() => renderCompanyRows(data.companies)} />
    }
  }

  const prepareFlatsData = (data) => {
    setDomData([
      {
        title: (
          <div style={{ width: 270, height: 22 }} className=" d-flex justify-content-between">
            <p>{intl.formatMessage({ id: "Flats" })}</p>
            <Badge color="primary">{data.flats.length}</Badge>
          </div>
        ),
        content: data.flats.map((flat, index) => <AppCollapse key={index} data={[flatContent(flat)]} />)
      }
    ])
  }

  const prepareBusinessData = (data) => {
    setBusinessData([
      {
        title: (
          <div style={{ width: 270, height: 22 }} className=" d-flex justify-content-between">
            <p>{intl.formatMessage({ id: "Business" })}</p>
            <Badge color="primary">{data.length}</Badge>
          </div>
        ),
        content: data.map((d, index) => <AppCollapse key={index} data={[businessContent(d)]} />)
      }
    ])
  }

  useEffect(() => {
    if (xatlovState.houses.length > 0) {
      if (xatlovState.houses[0]?.is_dom) prepareFlatsData(xatlovState.houses[0])
      else setHovliData(xatlovState.houses[0])
    }
  }, [xatlovState.houses])

  useEffect(() => {
    if (xatlovState.business.length > 0) prepareBusinessData(xatlovState.business)
  }, [xatlovState.business])

  useEffect(() => {
    if (xatlovState.cond) {
      toggleSidebar(true)
    }
  }, [xatlovState])

  return xatlovState.cond ? (
    xatlovState.loading ? (
      <div className="d-flex justify-content-center">
        <Spinner color="primary" />
      </div>
    ) : (
      <>
        {xatlovState.houses.length > 0 ? (
          <>
            <h5>{xatlovState.houses[0]?.address}</h5>
            {xatlovState.houses[0]?.is_dom ? (
              <AppCollapse data={domData} />
            ) : (
              <CustomTable size="sm" pagination={false} columns={renderPeopleColumns} rows={() => renderPeopleRows(hovliData.persons)} />
            )}
          </>
        ) : (
          <h3>{intl.formatMessage({ id: "No houses at the given point" })}</h3>
        )}
        {xatlovState.business.length > 0 ? <AppCollapse data={businessData} /> : <h3>{intl.formatMessage({ id: "No businesses found around the given point" })}</h3>}
        <Passport openModal={isModal} setOpenModal={setIsModal} data={passportInfo} loading={loading} />
      </>
    )
  ) : null
}

export default injectIntl(XatlovRoute)
