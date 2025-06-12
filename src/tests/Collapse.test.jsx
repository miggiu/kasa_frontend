import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect, jest } from "@jest/globals";
import { describe, beforeEach } from "@jest/globals";
import Collapse from "../components/Collapse/Collapse.jsx";

// Create a mock implementation of the CollapseItem component
// This allows us to:
// 1. Verify props passed from Collapse to its children
// 2. Simplify testing by replacing complex child component behavior
// 3. Isolate the Collapse component for true unit testing
const MockCollapseItem = jest.fn(() => (
	<div data-testid='mock-item'>Mock Item</div>
));

// Mock the entire CollapseItem module to return our mock implementation
// This intercepts any imports of CollapseItem in the Collapse component
// and replaces them with our mock function that captures props
jest.mock("../components/Collapse/CollapseItem", () => (props) => MockCollapseItem(props));

describe("Collapse", () => {
	// Reset mock function call history before each test
	// This ensures test isolation - calls from previous tests don't affect current test
	beforeEach(() => {
		MockCollapseItem.mockClear();
	});

	// Verifies that the component creates the correct DOM structure
	// and applies CSS classes properly, including custom classes
	test("renders with correct structure and classes", () => {
		const { container } = render(
			// Destructure container from render to access DOM elements directly
			<Collapse className='custom-class'>
				<MockCollapseItem />
			</Collapse>
		);

		// Verify the section element exists with correct classes
		const section = container.querySelector("section.collapse");
		expect(section).toHaveClass("collapse", "custom-class");

		// Verify the list element exists with correct class
		const list = document.getElementById("collapse-list");
		expect(list).toHaveClass("custom-class");

		// Verify child components are rendered
		expect(screen.getByTestId("mock-item")).toBeInTheDocument();
	});

	// Verifies that Collapse correctly provides its children with:
	// 1. The openItems state for tracking which items are expanded
	// 2. Functions to open and close items
	// 3. A unique index for each child for identification
	test("passes correct props to children", () => {
		render(
			<Collapse>
				<MockCollapseItem />
				<MockCollapseItem />
			</Collapse>
		);

		// Check first child received correct props with index 0
		// We use mock.calls to see what arguments were passed to our mock
		// Each call represents a render of the MockCollapseItem
		expect(MockCollapseItem.mock.calls[0][0]).toEqual(
			expect.objectContaining({
				openItems: expect.any(Set), // State to track open items
				openItem: expect.any(Function), // Function to open an item
				closeItem: expect.any(Function), // Function to close an item
				index: 0, // First item should have index 0
			})
		);

		// Check second child received correct props with index 1
		// This verifies children are properly indexed in sequence
		expect(MockCollapseItem.mock.calls[1][0]).toEqual(
			expect.objectContaining({
				openItems: expect.any(Set),
				openItem: expect.any(Function),
				closeItem: expect.any(Function),
				index: 1,
			})
		);
	});

	// Verifies that Collapse correctly handles children that are not valid React elements
	// This includes plain text, null, or boolean values
	test("handles non-React children properly", () => {
		// This shouldn't throw an error
		render(
			<Collapse>
				<MockCollapseItem />
				Plain text
				{null}
				{false}
			</Collapse>
		);

		// Verify only the valid React element was processed
		expect(MockCollapseItem).toHaveBeenCalledTimes(1);
		expect(screen.getByTestId("mock-item")).toBeInTheDocument();
	});
});
