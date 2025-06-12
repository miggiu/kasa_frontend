import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect } from "@jest/globals";
import { userEvent } from "@testing-library/user-event";
import { Routes, Route, MemoryRouter } from "react-router-dom";
import Header from "../components/Header/Header.jsx";

// Wraps the component in a MemoryRouter with a specified initial route
const renderWithRouter = (ui, { route = "/" } = {}) => {
	return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
};

// Set up userEvent for simulating user interactions consistently across tests
const user = userEvent.setup();

// Verifies that all essential elements (logo and navigation links) are present
test("renders Header component with logo and navigation links", () => {
	// Render the Header with router context and capture the unmount function
	// to clean up after the test completes
	const { unmount } = renderWithRouter(<Header className='test-header' />);

	// Verify logo is present by checking for its alt text
	expect(screen.getByAltText(/kasa logo/i)).toBeInTheDocument();

	// Get navigation links by their test IDs for reliable selection
	const homeLink = screen.getByTestId("nav-home");
	const aboutLink = screen.getByTestId("nav-about");

	// Verify both navigation links are present in the document
	expect(homeLink).toBeInTheDocument();
	expect(aboutLink).toBeInTheDocument();

	// Clean up to prevent test interference
	unmount();
});

// Test the active link highlighting functionality
// This verifies that the current page's navigation link is properly styled
test("active navigation link is underlined", async () => {
	const { unmount } = renderWithRouter(<Header className='test-header' />);

	// First test: On the home page, the home link should be active
	const homeLink = screen.getByTestId("nav-home");
	const aboutLink = screen.getByTestId("nav-about");

	expect(homeLink).toHaveClass("current");
	expect(aboutLink).not.toHaveClass("current");
	unmount();

	renderWithRouter(<Header className='test-header' />, { route: "/about" });
	// Second test: On the about page, the about link should be active
	const homeLinkAboutPage = screen.getByTestId("nav-home");
	const aboutLinkAboutPage = screen.getByTestId("nav-about");

	expect(homeLinkAboutPage).not.toHaveClass("current");
	expect(aboutLinkAboutPage).toHaveClass("current");
});

// Verifies that clicking on the logo navigates to the home page
test("clicking on logo navigates to home page", async () => {
	// Use routing to start on the about page to test navigation back to home
	render(
		<MemoryRouter initialEntries={["/about"]}>
			<Routes>
				<Route
					path='/'
					element={<div data-testid='home-page'>Home</div>}
				/>
				<Route
					path='/about'
					element={
						<>
							<Header className='test-header' />
							<div>About Content</div>
						</>
					}
				/>
			</Routes>
		</MemoryRouter>
	);

	// Simulate clicking the logo
	await user.click(screen.getByAltText(/kasa logo/i));

	// Verify navigation to home page by checking for home page content
	expect(screen.getByTestId("home-page")).toBeInTheDocument();
});

// Verifies that clicking on the 'A Propos' link navigates to the about page
test("clicking on 'A Propos' navigates to about page", async () => {
	// Set up routing scenario starting from home page
	render(
		<MemoryRouter initialEntries={["/"]}>
			<Routes>
				<Route
					path='/'
					element={<Header className='test-header' />}
				/>
				<Route
					path='/about'
					element={<div data-testid='about-page'>About</div>}
				/>
			</Routes>
		</MemoryRouter>
	);

	// Simulate clicking the About link
	await user.click(screen.getByText(/a propos/i));

	// Verify navigation to about page by checking for about page content
	expect(screen.getByTestId("about-page")).toBeInTheDocument();
});
