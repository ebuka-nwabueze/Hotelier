import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import userEvent from "@testing-library/user-event";

import Login from "../pages/Login";

test("on render, check if login button is present", () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  });
  render(
    <Router>
      <QueryClientProvider client={queryClient}>
        <Login />
      </QueryClientProvider>
    </Router>
  );


  expect(screen.getByRole("button", {name:/login/i})).toBeEnabled();
  userEvent.type(screen.getByPlaceholderText(/Enter your email/i), "ebuka@gmail.com")
  userEvent.type(screen.getByPlaceholderText(/Enter your password/i), "s3ret")
  expect(screen.getByPlaceholderText(/Enter your password/i).innerHTML).tobe
}); 
