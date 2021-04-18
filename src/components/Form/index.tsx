import React from "react";
import Form from "react-bootstrap/Form";

enum QueryType {
  "NAME" = "name",
  "TYPES" = "types",
}

interface IForm {
  queryHandler: (queryType: QueryType) => (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormGroup: React.FC<IForm> = (prop) => {
  return (
    <Form>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Attack type</Form.Label>
        <Form.Control onChange={prop.queryHandler(QueryType.TYPES)} as="select">
          <option value="fire">Fire</option>
          <option value="electric">Electric</option>
          <option value="fighting">Fighting</option>
          <option value="bug">Bug</option>
          <option value="normal">Normal</option>
          <option value="flying">Flying</option>
          <option value="water">Water</option>
        </Form.Control>
      </Form.Group>
    </Form>
  );
};

export default React.memo(FormGroup);
