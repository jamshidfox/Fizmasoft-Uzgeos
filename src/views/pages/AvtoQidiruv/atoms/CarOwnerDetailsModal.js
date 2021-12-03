import React from "react"
import { injectIntl } from "react-intl"

const CarOwnerDetailsModal = ({ data, intl }) => {
  return (
    <div>
      {" "}
      <div style={{ padding: "5px" }} className="d-flex justify-content-between align-items-center border">
        <h6 style={{ paddingRight: "10px" }} className="m-0 w-50 text-right border-r">
          {intl.formatMessage({ id: "FuqaroSurname" })}
        </h6>
        <p style={{ paddingLeft: "10px" }} className="m-0 w-50 border-left">{`${data.pOwner.pSurname}`}</p>
      </div>
      <div style={{ padding: "5px" }} className="d-flex justify-content-between align-items-center border">
        <h6 style={{ paddingRight: "10px" }} className="m-0 w-50 text-right border-r">
          {intl.formatMessage({ id: "FuqaroName" })}
        </h6>
        <p style={{ paddingLeft: "10px" }} className="m-0 w-50 border-left">
          {data.pOwner.pName}
        </p>
      </div>
      <div style={{ padding: "5px" }} className="d-flex justify-content-between align-items-center border">
        <h6 style={{ paddingRight: "10px" }} className="m-0 w-50 text-right border-r">
          {intl.formatMessage({ id: "FuqaroPatronym" })}
        </h6>
        <p style={{ paddingLeft: "10px" }} className="m-0 w-50 border-left">
          {data.pOwner.pPatronym}
        </p>
      </div>
      <div style={{ padding: "5px" }} className="d-flex justify-content-between align-items-center border">
        <h6 style={{ paddingRight: "10px" }} className="m-0 w-50 text-right border-r">
          {intl.formatMessage({ id: "FuqaroDetailGender" })}
        </h6>
        <p style={{ paddingLeft: "10px" }} className="m-0 w-50 border-left">
          {data.pOwner.pSex}
        </p>
      </div>
      <div style={{ padding: "5px" }} className="d-flex justify-content-between align-items-center border">
        <h6 style={{ paddingRight: "10px" }} className="m-0 w-50 text-right border-r">
          {intl.formatMessage({ id: "FuqaroDetailBirthday" })}
        </h6>
        <p style={{ paddingLeft: "10px" }} className="m-0 w-50 border-left">
          {data.pOwner.pDateBirth}
        </p>
      </div>
      <div style={{ padding: "5px" }} className="d-flex justify-content-between align-items-center border">
        <h6 style={{ paddingRight: "10px" }} className="m-0 w-50 text-right border-r">
          {intl.formatMessage({ id: "FuqaroDetailPlaceOfBirth" })}
        </h6>
        <p style={{ paddingLeft: "10px" }} className="m-0 w-50 border-left">
          {data.pOwner.pPlaceBirth}
        </p>
      </div>
      <div style={{ padding: "5px" }} className="d-flex justify-content-between align-items-center border">
        <h6 style={{ paddingRight: "10px" }} className="m-0 w-50 text-right border-r">
          {intl.formatMessage({ id: "FuqaroDetailPassport" })}
        </h6>
        <p style={{ paddingLeft: "10px" }} className="m-0 w-50 border-left">
          {data.pOwner.pPsp}
        </p>
      </div>
      <div style={{ padding: "5px" }} className="d-flex justify-content-between align-items-center border">
        <h6 style={{ paddingRight: "10px" }} className="m-0 w-50 text-right border-r">
          {intl.formatMessage({ id: "FuqaroDetailPassportGived" })}
        </h6>
        <p style={{ paddingLeft: "10px" }} className="m-0 w-50 border-left">
          {data.pOwner.pIssuedBy}
        </p>
      </div>
      <div style={{ padding: "5px" }} className="d-flex justify-content-between align-items-center border">
        <h6 style={{ paddingRight: "10px" }} className="m-0 w-50 text-right border-r">
          {intl.formatMessage({ id: "FuqaroDetailIssueDate" })}
        </h6>
        <p style={{ paddingLeft: "10px" }} className="m-0 w-50 border-left">
          {data.pOwner.pIssueDate}
        </p>
      </div>
    </div>
  )
}

export default injectIntl(CarOwnerDetailsModal)
