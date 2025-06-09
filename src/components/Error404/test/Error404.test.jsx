import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { test, expect } from "@jest/globals";
import Error404 from "../Error404";

// Verifies that the Error404 component renders correctly with expected elements
test("renders Error404 component with correct elements", () => {
  render(
    <BrowserRouter>
      <Error404 />
    </BrowserRouter>
  );
  
  // Check heading
  expect(screen.getByText("404")).toBeInTheDocument();
  
  // Check error message
  expect(screen.getByText("Oups! La page que vous demandez n'existe pas.")).toBeInTheDocument();
  
  // Check home link
  expect(screen.getByTestId("home-redirection")).toBeInTheDocument();
});

// Verifies that clicking on the home link navigates to the home page
test("clicking on home link navigates to home page", async () => {
  const user = userEvent.setup();
  
  render(
    <MemoryRouter initialEntries={["/not-found"]}>
      <Routes>
        <Route path="/" element={<div data-testid="home-page">Home Page</div>} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </MemoryRouter>
  );
  
  // Click the home link
  await user.click(screen.getByTestId("home-redirection"));
  
  // Verify navigation to home page
  expect(screen.getByTestId("home-page")).toBeInTheDocument();
});