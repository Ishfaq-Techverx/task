import { useState } from "react";
import { useCustomHook } from "./userProvider";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const Forms = ({ noBox }) => {
  const { state, dispatch, options } = useCustomHook();

  const [record, setRecord] = useState({
    name: state?.open ? state?.list[state?.currentRecord]?.name : "",
    sectors: state?.open
      ? state?.list[state?.currentRecord]?.sectors
      : "Manufacturing",
    agreement: false,
  });

  const handleUpdate = () => {
    dispatch({
      type: "UPDATE",
      payload: {
        record,
        id: state.currentRecord,
        message: "Saved",
        toastOpen: true,
      },
    });
    dispatch({ type: "TOGGLE" });
  };

  const handleToastError = () => {
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
  };

  const handleAddRecord = (e) => {
    dispatch({
      type: "ADD",
      payload: { record, message: "Saved", toastOpen: true },
    });
    setRecord({ sectors: "Manufacturing" });
    e.target[0].value = "";
    e.target[2].checked = false;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.open) {
      handleUpdate();
    } else {
      if (!record?.name || !record?.sectors || !record?.agreement) {
        handleToastError();
      } else {
        handleAddRecord(e);
      }
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
            className="check"
          />
        </Form.Group>
      ) : null}
      <Button variant="primary" type="submit" className="btnWidth">
        Save
      </Button>
    </Form>
  );
};
export default Forms;
