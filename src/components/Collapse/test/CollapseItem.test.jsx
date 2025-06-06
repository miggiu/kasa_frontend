import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect, jest } from "@jest/globals";
import { userEvent } from "@testing-library/user-event";
import CollapseItem from "../CollapseItem.jsx";
import Collapse from "../Collapse.jsx";

const user = userEvent.setup();

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

	expect(screen.getByText(title)).toBeInTheDocument();
	expect(screen.getByText(content)).toBeInTheDocument();
});

test("toggles content visibility on click", async () => {
	const title = "Test Title";
	const content = "Test Content";
	const mockOpenItem = jest.fn();
	const mockCloseItem = jest.fn();

	let openItems = new Set();

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

	const contentContainer = screen.getByText(content).closest("article");
	expect(contentContainer).not.toHaveClass("open");

	await user.click(screen.getByAltText("collapse-arrow"));
	expect(mockOpenItem).toHaveBeenCalledWith(0);

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

	expect(contentContainer).toHaveClass("open");
});

test("correctly manages open/close state", async () => {
  render(
    <Collapse>
      <CollapseItem title='Item 1' content='Content 1' />
      <CollapseItem title='Item 2' content='Content 2' />
    </Collapse>
  );

  const content1Container = screen.getByText("Content 1").closest("article");
  const content2Container = screen.getByText("Content 2").closest("article");
  
  expect(content1Container.classList.contains("open")).toBe(false);
  expect(content2Container.classList.contains("open")).toBe(false);

  const collapseArrows = screen.getAllByAltText("collapse-arrow");

  await user.click(collapseArrows[0]);
  expect(content1Container.classList.contains("open")).toBe(true);
  expect(content2Container.classList.contains("open")).toBe(false);

  await user.click(collapseArrows[1]);
  expect(content1Container.classList.contains("open")).toBe(true);
  expect(content2Container.classList.contains("open")).toBe(true);
});