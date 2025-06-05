import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect, describe } from "@jest/globals";
import Banner from "../Banner.jsx";

describe("inserts banner props ", () => {
	const renderBanner = () =>
		render(<Banner 
			title='Chez vous, partout et ailleurs' 
			image="public\about-banner.png"
			id="banner-test" />);
	test("renders Bannner with title", () => {
		renderBanner();
		const bannerTitle = screen.getByText(/Chez vous, partout et ailleurs/i);
		expect(bannerTitle).toBeInTheDocument();
	});
});

describe("renders Banner without title", () => {
	const renderBanner = () =>
		render(<Banner 
			image="public\about-banner.png"
			id="banner-test" />);
	test("renders Banner without title", () => {
		renderBanner();
		const bannerTitle = screen.queryByRole('h1');
		expect(bannerTitle).not.toBeInTheDocument();
	});
});