import { Form, Label, Input } from "reactstrap"

const Filter = () => {
  return (
    <Form>
      <div className="d-flex justify-content-between mt-2 ">
        <Label for="gender">Type</Label>
        <Label for="age">Color</Label>
      </div>
      <div className="d-flex justify-content-between">
        <Input bsSize="sm" type="select" name="select" id="gender">
          <option>Pulp</option>
          <option>Nightcrawler</option>
          <option>Donnie Darko</option>
        </Input>
        <Input bsSize="sm" type="color" name="select" id="age" />
      </div>
      <div className="d-flex justify-content-between ">
        <Label for="gender">Logo</Label>
        <Label for="age">Color</Label>
      </div>
      <div className="d-flex justify-content-between">
        <Input bsSize="sm" type="select" name="select" id="gender">
          <option>Pulp</option>
          <option>Nightcrawler</option>
          <option>Donnie Darko</option>
        </Input>
        <Input bsSize="sm" type="color" name="select" id="age" />
      </div>
      <div className="d-flex justify-content-between  ">
        <Label for="gender">Plate</Label>
      </div>
      <div className="d-flex justify-content-between">
        <Input bsSize="sm" type="text" name="select" id="gender" />
      </div>
    </Form>
  )
}

export default Filter
