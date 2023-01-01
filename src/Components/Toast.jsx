import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const Toaster = ({ content, show }) => {
  return (
    <ToastContainer position="top-center" className="p-3">
      <Toast show={show} bg={content === "Saved" ? "success" : "danger"}>
        <Toast.Body>{content}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default Toaster;
