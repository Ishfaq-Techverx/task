import { useEffect } from "react";
import { useCustomHook } from "./userProvider";
import Table from "react-bootstrap/Table";
const View = () => {
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
    <Table responsive variant="white" stripped="true">
      <thead className="trHead">
        <tr className="trMain">
          <th>NAME</th>
          <th>SECTORS</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        {state?.list?.map((item, i) => (
          <tr className="trMain" key={i}>
            <td>{item.name}</td>
            <td>{item?.sectors}</td>
            <button
              className="mr-4 noBorder"
              onClick={() => {
                dispatch({ type: "DELETE", payload: {id:i,message: "Deleted", toastOpen: true } });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                color="white"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />{" "}
                <path
                  fillRule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
            </button>
            <button
              className="noBorder"
              onClick={() => {
                dispatch({ type: "TOGGLE" });
                dispatch({ type: "CURRENT", payload: i });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                viewBox="0 0 24 24"
              >
                <g>
                  <path d="M0 0h24v24H0z"></path>
                  <path
                    d="M16.757 3l-2 2H5v14h14V9.243l2-2V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12.757zm3.728-.9L21.9 3.516l-9.192 9.192-1.412.003-.002-1.417L20.485 2.1z"
                    fill="white"
                  ></path>
                </g>
              </svg>
            </button>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
export default View;
