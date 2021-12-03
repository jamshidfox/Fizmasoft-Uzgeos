import { useEffect, useState } from "react"
import { injectIntl } from "react-intl"
import { Form, Label, Input } from "reactstrap"
import filterTypes from "../filter.json"

const Filter = ({ intl, setFilters }) => {
  const [gender, setGender] = useState(0)
  const [ageMin, setAgeMin] = useState(0)
  const [ageMax, setAgeMax] = useState(100)
  const [top, setTop] = useState({ type: 0, color: 0 })
  const [pants, setPants] = useState({ type: 0, color: 0 })
  const [bag, setBag] = useState(0)
  const [umbrella, setUmbrella] = useState(0)
  const [hat, setHat] = useState(0)

  useEffect(() => {
    setFilters({
      coat_color: top.color,
      trousers_color: pants.color,
      coat_type: top.type,
      trousers_type: pants.type,
      hat,
      bag,
      gender,
      age_min: ageMin,
      age_max: ageMax
    })
  }, [gender, ageMin, ageMax, top, pants, bag, umbrella, hat])
  const ageChange = (e) => {
    const [min, max] = e.target.value.split(",")
    setAgeMin(+min)
    setAgeMax(+max)
  }
  return (
    <Form>
      <div className="d-flex justify-content-between mt-2 ">
        <Label for="gender">{intl.formatMessage({ id: "Gender" })}</Label>
        {/* <Label for="agemin">{intl.formatMessage({ id: "Age" })} min</Label>
        <Label for="agemax">{intl.formatMessage({ id: "Age" })} max</Label> */}
        <Label for="age">{intl.formatMessage({ id: "Age" })}</Label>
      </div>
      <div className="d-flex justify-content-between">
        <Input bsSize="sm" type="select" name="select" onChange={(e) => setGender(e.target.value)} id="gender">
          {filterTypes.Gender.map((f, index) => (
            <option key={f} value={index}>
              {intl.formatMessage({ id: f })}
            </option>
          ))}
        </Input>
        {/* <Input bsSize="sm" type="number" min={0} max={100} value={ageMin} onChange={(e) => setAgeMin(e.target.value)} id="agemin" />
        <Input bsSize="sm" type="number" min={0} max={100} value={ageMax} onChange={(e) => setAgeMax(e.target.value)} id="agemax" /> */}
        <Input onChange={ageChange} bsSize="sm" type="select" name="select" id="age">
          <option value={[0, 100]}>{intl.formatMessage({ id: "All" })}</option>
          <option value={[2, 4]}>{intl.formatMessage({ id: "Toddler" })}</option>
          <option value={[5, 12]}>{intl.formatMessage({ id: "Child" })}</option>
          <option value={[13, 19]}>{intl.formatMessage({ id: "Teenager" })}</option>
          <option value={[20, 39]}>{intl.formatMessage({ id: "Young" })}</option>
          <option value={[40, 59]}>{intl.formatMessage({ id: "Middle-aged" })}</option>
          <option value={[60, 100]}>{intl.formatMessage({ id: "Elderly" })}</option>
          <option value={[0, 100]}>{intl.formatMessage({ id: "Unknown" })}</option>
        </Input>
      </div>

      <div className="d-flex justify-content-between">
        <Label for="coat">{intl.formatMessage({ id: "Top" })}</Label>
        <Label for="colorCoat">{intl.formatMessage({ id: "Color" })}</Label>
      </div>
      <div className="d-flex justify-content-between">
        <Input bsSize="sm" type="select" name="select" id="coat" onChange={(e) => setTop({ type: e.target.value, color: top.color })}>
          {filterTypes.CoatType.map((f, index) => (
            <option key={f} value={index}>
              {intl.formatMessage({ id: f })}
            </option>
          ))}
        </Input>
        <Input bsSize="sm" type="select" name="select" id="colorCoat" onChange={(e) => setTop({ type: top.type, color: e.target.value })}>
          {filterTypes.color.map((f, index) => (
            <option key={f} value={index}>
              {intl.formatMessage({ id: f })}
            </option>
          ))}
        </Input>
      </div>

      <div className="d-flex justify-content-between ">
        <Label for="trousers">{intl.formatMessage({ id: "Pants" })}</Label>
        <Label for="colorTrousers">{intl.formatMessage({ id: "Color" })}</Label>
      </div>
      <div className="d-flex justify-content-between">
        <Input bsSize="sm" type="select" name="select" id="trousers" onChange={(e) => setPants({ type: e.target.value, color: pants.color })}>
          {filterTypes.TrousersType.map((f, index) => (
            <option key={f} value={index}>
              {intl.formatMessage({ id: f })}
            </option>
          ))}
        </Input>
        <Input bsSize="sm" type="select" name="select" id="colorTrousers" onChange={(e) => setPants({ type: pants.type, color: e.target.value })}>
          {filterTypes.color.map((f, index) => (
            <option key={f} value={index}>
              {intl.formatMessage({ id: f })}
            </option>
          ))}
        </Input>
      </div>
      <div className="d-flex justify-content-between  ">
        <Label for="bag">{intl.formatMessage({ id: "Bag" })}</Label>
        <Label for="umbrella">{intl.formatMessage({ id: "Umbrella" })}</Label>
      </div>
      <div className="d-flex justify-content-between">
        <Input bsSize="sm" type="select" name="select" id="bag" onChange={(e) => setBag(e.target.value)}>
          {filterTypes.bag_type.map((f, index) => (
            <option key={f} value={index}>
              {intl.formatMessage({ id: f })}
            </option>
          ))}
        </Input>
        <Input bsSize="sm" type="select" name="select" id="umbrella" onChange={(e) => setUmbrella(e.target.value)}>
          {filterTypes.has_umbrella.map((f) => (
            <option key={f}>{intl.formatMessage({ id: f })}</option>
          ))}
        </Input>
      </div>
      <div className="d-flex justify-content-between  ">
        <Label for="hat">{intl.formatMessage({ id: "Hat" })}</Label>
      </div>
      <div className="d-flex justify-content-between">
        <Input bsSize="sm" type="select" name="select" id="hat" onChange={(e) => setHat(e.target.value)}>
          {filterTypes.cap_type.map((f, index) => (
            <option key={f} value={index}>
              {intl.formatMessage({ id: f })}
            </option>
          ))}
        </Input>
      </div>
    </Form>
  )
}

export default injectIntl(Filter)
