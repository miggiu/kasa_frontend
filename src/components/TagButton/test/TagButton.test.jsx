import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect, describe } from "@jest/globals";
import TagButton from "../TagButton.jsx";

describe("shows error if no tags ", () => {
    const tags = "";
    const renderTagButton = () => render(<TagButton tags={tags} />);

    test("renders no tag error", () => {
        renderTagButton();
        const errorText = screen.getByText(/Il n'y a pas de tags correspondants/i);
        expect (errorText).toBeInTheDocument();
    });
});

describe("renders TagButton with only 1 tag", () => {
    const tags = ["tag1"];
    const renderTagButton = () => render(<TagButton tags={tags} />);

    test("renders TagButton with only 1 tag", () => {
        renderTagButton();
        const tagElements = screen.getAllByText(/tag/i);
        expect(tagElements.length).toBe(tags.length);
    });
});

describe("renders TagButton with multiple tags", () => {
    const tags = ["tag1", "tag2", "tag3"];
    const renderTagButton = () => render(<TagButton tags={tags} />);

    test("renders TagButton with only 1 tag", () => {
        renderTagButton();
        const tagElements = screen.getAllByText(/tag/i);
        expect(tagElements.length).toBe(tags.length);
    });
});
