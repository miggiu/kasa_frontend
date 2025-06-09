import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect, describe } from "@jest/globals";
import TagButton from "../TagButton.jsx";

describe("shows error if no tags ", () => {
	// Setup test with empty string instead of an array
	// This simulates a common error case where the component
	// might receive incorrect data type
	const tags = "";
	const renderTagButton = () => render(<TagButton tags={tags} />);

	// Verifies that the component renders an error message
	test("renders no tag error", () => {
		renderTagButton();
		const errorText = screen.getByText(/Il n'y a pas de tags correspondants/i);
		expect(errorText).toBeInTheDocument();
	});
});

describe("renders TagButton with only 1 tag", () => {
	// Setup test with an array containing a single tag
	// This tests the minimum valid input scenario
	const tags = ["tag1"];
	const renderTagButton = () => render(<TagButton tags={tags} />);

	// Verifies that only one tag is rendered
	test("renders TagButton with only 1 tag", () => {
		renderTagButton();
		const tagElements = screen.getAllByText(/tag/i);
		expect(tagElements.length).toBe(tags.length);
	});
});

describe("renders TagButton with multiple tags", () => {
	// Setup test with multiple tags to verify list rendering functionality
	const tags = ["tag1", "tag2", "tag3"];
	const renderTagButton = () => render(<TagButton tags={tags} />);

    // Verifies that the component renders multiple tags correctly
	test("renders TagButton with only 1 tag", () => {
		renderTagButton();
		const tagElements = screen.getAllByText(/tag/i);
		expect(tagElements.length).toBe(tags.length);
	});
});
