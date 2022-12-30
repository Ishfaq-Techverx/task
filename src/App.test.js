import { render, screen } from "@testing-library/react";
import App from "./App";
import { UserProvider } from "./Components/userProvider";
test("renders learn react link", () => {
  render(
    <UserProvider>
      <App/>
    </UserProvider>
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
