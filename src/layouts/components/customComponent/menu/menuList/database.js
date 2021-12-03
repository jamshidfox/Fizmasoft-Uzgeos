import React, { useState, useEffect } from "react"

// ** Third Part
import { Collapse } from "reactstrap"
import { Link, withRouter } from "react-router-dom"
import classnames from "classnames"
import { useDispatch, useSelector } from "react-redux"
import { FormattedMessage } from "react-intl"

// ** Icons
import { Database, Circle } from "react-feather"

// ** Store & Redux
import { handleDatabaseOpen } from "../../../../../redux/actions/menuItems"

const DatabaseMenu = ({ location }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (location?.pathname === "/accountSettings") {
      dispatch(handleDatabaseOpen(false))
    }
  }, [location])

  // ** menu items store
  const databaseStore = useSelector((state) => state.menu)

  return (
    <li
      className={classnames("nav-item has-sub", {
        ["open menu-collapsed-open sidebar-group-active "]: databaseStore?.isDatabaseOpen
      })}
    >
      <a className="d-flex align-items-center" onClick={() => dispatch(handleDatabaseOpen(!databaseStore?.isDatabaseOpen))}>
        <Database />
        <span className="menu-title text-truncate">{<FormattedMessage id="NavDatabase" />}</span>
      </a>
      <ul className="menu-content">
        <Collapse isOpen={databaseStore?.isDatabaseOpen}>
          <li className={classnames("nav-item", { ["active"]: location?.pathname === "/df" })}>
            <Link className="d-flex align-items-center" to="/df">
              <Circle />
              <span className="menu-title text-truncate">{<FormattedMessage id="NavDatabase Fixer" />}</span>
            </Link>
          </li>
          <li className={classnames("nav-item", { ["active"]: location?.pathname === "/dv" })}>
            <Link className="d-flex align-items-center" to="/dv">
              <Circle />
              <span className="menu-title text-truncate">{<FormattedMessage id="NavDevelopment" />}</span>
            </Link>
          </li>
          <li className={classnames("nav-item disabled", { ["active"]: location?.pathname === "/iwd" })}>
            <Link className="d-flex align-items-center" to="/iwd">
              <Circle />
              <span className="menu-title text-truncate">{<FormattedMessage id="NavIntegrations" />}</span>
            </Link>
          </li>
        </Collapse>
      </ul>
    </li>
  )
}

export default withRouter(DatabaseMenu)
