import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { jest, beforeEach, describe, expect, test } from "@jest/globals";
import Card from "../components/Card/Card.jsx";

// This function will capture navigation events
// from the Card component so we can verify correct routing behavior
const mockNavigate = jest.fn();

// Mock the react-router module to intercept navigation calls, useHNavigate
// is remplaced with a mock function that we can control in tests
jest.mock("react-router", () => ({
	useNavigate: () => mockNavigate,
	MemoryRouter: ({ children }) => (
		<div data-testid='memory-router'>{children}</div>
	),
}));

// Reset the navigation mock before each test to ensure
// we're only tracking navigation calls from the current test
beforeEach(() => {
	mockNavigate.mockClear();
});

// A simple wrapper component that provides necessary context for the Card component
const RouterWrapper = ({ children }) => (
	<div data-testid='test-wrapper'>{children}</div>
);

// Mock property data that mimics the real data structure expected by Card
// Two different properties are defined to test various rendering cases
const mockProperties = [
	{
		id: "1",
		title: "Cozy Apartment",
		cover: "cover1.jpg",
	},
	{
		id: "2",
		title: "Modern Loft",
		cover: "cover2.jpg",
	},
];

describe("Card", () => {
	//Verifies that a loading message is displayed when propertiesData is empty
	test("renders loading message when propertiesData is empty", () => {
		render(<Card propertiesData={[]} />, { wrapper: RouterWrapper });
		expect(
			screen.getByText(/chargement de nos locations/i)
		).toBeInTheDocument();
	});

	//Verifies that the Card component renders property titles and covers correctly
	test("renders property titles and covers", () => {
		render(<Card propertiesData={mockProperties} />, {
			wrapper: RouterWrapper,
		});

		// Check that titles for both properties are shown
		expect(screen.getByText("Cozy Apartment")).toBeInTheDocument();
		expect(screen.getByText("Modern Loft")).toBeInTheDocument();

		// Verify image sources match what was provided in mock data
		// Images should use property title as alt text for accessibility
		expect(screen.getByAltText("Cozy Apartment")).toHaveAttribute(
			"src",
			"cover1.jpg"
		);
		expect(screen.getByAltText("Modern Loft")).toHaveAttribute(
			"src",
			"cover2.jpg"
		);
	});

	//Verifies that clicking a card navigates to the correct apartment page
	test("navigates to apartment page on card click", async () => {
		// Render with wrapper
		render(<Card propertiesData={mockProperties} />, {
			wrapper: RouterWrapper,
		});

		const card = screen.getByText("Cozy Apartment").closest(".card");

		// Simulate user clicking on the card
		await userEvent.click(card);

		// Verify navigation was called with the correct URL pattern
		// The URL should include the property ID from the mock data
		expect(mockNavigate).toHaveBeenCalledWith("/apartment/1");
	});

	// Verifies that clicking a card with an invalid ID format redirects to the error page
	test("redirects to error page when ID is invalid", async () => {
		const user = userEvent.setup();

		// Create a mock property with an invalid ID format
		// This will produce "undefined" after splitting with "-"
		const propertyWithInvalidId = {
			id: "undefined", // This will create "apartment-undefined" which should be caught
			title: "Invalid ID Card",
			cover: "some-image.jpg",
		};

		// Render the Card component with our invalid data
		render(<Card propertiesData={[propertyWithInvalidId]} />, {
			wrapper: RouterWrapper,
		});

		// Find and click the card with invalid ID
		const card = screen.getByText("Invalid ID Card").closest(".card");
		await user.click(card);

		// Verify navigation to error page instead of an invalid apartment URL
		expect(mockNavigate).toHaveBeenCalledWith("/error");
	});

	// Verifies that clicking a card with an undefined ID redirects to the error page
	test("redirects to error page when clicked element has no id", async () => {
		const user = userEvent.setup();

		// Create a mock property without an ID
		const propertyWithoutId = {
			title: "Missing ID Card",
			cover: "some-image.jpg",
			// No id property - this should trigger error handling
		};

		// Render the component with our malformed data
		render(<Card propertiesData={[propertyWithoutId]} />, {
			wrapper: RouterWrapper,
		});

		// Find and click the card
		const card = screen.getByText("Missing ID Card").closest(".card");
		await user.click(card);

		// Verify the component safely redirects to the error page
		// instead of causing a runtime error or invalid navigation
		expect(mockNavigate).toHaveBeenCalledWith("/error");
	});
});
