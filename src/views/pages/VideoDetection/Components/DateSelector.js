import { Input, Form, Spinner } from "reactstrap"
import Flatpickr from "react-flatpickr"
import { useState } from "react"

import "@styles/react/libs/flatpickr/flatpickr.scss"
import Button from "reactstrap/lib/Button"
import { injectIntl } from "react-intl"
import UncontrolledButtonDropdown from "reactstrap/lib/UncontrolledButtonDropdown"
import DropdownToggle from "reactstrap/lib/DropdownToggle"
import DropdownMenu from "reactstrap/lib/DropdownMenu"
import DropdownItem from "reactstrap/lib/DropdownItem"

const DateSelector = ({ intl, loading, onSubmit, startDate, endDate, setEndDate, setStartDate, setChannel, channel, byFaceAll }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit()
  }
  return (
    <Form style={{ position: "absolute", bottom: 5, width: "94%" }} onSubmit={handleSubmit}>
      <Flatpickr
        options={{ dateFormat: "d.m.Y H:i" }}
        style={{ marginTop: 5 }}
        value={startDate}
        data-enable-time
        id="date-time-picker-start"
        className="form-control"
        onChange={(date) => setStartDate(date[0])}
      />
      <Flatpickr
        options={{ dateFormat: "d.m.Y H:i" }}
        style={{ marginTop: 5 }}
        value={endDate}
        data-enable-time
        id="date-time-picker-end"
        className="form-control"
        onChange={(date) => setEndDate(date[0])}
      />
      <div className="d-flex align-items-center" style={{ position: "relative", zIndex: "9999", marginTop: "8px" }}>
        <UncontrolledButtonDropdown direction="up">
          <DropdownToggle color="primary" caret style={{ padding: "6px 12px" }}>
            {channel ? channel : channel === 0 ? intl.formatMessage({ id: "All" }) : intl.formatMessage({ id: "Channels" })}
          </DropdownToggle>
          <DropdownMenu className="d-flex flex-column">
            {byFaceAll ? (
              <DropdownItem className="font-weight-bold py-0" onClick={() => setChannel(0)}>
                {intl.formatMessage({ id: "All" })}
              </DropdownItem>
            ) : (
              <DropdownItem className="d-none"></DropdownItem>
            )}

            <DropdownItem className="font-weight-bold py-0" onClick={() => setChannel(1)}>
              1
            </DropdownItem>
            <DropdownItem className="font-weight-bold py-0" onClick={() => setChannel(2)}>
              2
            </DropdownItem>
            <DropdownItem className="font-weight-bold py-0" onClick={() => setChannel(3)}>
              3
            </DropdownItem>
            <DropdownItem className="font-weight-bold py-0" onClick={() => setChannel(4)}>
              4
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown>
        <div style={{ fontWeight: "bold", marginLeft: "8px" }}>{intl.formatMessage({ id: "Channels" })}</div>
      </div>
      <Button className="w-100" style={{ marginTop: 5 }} type="submit" color="primary">
        {loading ? <Spinner size="sm" /> : intl.formatMessage({ id: "NavSearch" })}
      </Button>
    </Form>
  )
}

export default injectIntl(DateSelector)