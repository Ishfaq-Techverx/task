import Modal from "react-bootstrap/Modal";
import Forms from "./Form";
import { useCustomHook } from "./userProvider";

const Example = () => {
  const { state, dispatch } = useCustomHook();
  const handleToggle = () => dispatch({ type: "TOGGLE" });
  return (
    <Modal
      show={state.open}
      onHide={handleToggle}
      animation
      centered
      contentClassName="bgDark"
      // contentClassName="bgDark"
      // style={{backgroundColor: "#transparent"}}
    >
      <Modal.Header closeButton
      closeVariant
      >
        <Modal.Title>Edit Your Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Forms noBox />
      </Modal.Body>
    </Modal>
  );
};
export default Example;
