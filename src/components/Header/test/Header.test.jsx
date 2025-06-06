import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect } from "@jest/globals";
import { userEvent } from "@testing-library/user-event";
import { Routes, Route, MemoryRouter } from "react-router-dom";
import Header from "../Header.jsx";

const renderWithRouter = (ui, { route = "/" } = {}) => {
	return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
};

const user = userEvent.setup();

test("renders Header component with logo and navigation links", () => {
	const { unmount } = renderWithRouter(<Header className='test-header' />);

	expect(screen.getByAltText(/kasa logo/i)).toBeInTheDocument();
	const homeLink = screen.getByTestId("nav-home");
	const aboutLink = screen.getByTestId("nav-about");
	expect(homeLink).toBeInTheDocument();
	expect(aboutLink).toBeInTheDocument();

	unmount();
});

test("active navigation link is underlined", async () => {
	const { unmount } = renderWithRouter(<Header className='test-header' />);

	const homeLink = screen.getByTestId("nav-home");
	const aboutLink = screen.getByTestId("nav-about");
	expect(homeLink).toHaveClass("current");
	expect(aboutLink).not.toHaveClass("current");
	unmount();

	renderWithRouter(<Header className='test-header' />, { route: "/about" });
	const homeLinkAboutPage = screen.getByTestId("nav-home");
	const aboutLinkAboutPage = screen.getByTestId("nav-about");

	expect(homeLinkAboutPage).not.toHaveClass("current");
	expect(aboutLinkAboutPage).toHaveClass("current");
});

test("clicking on logo navigates to home page", async () => {
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

	await user.click(screen.getByAltText(/kasa logo/i));
	expect(screen.getByTestId("home-page")).toBeInTheDocument();
});

test("clicking on 'A Propos' navigates to about page", async () => {
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

	await user.click(screen.getByText(/a propos/i));
	expect(screen.getByTestId("about-page")).toBeInTheDocument();
});
