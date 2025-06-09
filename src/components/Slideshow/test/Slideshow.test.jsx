import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect, afterEach, beforeAll, jest } from "@jest/globals";
import { userEvent } from "@testing-library/user-event";
import Slideshow from "../Slideshow.jsx";

// Set up userEvent for simulating user interactions like clicks
const user = userEvent.setup();

// Mock window.matchMedia before tests run
// This is necessary because the Slideshow component uses media queries
// for responsive behavior, which aren't available in the test environment
beforeAll(() => {
	window.matchMedia = jest.fn().mockImplementation((query) => {
		return {
			matches: false, // Default to not matching any media query
			media: query,
			onchange: null,
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
			dispatchEvent: jest.fn(),
			addListener: jest.fn(),
			removeListener: jest.fn(),
		};
	});
});

// Verifies that the Slideshow component renders a loading state when propertyData is empty
test("renders loading state when propertyData is empty", () => {
	render(<Slideshow propertyData={[]} />);
	const loadingText = screen.getByText(/Chargement de la location.../i);
	expect(loadingText).toBeInTheDocument();
});

// Verifies the case where the propertyData is provided but has no images
// The component should render a message indicating no image is available
test("renders no images state when propertyData has no pictures", () => {
	const propertyData = [{ title: "Test Property", pictures: [] }];
	render(<Slideshow propertyData={propertyData} />);
	const noImagesText = screen.getByText(/Aucune image disponible/i);
	expect(noImagesText).toBeInTheDocument();
});

// Verifies basic rendering of slideshow with multiple images
// The initial state should show the first image correctly
test("renders slideshow with images", () => {
	const propertyData = [
		{
			title: "Test Property",
			pictures: ["image1.jpg", "image2.jpg", "image3.jpg"],
		},
	];
	render(<Slideshow propertyData={propertyData} />);

	// Check that the first image is displayed with the correct alt text
	const imageElement = screen.getByAltText(/Test Property - Image 1/i);
	expect(imageElement).toBeInTheDocument();
});

// Verifies navigation to next image when clicking the right arrow
test("click on right arrow changes to next image", async () => {
	const propertyData = [
		{
			title: "Test Property",
			pictures: ["image1.jpg", "image2.jpg", "image3.jpg"],
		},
	];
	render(<Slideshow propertyData={propertyData} />);

	// Find the next (right) button and verify it exists
	const nextButton = screen.getByAltText(/Suivant/i);
	expect(nextButton).toBeInTheDocument();

	// Click the next button to navigate to the second image
	await user.click(nextButton);

	// Verify that the second image is now displayed
	const nextImageElement = screen.getByAltText(/Test Property - Image 2/i);
	expect(nextImageElement).toBeInTheDocument();
});

// Verifies navigation to previous image when clicking the left arrow
test("click on left arrow changes to previous image", async () => {
	const propertyData = [
		{
			title: "Test Property",
			pictures: ["image1.jpg", "image2.jpg", "image3.jpg"],
		},
	];
	render(<Slideshow propertyData={propertyData} />);

	// First, navigate to the second image
	const nextButton = screen.getByAltText(/Suivant/i);
	await user.click(nextButton);

	// Then test the previous button functionality
	const previousButton = screen.getByAltText(/Précédent/i);
	expect(previousButton).toBeInTheDocument();

	await user.click(previousButton);

	// Verify we've returned to the first image
	const previousImageElement = screen.getByAltText(/Test Property - Image 1/i);
	expect(previousImageElement).toBeInTheDocument();
});

// Verifies that the image counter displays the correct position
test("image counter displays current image index", () => {
	const propertyData = [
		{
			title: "Test Property",
			pictures: [
				"image1.jpg",
				"image2.jpg",
				"image3.jpg",
				"image4.jpg",
				"image5.jpg",
			],
		},
	];
	render(<Slideshow propertyData={propertyData} />);

	// Verify the counter shows "1/5" for the first image out of five
	const imageCounter = screen.getByText(/1\/5/i);
	expect(imageCounter).toBeInTheDocument();
});

// Verifies that the image counter updates when navigating to the next image
test("clicking on right arrow updates image counter to next number", async () => {
	const propertyData = [
		{
			title: "Test Property",
			pictures: ["image1.jpg", "image2.jpg", "image3.jpg"],
		},
	];
	render(<Slideshow propertyData={propertyData} />);

	// Click the next button to advance to the second image
	const nextButton = screen.getByAltText(/Suivant/i);
	expect(nextButton).toBeInTheDocument();
	await user.click(nextButton);

	// Verify the counter now shows "2/3"
	const updatedImageCounter = screen.getByText(/2\/3/i);
	expect(updatedImageCounter).toBeInTheDocument();
});

// Verifies that the image counter updates when navigating to the previous image
test("clicking on left arrow updates image counter to previous number", async () => {
	const propertyData = [
		{
			title: "Test Property",
			pictures: ["image1.jpg", "image2.jpg", "image3.jpg"],
		},
	];
	render(<Slideshow propertyData={propertyData} />);
	// First go to image 2
	const nextButton = screen.getByAltText(/Suivant/i);
	await user.click(nextButton);

	// Then go back to image 1
	const previousButton = screen.getByAltText(/Précédent/i);
	expect(previousButton).toBeInTheDocument();
	await user.click(previousButton);

	// Verify the counter now shows "1/3" again
	const updatedImageCounter = screen.getByText(/1\/3/i);
	expect(updatedImageCounter).toBeInTheDocument();
});

