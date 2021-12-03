import { injectIntl } from "react-intl"
import { Form, Label, Input } from "reactstrap"
import filterTypes from "../filter.json"

const Filter = ({ intl }) => {
  return (
    <Form>
      <div className="d-flex justify-content-between mt-2 ">
        <Label for="gender">{intl.formatMessage({ id: "Gender" })}</Label>
        <Label for="age">{intl.formatMessage({ id: "Age" })}</Label>
      </div>
      <div className="d-flex justify-content-between">
        <Input bsSize="sm" type="select" name="select" id="gender">
          {filterTypes.Gender.map((f) => (
            <option key={f}>{intl.formatMessage({ id: f })}</option>
          ))}
        </Input>
        <Input bsSize="sm" type="select" name="select" id="age">
          <option>{intl.formatMessage({ id: "All" })}</option>
          <option>{intl.formatMessage({ id: "Toddler" })}</option>
          <option>{intl.formatMessage({ id: "Child" })}</option>
          <option>{intl.formatMessage({ id: "Teenager" })}</option>
          <option>{intl.formatMessage({ id: "Young" })}</option>
          <option>{intl.formatMessage({ id: "Middle-aged" })}</option>
          <option>{intl.formatMessage({ id: "Elderly" })}</option>
          <option>{intl.formatMessage({ id: "Unknown" })}</option>
        </Input>
      </div>
      <div className="d-flex justify-content-between mt-1 ">
        <Label for="glasses">{intl.formatMessage({ id: "Glasses" })}</Label>
        <Label for="mask">{intl.formatMessage({ id: "Mask" })}</Label>
      </div>
      <div className="d-flex justify-content-between">
        <Input bsSize="sm" type="select" name="select" id="glasses">
          <option>{intl.formatMessage({ id: "All" })}</option>
          <option>{intl.formatMessage({ id: "General" })}</option>
          <option>{intl.formatMessage({ id: "Sunglasses" })}</option>
          <option>{intl.formatMessage({ id: "Black-Framed" })}</option>
          <option>{intl.formatMessage({ id: "No" })}</option>
          <option>{intl.formatMessage({ id: "Unknown" })}</option>
        </Input>
        <Input bsSize="sm" type="select" name="select" id="mask">
          <option>{intl.formatMessage({ id: "All" })}</option>
          <option>{intl.formatMessage({ id: "Yes" })}</option>
          <option>{intl.formatMessage({ id: "No" })}</option>
          <option>{intl.formatMessage({ id: "Unknown" })}</option>
        </Input>
      </div>
      <div className="d-flex justify-content-between mt-1">
        <Label for="expression">{intl.formatMessage({ id: "Expression" })}</Label>
        <Label for="beard">{intl.formatMessage({ id: "Beard" })}</Label>
      </div>
      <div className="d-flex justify-content-between">
        <Input bsSize="sm" type="select" name="select" id="expression">
          <option>{intl.formatMessage({ id: "All" })}</option>
          <option>{intl.formatMessage({ id: "Angry" })}</option>
          <option>{intl.formatMessage({ id: "Sad" })}</option>
          <option>{intl.formatMessage({ id: "Disgusted" })}</option>
          <option>{intl.formatMessage({ id: "Scared" })}</option>
          <option>{intl.formatMessage({ id: "Surprised" })}</option>
          <option>{intl.formatMessage({ id: "Happy" })}</option>
          <option>{intl.formatMessage({ id: "Confused" })}</option>
          <option>{intl.formatMessage({ id: "Calm" })}</option>
          <option>{intl.formatMessage({ id: "Unknown" })}</option>
        </Input>
        <Input bsSize="sm" type="select" name="select" id="beard">
          <option>{intl.formatMessage({ id: "All" })}</option>
          <option>{intl.formatMessage({ id: "Yes" })}</option>
          <option>{intl.formatMessage({ id: "No" })}</option>
          <option>{intl.formatMessage({ id: "Unknown" })}</option>
        </Input>
      </div>
    </Form>
  )
}

export default injectIntl(Filter)
