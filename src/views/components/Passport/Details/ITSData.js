import React from "react"
import { injectIntl } from "react-intl"

const ITSData = ({ intl, watchlist, index }) => {
  return (
    <div key={index} className="m-1 d-flex flex-column w-50  ">
      <h4>
        {index + 1}. {intl.formatMessage({ id: "Violations" })}
      </h4>
      {watchlist.adm && (
        <>
          {watchlist.adm.titleRu && (
            <div className="d-flex  justify-content-between">
              <strong>{intl.formatMessage({ id: "ADM" })}: </strong>
              <em className="ml-2">{watchlist.adm.titleRu.trim()}</em>
            </div>
          )}
          {watchlist.adm_date && (
            <div className="d-flex  justify-content-between">
              <strong>{intl.formatMessage({ id: "ADMDate" })}: </strong>
              <em className="ml-2">{watchlist.adm_date.trim()}</em>
            </div>
          )}
        </>
      )}
      {watchlist.amnistiya.length > 0 && (
        <div className="d-flex  justify-content-between">
          <strong>{intl.formatMessage({ id: "Amnesty" })}: </strong>
          <em className="ml-2">{watchlist.amnistiya.trim()}</em>
        </div>
      )}
      {watchlist.poslednakaz_begin && (
        <div className="d-flex  justify-content-between">
          <strong>{intl.formatMessage({ id: "LastPunishmentStart" })}: </strong>
          <em className="ml-2">{watchlist.poslednakaz_begin.trim()}</em>
        </div>
      )}
      {watchlist.poslednakaz_end && (
        <div className="d-flex  justify-content-between">
          <strong>{intl.formatMessage({ id: "LastPunishmentEnd" })}: </strong>
          <em className="ml-2">{watchlist.poslednakaz_end.trim()}</em>
        </div>
      )}
      {watchlist.category.map((cat, i) => (
        <div key={cat.id} className="d-flex  justify-content-between">
          <strong style={{ visibility: i > 0 ? "hidden" : "inherit" }}>{intl.formatMessage({ id: "Categories" })}: </strong>
          <em className="ml-2">{cat.title.trim()}</em>
        </div>
      ))}
      {watchlist.sud.map((sud, i) => (
        <div key={sud.st} className="d-flex  justify-content-between">
          <strong style={{ visibility: i > 0 ? "hidden" : "inherit" }}>{intl.formatMessage({ id: "Convictions" })}: </strong>
          <em className="ml-2">{sud.st.trim()}</em>
          <em className="ml-2">{sud.uk.trim()}</em>
        </div>
      ))}
    </div>
  )
}

export default injectIntl(ITSData)
