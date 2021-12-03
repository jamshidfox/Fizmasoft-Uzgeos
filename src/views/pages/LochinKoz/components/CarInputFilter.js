import React from "react"
import ClearFilterButton from "./ClearFilterButton"
import { injectIntl } from "react-intl"
import { Input } from "reactstrap"

const CarInputFilter = ({ setInputCarVisible, handleSearch, handleClear, intl, lang }) => {
  return (
    <div className="input-group add-on alert alert-dismissable" style={{ marginBottom: "0px" }}>
      <Input
        onBlur={(e) => {
          e.target.value === "" ? setInputCarVisible(false) : setInputCarVisible(true)
        }}
        autoFocus
        bsSize="sm"
        style={{ height: "32px" }}
        onChange={handleSearch}
        type={lang === "LochinKozKameraType" ? "select" : "text"}
        className={lang === "LochinKozKameraType" ? "form-select" : "form-control"}
        placeholder={intl.formatMessage({ id: lang })}
      >
        {lang === "LochinKozKameraType" ? (
          <>
            <option value="" selected disabled hidden>
              {intl.formatMessage({ id: "LochinKozKameraType" })}
            </option>
            <option value="radar">{intl.formatMessage({ id: "NavRADAR" })}</option>
            <option value="chorraxa">{intl.formatMessage({ id: "NavCROSSROAD" })}</option>
            <option value="perimeter">{intl.formatMessage({ id: "NavPERIMETER" })}</option>
          </>
        ) : null}
      </Input>
      <ClearFilterButton handleClearFilter={handleClear} />
    </div>
  )
}

export default injectIntl(CarInputFilter)
