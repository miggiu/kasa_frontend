import React from "react";
import { render, screen, within } from "@testing-library/react";
import { test, expect, jest, describe } from "@jest/globals";
import { userEvent } from "@testing-library/user-event";
import CollapseItem from "../components/Collapse/CollapseItem.jsx";
import Collapse from "../components/Collapse/Collapse.jsx";

// Setup user event for all tests
const user = userEvent.setup();

describe("CollapseItem", () => {
	// Setup mock props that most tests will need
	// - openItems with 0 means the first collapse item is open
	// - We use mock functions to track calls to openItem and closeItem
	const mockProps = {
		title: "Équipements",
		index: 0,
		openItems: new Set([0]), // Start open to see content
		openItem: jest.fn(),
		closeItem: jest.fn(),
		className: "test-class",
	};

	// Verifies component renders with simple props
	test("renders CollapseItem with title and content", () => {
		const title = "Test Title";
		const content = "Test Content";
		const openItems = new Set([0]);

		render(
			<CollapseItem
				title={title}
				content={content}
				index={0}
				openItems={openItems}
				openItem={() => {}}
				closeItem={() => {}}
			/>
		);
		// Verify both title and content are rendered to the DOM
		expect(screen.getByText(title)).toBeInTheDocument();
		expect(screen.getByText(content)).toBeInTheDocument();
	});

	// Verifies the array rendering functionality
	// When content is an array, it should render as a list of items
	test("renders array content as list items", () => {
		const equipmentItems = ["Cuisine", "Wi-Fi", "Télévision", "Lave-linge"];

		render(
			<CollapseItem
				{...mockProps}
				content={equipmentItems}
			/>
		);

		// Check that ul with correct class exists
		const list = screen.getByRole("list");
		expect(list).toHaveClass("equipment-list");
		expect(list).toHaveClass("test-class");

		// Using 'within' to scope queries to just the equipment list
		// This prevents matching other list items that might be in the document
		const equipmentList = screen.getByRole("list", { class: "equipment-list" });
		const listItems = within(equipmentList).getAllByRole("listitem");

		// Verify we have the right number of list items
		expect(listItems).toHaveLength(equipmentItems.length);

		// Verify each item text and class
		equipmentItems.forEach((item, index) => {
			expect(listItems[index]).toHaveTextContent(item);
			expect(listItems[index]).toHaveClass("test-class");
		});
	});

	//  Verifies that string content renders differently than arrays
	// String content should be wrapped in a paragraph, not a list
	test("renders string content as paragraph", () => {
		const description = "This is a description paragraph";

		render(
			<CollapseItem
				{...mockProps}
				content={description}
			/>
		);

		// Check that content is rendered as paragraph
		const paragraph = screen.getByText(description);
		expect(paragraph.tagName).toBe("P");

		// Verify no list is rendered
		expect(screen.queryByRole("list")).not.toBeInTheDocument();
	});

	// Verifies that openning the collapse correctly toggles the content visibility
	test("toggles content visibility on click", async () => {
		const title = "Test Title";
		const content = "Test Content";
		const mockOpenItem = jest.fn();
		const mockCloseItem = jest.fn();

		// Start with all items closed
		let openItems = new Set();

		// Using rerender to simulate component updates from parent
		const { rerender } = render(
			<CollapseItem
				title={title}
				content={content}
				index={0}
				openItems={openItems}
				openItem={mockOpenItem}
				closeItem={mockCloseItem}
			/>
		);
		// Get the content container and verify it starts closed (no 'open' class)

		const contentContainer = screen.getByText(content).closest("article");
		expect(contentContainer).not.toHaveClass("open");

		// Click the arrow to open the item
		await user.click(screen.getByAltText("collapse-arrow"));

		// Verify the openItem callback was called with the correct index
		expect(mockOpenItem).toHaveBeenCalledWith(0);

		// Simulate parent component updating openItems state
		openItems = new Set([0]);
		rerender(
			<CollapseItem
				title={title}
				content={content}
				index={0}
				openItems={openItems}
				openItem={mockOpenItem}
				closeItem={mockCloseItem}
			/>
		);

		// Verify content container now has the 'open' class
		expect(contentContainer).toHaveClass("open");
	});

	// Tests multiple CollapseItems within a Collapse to verify state management
	test("correctly manages open/close state", async () => {
		render(
			<Collapse>
				<CollapseItem
					title='Item 1'
					content='Content 1'
				/>
				<CollapseItem
					title='Item 2'
					content='Content 2'
				/>
			</Collapse>
		);

		// Get content containers for both items
		const content1Container = screen.getByText("Content 1").closest("article");
		const content2Container = screen.getByText("Content 2").closest("article");

		// Verify both items start closed
		expect(content1Container.classList.contains("open")).toBe(false);
		expect(content2Container.classList.contains("open")).toBe(false);

		// Get all collapse arrows
		const collapseArrows = screen.getAllByAltText("collapse-arrow");

		// Click the first item's arrow
		await user.click(collapseArrows[0]);
		// Verify first item opens while second remains closed
		expect(content1Container.classList.contains("open")).toBe(true);
		expect(content2Container.classList.contains("open")).toBe(false);

		// Click the second item's arrow
		await user.click(collapseArrows[1]);

		// Verify both items are now open
		expect(content1Container.classList.contains("open")).toBe(true);
		expect(content2Container.classList.contains("open")).toBe(true);
	});

	// Verifies that multiple collapse items can be open at the same time
	// and that closing one doesn't affect others
	test("multiple items can be open simultaneously", async () => {
		render(
			<Collapse>
				<CollapseItem
					title='Item 1'
					content='Content 1'
				/>
				<CollapseItem
					title='Item 2'
					content='Content 2'
				/>
			</Collapse>
		);

		const content1Container = screen.getByText("Content 1").closest("article");
		const content2Container = screen.getByText("Content 2").closest("article");
		const collapseArrows = screen.getAllByAltText("collapse-arrow");

		// Open first item
		await user.click(collapseArrows[0]);

		// Open second item
		await user.click(collapseArrows[1]);

		// Verify both items are open
		expect(content1Container.classList.contains("open")).toBe(true);
		expect(content2Container.classList.contains("open")).toBe(true);

		// Close first item
		await user.click(collapseArrows[0]);

		// Verify first closed, second still open - independent state behavior
		expect(content1Container.classList.contains("open")).toBe(false);
		expect(content2Container.classList.contains("open")).toBe(true);
	});

	// Verifies the open/close behavior when clicking the arrow
	test("arrow rotates correctly when opening and closing", async () => {
		const title = "Test Title";
		const content = "Test Content";
		const mockOpenItem = jest.fn();
		const mockCloseItem = jest.fn();

		// Start with closed state
		let openItems = new Set();

		// Using rerender to simulate parent component state changes
		const { rerender } = render(
			<CollapseItem
				title={title}
				content={content}
				index={0}
				openItems={openItems}
				openItem={mockOpenItem}
				closeItem={mockCloseItem}
			/>
		);

		// Get the arrow element
		const arrow = screen.getByAltText("collapse-arrow");

		// Initial state - arrow not rotated (0 degrees)
		expect(arrow).toHaveStyle("transform: rotate(0)");

		// Click to open
		await user.click(arrow);
		expect(mockOpenItem).toHaveBeenCalledWith(0);

		// Simulate parent component updating state
		openItems = new Set([0]);
		rerender(
			<CollapseItem
				title={title}
				content={content}
				index={0}
				openItems={openItems}
				openItem={mockOpenItem}
				closeItem={mockCloseItem}
			/>
		);

		// After opening - arrow should be rotated 180 degrees counter-clockwise
		expect(arrow).toHaveStyle("transform: rotate(-180deg)");

		// Click to close
		await user.click(arrow);
		expect(mockCloseItem).toHaveBeenCalledWith(0);

		// Simulate parent component updating state
		openItems = new Set();
		rerender(
			<CollapseItem
				title={title}
				content={content}
				index={0}
				openItems={openItems}
				openItem={mockOpenItem}
				closeItem={mockCloseItem}
			/>
		);

		// After closing - arrow should be back to 0 degrees
		expect(arrow).toHaveStyle("transform: rotate(0)");
	});
});
