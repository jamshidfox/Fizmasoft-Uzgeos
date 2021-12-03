import React from "react"
import { injectIntl } from "react-intl"

const HasGun = ({ intl, weapon, index }) => {
  return (
    <div className="m-1 ">
      <h4>
        {index + 1}. {intl.formatMessage({ id: "WeaponData" })}
      </h4>
      <div className="d-flex  justify-content-between">
        <strong>{intl.formatMessage({ id: "WeaponType" })}: </strong>
        <em className="ml-2">{weapon.gunType.titleRu}</em>
      </div>
      <div className="d-flex  justify-content-between">
        <strong>{intl.formatMessage({ id: "MarkaModel" })}: </strong>
        <em className="ml-2">{weapon.gunMarka}</em>
      </div>
      <div className="d-flex  justify-content-between">
        <strong>{intl.formatMessage({ id: "Series" })}: </strong>
        <em className="ml-2">{weapon.gunSeria}</em>
      </div>
      <div className="d-flex  justify-content-between">
        <strong>{intl.formatMessage({ id: "Number" })}: </strong>
        <em className="ml-2">{weapon.gunNumber}</em>
      </div>
      <div className="d-flex  justify-content-between">
        <strong>{intl.formatMessage({ id: "Caliber" })}: </strong>
        <em className="ml-2">{weapon.gunCaliber}</em>
      </div>
      <div className="d-flex  justify-content-between">
        <strong>{intl.formatMessage({ id: "RightOfStorage" })}: </strong>
        <em className="ml-2">{weapon.gunPermissionType.titleRu}</em>
      </div>
      <div className="d-flex  justify-content-between">
        <strong>{intl.formatMessage({ id: "PermissionIssued" })}: </strong>
        <em className="ml-2">{weapon.gunDocBegin}</em>
      </div>
      <div className="d-flex  justify-content-between">
        <strong>No: </strong>
        <em className="ml-2">{weapon.gunDocNumber}</em>
      </div>
      <div className="d-flex  justify-content-between">
        <strong>{intl.formatMessage({ id: "ForUpTo" })}: </strong>
        <em className="ml-2">{weapon.gunDocEnd}</em>
      </div>
      <div className="d-flex  justify-content-between">
        <strong>{intl.formatMessage({ id: "Organ" })}: </strong>
        <em className="ml-2">{weapon.organ.titleRu}</em>
      </div>
    </div>
  )
}

export default injectIntl(HasGun)
