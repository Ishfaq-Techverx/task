import { useState } from "react";
import { useCustomHook } from "./userProvider";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const Forms = ({ noBox }) => {
  const { state, dispatch, sectorOptions } = useCustomHook();
  const [record, setRecord] = useState({
    name: state?.open ? state?.list[state?.currentRecord]?.name : "",
    sectors: state?.open
      ? state?.list[state?.currentRecord]?.sectors
      : "Manufacturing",
    agreement: false,
  });
  const options = sectorOptions.map(({ name, value }) => (
    <option key={value} value={name}>
      {name}
    </option>
  ));
  const handleSubmit = (e) => {
    e.preventDefault();
    if (state?.open) {
      dispatch({
        type: "UPDATE",
        payload: {
          record,
          id: state.currentRecord,
          message: "Saved",
          toastOpen: true,
        },
      });
    } else {
      if (!record?.name || !record?.sectors || !record?.agreement) {
        setRecord({ ...record, sectors: "Manufacturing" });
        dispatch({
          type: "TOAST",
          payload: {
            message: `PLease Validate ${
              !record?.name
                ? "Name"
                : !record?.sectors
                ? "Select Sectors"
                : "Check agreement"
            }`,
            toastOpen: true,
          },
        });
        return;
      } else {
        dispatch({
          type: "ADD",
          payload: { record, message: "Saved", toastOpen: true },
        });
      }
    }
    setRecord({});
    e.target[0].value = "";
    e.target[2].checked = false;
    if (state.open) {
      dispatch({ type: "TOGGLE" });
    }
  };
  return (
    <Form
      className="flex shadow-2xl py-10 flex-col px-1 md:px-10 gap-y-5"
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3" controlId="formBasicNamel">
        <Form.Control
          type="text"
          placeholder="Your Name"
          value={record?.name}
          name="name"
          onChange={(e) => {
            setRecord({ ...record, name: e.target.value });
          }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Select
          value={record?.sectors ? record?.sectors : "Manufacturing"}
          name="select"
          className="mb-3"
          aria-label="Default select"
          onChange={(e) => {
            console.log("s::", e.target.name);
            setRecord({ ...record, sectors: e.target.value });
          }}
        >
          {options}
        </Form.Select>
      </Form.Group>
      {!noBox ? (
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            onChange={(e) => {
              setRecord({ ...record, agreement: e.target.checked });
            }}
            type="checkbox"
            label="Agree the Terms"
            style={{ color: "white" }}
          />
        </Form.Group>
      ) : null}
      <Button
        variant="primary"
        type="submit"
        style={{ width: "-webkit-fill-available" }}
      >
        Save
      </Button>
    </Form>
  );
};
export default Forms;
