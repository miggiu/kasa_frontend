import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect } from "@jest/globals";
import { userEvent } from "@testing-library/user-event";
import Slideshow from "../Slideshow.jsx";

const user = userEvent.setup();


test ("renders loading state when propertyData is empty", () => {
    render(<Slideshow propertyData={[]} />);
    const loadingText = screen.getByText(/Chargement de la location.../i);
    expect(loadingText).toBeInTheDocument();
});

test("renders no images state when propertyData has no pictures", () => {
    const propertyData = [{ title: "Test Property", pictures: [] }];
    render(<Slideshow propertyData={propertyData} />);
    const noImagesText = screen.getByText(/Aucune image disponible/i);
    expect(noImagesText).toBeInTheDocument();
});

test ("renders slideshow with images", () => {
    const propertyData = [
        {
            title: "Test Property",
            pictures: [
                "image1.jpg",
                "image2.jpg",
                "image3.jpg"
            ]
        }
    ];
    render(<Slideshow propertyData={propertyData} />);
    
    const imageElement = screen.getByAltText(/Test Property - Image 1/i);
    expect(imageElement).toBeInTheDocument();
});

test ("click on right arrow changes to next image", async () => {
    const propertyData = [
        {
            title: "Test Property",
            pictures: [
                "image1.jpg",
                "image2.jpg",
                "image3.jpg"
            ]
        }
    ];
    render(<Slideshow propertyData={propertyData} />);
    
    const nextButton = screen.getByAltText(/Suivant/i);
    expect(nextButton).toBeInTheDocument();
    
    await user.click(nextButton);
   
    
    const nextImageElement = screen.getByAltText(/Test Property - Image 2/i);
    expect(nextImageElement).toBeInTheDocument();
});

test ("click on left arrow changes to previous image", async () => {
    const propertyData = [
        {
            title: "Test Property",
            pictures: [
                "image1.jpg",
                "image2.jpg",
                "image3.jpg"
            ]
        }
    ];
    render(<Slideshow propertyData={propertyData} />);

     const nextButton = screen.getByAltText(/Suivant/i);
        await user.click(nextButton);
    
    const previousButton = screen.getByAltText(/Précédent/i);
    expect(previousButton).toBeInTheDocument();
    

       await user.click(previousButton);
    
    const previousImageElement = screen.getByAltText(/Test Property - Image 1/i);
    expect(previousImageElement).toBeInTheDocument();
});

test ("image counter displays current image index", () => {
    const propertyData = [
        {
            title: "Test Property",
            pictures: [
                "image1.jpg",
                "image2.jpg",
                "image3.jpg",
                "image4.jpg",
                "image5.jpg"
            ]
        }
    ];
    render(<Slideshow propertyData={propertyData} />);
    
    const imageCounter = screen.getByText(/1\/5/i);
    expect(imageCounter).toBeInTheDocument();
});

test ("clicking on right arrow updates image counter to next number", async () => {
    const propertyData = [
        {
            title: "Test Property",
            pictures: [
                "image1.jpg",
                "image2.jpg",
                "image3.jpg"
            ]
        }
    ];
    render(<Slideshow propertyData={propertyData} />);
    
    const nextButton = screen.getByAltText(/Suivant/i);
    expect(nextButton).toBeInTheDocument();
    
    await user.click(nextButton);
    
    const updatedImageCounter = screen.getByText(/2\/3/i);
    expect(updatedImageCounter).toBeInTheDocument();
});

test ("clicking on left arrow updates image counter to previous number", async () => {
    const propertyData = [
        {
            title: "Test Property",
            pictures: [
                "image1.jpg",
                "image2.jpg",
                "image3.jpg"
            ]
        }
    ];
    render(<Slideshow propertyData={propertyData} />);
    
    const nextButton = screen.getByAltText(/Suivant/i);
    await user.click(nextButton);
    
    const previousButton = screen.getByAltText(/Précédent/i);
    expect(previousButton).toBeInTheDocument();
    
    await user.click(previousButton);
    
    const updatedImageCounter = screen.getByText(/1\/3/i);
    expect(updatedImageCounter).toBeInTheDocument();
});

test("clicking on right arrow loops back to first image when at last image", async () => {
    const propertyData = [
        {
            title: "Test Property",
            pictures: [
                "image1.jpg",
                "image2.jpg",
                "image3.jpg"
            ]
        }
    ];
    render(<Slideshow propertyData={propertyData} />);
    
    const nextButton = screen.getByAltText(/Suivant/i);
    expect(nextButton).toBeInTheDocument();
    
    await user.click(nextButton);
    await user.click(nextButton);
    await user.click(nextButton);
    
    const loopedImageElement = screen.getByAltText(/Test Property - Image 1/i);
    expect(loopedImageElement).toBeInTheDocument();
});

test("clicking on left arrow loops back to last image when at first image", async () => {
    const propertyData = [
        {
            title: "Test Property",
            pictures: [
                "image1.jpg",
                "image2.jpg",
                "image3.jpg"
            ]
        }
    ];
    render(<Slideshow propertyData={propertyData} />);
    
    const previousButton = screen.getByAltText(/Précédent/i);
    expect(previousButton).toBeInTheDocument();
    
    await user.click(previousButton);
    
    const loopedImageElement = screen.getByAltText(/Test Property - Image 3/i);
    expect(loopedImageElement).toBeInTheDocument();
});

test("renders slideshow with only one image, arrows do not exist", () => {
    const propertyData = [
        {
            title: "Single Image Property",
            pictures: ["single-image.jpg"]
        }
    ];
    render(<Slideshow propertyData={propertyData} />);
    
    const imageElement = screen.getByAltText(/Single Image Property - Image 1/i);
    expect(imageElement).toBeInTheDocument();
    
    const noArrows = screen.queryByAltText(/Précédent/i);
    expect(noArrows).not.toBeInTheDocument();
    
    const noNextButton = screen.queryByAltText(/Suivant/i);
    expect(noNextButton).not.toBeInTheDocument();
});

