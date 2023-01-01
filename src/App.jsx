import { useEffect } from "react";
import { useCustomHook } from "./Components/userProvider";
import ModalCustom from "./Components/modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Forms from "./Components/Form";
import Toast from "./Components/Toast";
import View from "./Components/View";
function App() {
  const { state, dispatch } = useCustomHook();
  useEffect(() => {
    if (state?.toastOpen) {
      setTimeout(() => {
        dispatch({
          type: "TOAST",
          payload: { message: "", toastOpen: false },
        });
      }, 2000);
    }
  }, [state?.toastOpen]);

  return (
    <>
      <ModalCustom />
      <Container>
        <div>
          <h1 className="text-center my-5 text-xl font-semibold text-white">
            Please enter your name and pick the Sectors you are currently
            involved in.
          </h1>
        </div>

        <Row>
          <Col sm={12} lg={6}>
            <Forms />
          </Col>
          <Col sm={12} lg={6}>
            <View />
          </Col>
        </Row>
      </Container>
      <Toast show={state?.toastOpen} content={state?.message} />
    </>
  );
}
export default App;
