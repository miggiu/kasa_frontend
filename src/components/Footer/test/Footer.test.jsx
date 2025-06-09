import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect, describe } from "@jest/globals";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Footer from "../Footer.jsx";

// Helper function to render the Footer with router context
// Since Footer might contain links that use React Router
const renderWithRouter = (ui) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

// Set up userEvent for simulating user interactions
const user = userEvent.setup();

describe("Footer", () => {
  // Basic rendering test - verifies the Footer displays correctly
  test("renders Footer component with logo and copyright", () => {
    renderWithRouter(<Footer />);
    
    // Check that the logo is present
    const footerLogo = screen.getByAltText(/kasa logo/i);
    expect(footerLogo).toBeInTheDocument();
    
    // Verify copyright text is displayed
    const copyrightText = screen.getByText(/© 2020 Kasa. All rights reserved/i);
    expect(copyrightText).toBeInTheDocument();
  });

});

// Verifies that clicking on the footer logo navigates to the home page
test("clicking on footer logo navigates to home page", async () => {
  // Use routing to start on the about page to test navigation back to home
  render(
    <MemoryRouter initialEntries={["/about"]}>
      <Routes>
        <Route
          path="/"
          element={<div data-testid="home-page">Home</div>}
        />
        <Route
          path="/about"
          element={
            <>
              <div>About Content</div>
              <Footer className="test-footer" />
            </>
          }
        />
      </Routes>
    </MemoryRouter>
  );

  // Simulate clicking the footer logo
  await user.click(screen.getByAltText(/kasa logo/i));

  // Verify navigation to home page by checking for home page content
  expect(screen.getByTestId("home-page")).toBeInTheDocument();
});