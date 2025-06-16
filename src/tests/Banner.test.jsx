import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect, describe } from "@jest/globals";
import Banner from "../components/Banner/Banner.jsx";

describe("inserts banner props ", () => {
	// Helper function to render the Banner with consistent props
	const renderBanner = () =>
		render(
			<Banner
				title='Chez vous, partout et ailleurs'
				image='public\about-banner.webp'
				id='banner-test'
			/>
		);

	// Verifies that the title text is correctly displayed in the banner
	test("renders Bannner with title", () => {
		renderBanner();
		const bannerTitle = screen.getByText(/Chez vous, partout et ailleurs/i);
		expect(bannerTitle).toBeInTheDocument();
	});
});

describe("renders Banner without title", () => {
	// Helper function to render Banner without a title prop
	const renderBanner = () =>
		render(
			<Banner
				image='public\about-banner.wepb'
				id='banner-test'
			/>
		);

	// Verifies that no heading element is rendered when no title is provided
	test("renders Banner without title", () => {
		renderBanner();
		const bannerTitle = screen.queryByRole("h1");
		// Verify no heading element exists in the document
		expect(bannerTitle).not.toBeInTheDocument();
	});
});
