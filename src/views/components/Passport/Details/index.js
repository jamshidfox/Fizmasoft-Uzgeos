import axios from "axios"
import React, { useState, useEffect } from "react"
import { TabContent, TabPane, Nav, NavItem, NavLink, Spinner, Badge } from "reactstrap"

import HasGun from "./HasGun"
import ITSData from "./ITSData"
import Housemates from "./HouseMates"
import { injectIntl } from "react-intl"
import useJwt from "@src/auth/jwt/useJwt"
const config = useJwt.jwtConfig

const makeRightObj = (data) => {
  return data.map((d) => ({ name: d.name, loading: true, data: {}, title: d.title }))
}
const Details = ({ intl, databases, data }) => {
  const [dbs, setDbs] = useState(makeRightObj(databases))

  const [active, setActive] = useState(dbs[0].title)
  const toggle = (tab) => {
    setActive(tab)
  }
  useEffect(async () => {
    const arr = []
    for (const db of dbs) {
      try {
        if (db.name === intl.formatMessage({ id: "Housemates" })) {
          const result = await axios.get(`${config.url}/foreign/xatlov/housemates?kadastr_raqami=${data.pLiveAddress}`)

          const res = result.data.data.persons.filter((person) => person.passport_raqami !== data.pPsp)
          arr.push({ ...db, data: { persons: res }, loading: false })
          continue
        }
        const result = await axios.post(`${config.url}/foreign/${db.name}/person`, { passport: data.pPsp, birthday: data.pDateBirth })
        arr.push({ ...db, data: result.data.data, loading: false })
      } catch (error) {
        arr.push({ ...db, loading: false })
      }
    }
    setDbs(arr)
  }, [])
  return (
    <>
      <Nav tabs>
        {dbs.map((d) => (
          <NavItem key={d.title}>
            <NavLink
              style={{ border: "1px solid gray", borderStyle: "solid solid none solid ", marginLeft: 5, borderRadius: 3, padding: 3, background: active === d.id ? null : "#b8c2cc36" }}
              active={active === d.title}
              onClick={() => {
                toggle(d.title)
              }}
            >
              {d.title.toUpperCase()}
              {d.loading ? <Spinner className="ml-1" type="grow" size="sm" /> : null}
              <Badge color="info" className="ml-1">
                {d.data.persons && d.data.persons.length}
                {d.data.watchlist?.length > 0 && d.data.watchlist.length}
                {d.data.personWeapon?.length > 0 && d.data.personWeapon.length}
              </Badge>
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent className="py-50" activeTab={active}>
        {dbs.map((d) => (
          <TabPane key={d.title} tabId={d.title}>
            {d.name === "its-api" ? (
              <>
                {(d.data.personWeapon && d.data.personWeapon.length > 0) || (d.data.watchlist && d.data.watchlist.length > 0) ? (
                  <>
                    <div className="d-flex justify-content-around flex-wrap">{d.data.watchlist && d.data.watchlist.map((watchlist, index) => <ITSData watchlist={watchlist} index={index} />)}</div>
                    <div className="d-flex justify-content-around flex-wrap">{d.data.personWeapon && d.data.personWeapon.map((weapon, index) => <HasGun weapon={weapon} index={index} />)}</div>
                  </>
                ) : (
                  <div className="d-flex justify-content-center w-100">{intl.formatMessage({ id: "No data found" })}</div>
                )}
              </>
            ) : (
              <>{d.data.persons && d.data.persons.length > 0 ? <Housemates data={d.data} /> : <div>{intl.formatMessage({ id: "No data found" })}</div>}</>
            )}
          </TabPane>
        ))}
      </TabContent>
    </>
  )
}

export default injectIntl(Details)
