import { Fragment } from 'react'
import { Card, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { Link, useLocation } from "react-router-dom"
import { injectIntl } from "react-intl"

const BreadcrumbsDefault = ({ intl }) => {
  const location = useLocation()

  const navigations = () => {
    if (location.pathname === "/ntfaceQidiruv") {
      return (
        <>
          <BreadcrumbItem>
            <span>{intl.formatMessage({ id: "BreadCrumpIntegrations" })}</span>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <span>{intl.formatMessage({ id: "BreadCrumpUsers" })}</span>
          </BreadcrumbItem>
        </>
      )
    } else if (location.pathname === "/ntfaceFoydalanuvchi") {
      return (
        <>
          <BreadcrumbItem>
            <span>{intl.formatMessage({ id: "BreadCrumpIntegrations" })}</span>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <span>{intl.formatMessage({ id: "BreadCrumpUsers" })}</span>
          </BreadcrumbItem>
        </>
      )
    } else if (location.pathname === "/lochinkoz") {
      return (
        <>
          <BreadcrumbItem>
            <span>{intl.formatMessage({ id: "BreadCrumpLochinKoz" })}</span>
          </BreadcrumbItem>
        </>
      )
    } else if (location.pathname === "/fuqaro") {
      return (
        <>
          <BreadcrumbItem>
            <span>{intl.formatMessage({ id: "BreadCrumpCitizens" })}</span>
          </BreadcrumbItem>
        </>
      )
    } else if (location.pathname === "/avto") {
      return (
        <>
          <BreadcrumbItem>
            <span>{intl.formatMessage({ id: "BreadCrumpTransports" })}</span>
          </BreadcrumbItem>
        </>
      )
    } else if (location.pathname === "/feedBack") {
      return (
        <>
          <BreadcrumbItem>
            <span>{intl.formatMessage({ id: "BreadCrumpFeedBack" })}</span>
          </BreadcrumbItem>
        </>
      )
    } else if (location.pathname === "/profile") {
      return (
        <>
          <BreadcrumbItem>
            <span>{intl.formatMessage({ id: "BreadCrumpProfile" })}</span>
          </BreadcrumbItem>
        </>
      )
    }
  }

  return (
    <>
      <Breadcrumb className="mt-1 ">
        <BreadcrumbItem>
          <Link to="/">{intl.formatMessage({ id: "BreadCrumpHome" })}</Link>
        </BreadcrumbItem>
        {navigations()}
      </Breadcrumb>
    </>
  )
}
export default injectIntl(BreadcrumbsDefault)