// Verifies loop navigation - going past the last image should loop to the first
test("clicking on right arrow loops back to first image when at last image", async () => {
	const propertyData = [
		{
			title: "Test Property",
			pictures: ["image1.jpg", "image2.jpg", "image3.jpg"],
		},
	];
	render(<Slideshow propertyData={propertyData} />);

	const nextButton = screen.getByAltText(/Suivant/i);
	expect(nextButton).toBeInTheDocument();

	// Click three times to go: image1 -> image2 -> image3 -> back to image1
	await user.click(nextButton);
	await user.click(nextButton);
	await user.click(nextButton);

	// Verify we've looped back to the first image
	const loopedImageElement = screen.getByAltText(/Test Property - Image 1/i);
	expect(loopedImageElement).toBeInTheDocument();
});

// Verifies loop navigation in reverse - going before the first image loops to the last
test("clicking on left arrow loops back to last image when at first image", async () => {
	const propertyData = [
		{
			title: "Test Property",
			pictures: ["image1.jpg", "image2.jpg", "image3.jpg"],
		},
	];
	render(<Slideshow propertyData={propertyData} />);

	const previousButton = screen.getByAltText(/Précédent/i);
	expect(previousButton).toBeInTheDocument();

	// From image 1, click previous to loop to image 3
	await user.click(previousButton);

	// Verify we've looped to the last image
	const loopedImageElement = screen.getByAltText(/Test Property - Image 3/i);
	expect(loopedImageElement).toBeInTheDocument();
});

// Verifies that the slideshow does not render arrows when there is only one image
test("renders slideshow with only one image, arrows do not exist", () => {
	const propertyData = [
		{
			title: "Single Image Property",
			pictures: ["single-image.jpg"],
		},
	];
	render(<Slideshow propertyData={propertyData} />);

	// Verify the image is displayed
	const imageElement = screen.getByAltText(/Single Image Property - Image 1/i);
	expect(imageElement).toBeInTheDocument();

	// Verify navigation arrows are not present when only one image
	const noArrows = screen.queryByAltText(/Précédent/i);
	expect(noArrows).not.toBeInTheDocument();

	const noNextButton = screen.queryByAltText(/Suivant/i);
	expect(noNextButton).not.toBeInTheDocument();
});

// Verifies that the counter is not rendered when there is only one image
test("renders slideshow with only one image, image counter does not exist", () => {
	const propertyData = [
		{
			title: "Single Image Property",
			pictures: ["single-image.jpg"],
		},
	];
	render(<Slideshow propertyData={propertyData} />);
	const imageElement = screen.getByAltText(/Single Image Property - Image 1/i);
	expect(imageElement).toBeInTheDocument();

	// Verify counter is not present
	const imageCounter = screen.queryByText(/1\/1/i);
	expect(imageCounter).not.toBeInTheDocument();
});

// Helper function to simulate different screen sizes for responsive tests
// This allows testing how the slideshow behaves on different devices

function setupMatchMedia(width) {
	window.matchMedia.mockImplementation((query) => {
		const minWidthMatch = query.match(/\(min-width:\s*(\d+)px\)/);
		const maxWidthMatch = query.match(/\(max-width:\s*(\d+)px\)/);

		let matches = false;

		// Determine if the current simulated width matches the media query
		if (minWidthMatch) {
			const minWidth = parseInt(minWidthMatch[1], 10);
			matches = width >= minWidth;
		} else if (maxWidthMatch) {
			const maxWidth = parseInt(maxWidthMatch[1], 10);
			matches = width <= maxWidth;
		}

		return {
			matches,
			media: query,
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
			dispatchEvent: jest.fn(),
			addListener: jest.fn(),
			removeListener: jest.fn(),
		};
	});
}
// Reset mock implementations between tests to avoid test interference
afterEach(() => {
	jest.clearAllMocks();

	// Reset matchMedia mock to default implementation
	window.matchMedia.mockImplementation((query) => {
		return {
			matches: false,
			media: query,
			onchange: null,
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
			dispatchEvent: jest.fn(),
			addListener: jest.fn(),
			removeListener: jest.fn(),
		};
	});
});

// Verifies responsive behavior of the image counter
// The counter should not be displayed on mobile devices
test("image counter is not displayed on mobile devices", () => {
	setupMatchMedia(375); // Simulate mobile width
	const propertyData = [
		{
			title: "Test Property",
			pictures: ["image1.jpg", "image2.jpg", "image3.jpg"],
		},
	];

	render(<Slideshow propertyData={propertyData} />);

	// Verify counter is not in the document on mobile
	const imageCounter = screen.queryByText(/1\/3/i);
	expect(imageCounter).not.toBeInTheDocument();
});

// Verifies responsive behavior of the image counter
// The counter should be displayed on tablet and desktop devices
test("image counter is displayed on tablet devices", () => {
	setupMatchMedia(768); // Simulate tablet width
	const propertyData = [
		{
			title: "Test Property",
			pictures: ["image1.jpg", "image2.jpg", "image3.jpg"],
		},
	];
	render(<Slideshow propertyData={propertyData} />);

	// Verify counter is visible on tablet
	const imageCounter = screen.getByText(/1\/3/i);
	expect(imageCounter).toHaveStyle("display:block");
});

test("image counter is displayed on desktop devices", () => {
	setupMatchMedia(1440); // Simulate desktop width
	const propertyData = [
		{
			title: "Test Property",
			pictures: ["image1.jpg", "image2.jpg", "image3.jpg"],
		},
	];
	render(<Slideshow propertyData={propertyData} />);

	// Verify counter is visible on desktop
	const imageCounter = screen.getByText(/1\/3/i);
	expect(imageCounter).toHaveStyle("display: block");
});
