import React from "react";
import { render, screen } from "@testing-library/react";
import { expect, test, describe } from "@jest/globals";
import userEvent from "@testing-library/user-event";
import ApartmentInformation from "../components/ApartmentInformation/ApartmentInformation.jsx";
import Collapse from "../components/Collapse/Collapse.jsx";
import CollapseItem from "../components/Collapse/CollapseItem.jsx";

// Comprehensive mock apartment data that simulates the real data structure
// This includes all fields needed to test the component thoroughly:
// - Basic apartment details (id, title, location)
// - Keyword tags
// - Host information with name and picture
// - Rating (as a string, to test proper type conversion)
// - Full description text for testing the expandable section
// - Equipment list to verify amenities display
const mockApartment = {
	id: "c67ab8a7",
	title: "Appartement cosy",
	location: "Paris, France",
	tags: ["Moderne", "Confortable", "Centre-ville"],
	host: {
		name: "John Doe",
		picture: "https://s3.image.com/host.jpg",
	},
	rating: "4",
	description:
		"Superbe appartement avec vue panoramique sur la ville. Idéalement situé au cœur de Paris, cet espace lumineux vous offre tout le confort nécessaire pour un séjour inoubliable.",
	equipments: ["Cuisine", "Wi-Fi", "Télévision", "Lave-linge"],
};

// TestWrapper component combines ApartmentInformation with Collapse components
// This mirrors how these components are used together in the actual application
// We need this compound component to test the integration between them,
// particularly how the collapsible content sections work when expanded
const TestWrapper = ({ propertyData }) => (
	<>
		<ApartmentInformation propertyData={propertyData} />
		<Collapse>
			<CollapseItem
				title='Description'
				content={propertyData.description || ""}
			/>
			<CollapseItem
				title='Équipements'
				content={
					<ul>
						{propertyData.equipments.map((item, index) => (
							<li key={index}>{item}</li>
						))}
					</ul>
				}
			/>
		</Collapse>
	</>
);

describe("ApartmentInformation", () => {
	//Verifies the component displays the appartment title
	test("renders apartment title correctly", () => {
		render(<ApartmentInformation propertyData={mockApartment} />);
		expect(screen.getByText("Appartement cosy")).toBeInTheDocument();
	});

	//Verifies the component displays the appartment location
	test("renders location correctly", () => {
		render(<ApartmentInformation propertyData={mockApartment} />);
		expect(screen.getByText("Paris, France")).toBeInTheDocument();
	});

	//Verifies the component displays the appartment tags
	test("renders all tags", () => {
		render(<ApartmentInformation propertyData={mockApartment} />);
		mockApartment.tags.forEach((tag) => {
			expect(screen.getByText(tag)).toBeInTheDocument();
		});
	});

	// Verifies the integration between ApartmentInformation and Collapse
	// It ensures equipment details are visible when the user expands that section
	test("displays correct equipment list when expanded", async () => {
		const user = userEvent.setup();
		render(<TestWrapper propertyData={mockApartment} />);

		// Simulate user clicking to expand the equipment section
		const equipmentHeader = screen.getByText(/équipements/i);
		await user.click(equipmentHeader);

		// Check each equipment item is displayed
		mockApartment.equipments.forEach((equipment) => {
			expect(screen.getByText(equipment)).toBeInTheDocument();
		});
	});

	// Verifies the integration between ApartmentInformation and Collapse
	// It ensures the description is displayed correctly when the user expands that section
	test("displays description correctly when expanded", async () => {
		const user = userEvent.setup();
		render(<TestWrapper propertyData={mockApartment} />);

		// Simulate user expanding the description section
		const descriptionHeader = screen.getByText(/description/i);
		await user.click(descriptionHeader);

		// Check for text fragments from both the beginning and end
		// of the description to ensure the complete text is shown
		expect(
			screen.getByText(/Superbe appartement avec vue panoramique/i)
		).toBeInTheDocument();
		expect(screen.getByText(/séjour inoubliable/i)).toBeInTheDocument();
	});

	//  Verifies the correct number of stars and their active/inactive states
	test("renders correct rating", () => {
		const { container } = render(
			<ApartmentInformation propertyData={mockApartment} />
		);

		const stars = container.querySelectorAll(".fa-star");
		expect(stars.length).toBe(5);

		// Check that the correct number of stars are active/inactive
		const activeStars = Array.from(stars).filter((star) =>
			star.classList.contains("star-active")
		);
		const inactiveStars = Array.from(stars).filter((star) =>
			star.classList.contains("star-inactive")
		);

		// For a rating of 4, we expect 4 active stars and 1 inactive star
		expect(activeStars.length).toBe(4);
		expect(inactiveStars.length).toBe(1);
	});

	// Verifies component's resilience with incompete data
	test("handles missing data gracefully", () => {
		// Create a mock with minimal required data and empty values for optional fields
		const incompleteApartment = {
			id: "c67ab8a7",
			title: "Appartement cosy",
			location: "Paris, France",
			tags: [],
			host: {
				name: "",
				picture: "",
			},
			rating: "0",
			equipments: [],
		};
		// Component should render without errors even with minimal data
		render(<ApartmentInformation propertyData={incompleteApartment} />);
		expect(screen.getByText("Appartement cosy")).toBeInTheDocument();
	});
});
