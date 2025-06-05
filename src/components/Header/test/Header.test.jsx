import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect } from "@jest/globals";
import { userEvent } from "@testing-library/user-event";
import { Link, useLocation } from "react-router";
import Header from "../Header.jsx";

const user = userEvent.setup();

test("renders Header component with logo and navigation links", () => {
    render(<Header className="test-header" />);

    const logo = screen.getByAltText(/Kasa Logo/i);
    expect(logo).toBeInTheDocument();

    const homeLink = screen.getByText(/Accueil/i);
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByText(/A Propos/i);
    expect(aboutLink).toBeInTheDocument();
});

test("active navigation link is underlined", async () => {
    render(<Header className="test-header" />);

    window.history.pushState({}, "Home", "/");
    const homeLink = screen.getByText(/Accueil/i);
    expect(homeLink).toHaveClass("current");

    const aboutLink = screen.getByText(/A Propos/i);
    await user.click(aboutLink);
    expect(aboutLink).not.toHaveClass("current");
});

test("clicking on logo navigates to home page", async () => {
    render(<Header className="test-header" />);
    const logo = screen.getByAltText(/Kasa Logo/i);
    expect(logo).toBeInTheDocument();
    const homeLink = screen.getByText(/Accueil/i);

    await user.click(logo);
    expect(window.location.pathname).toBe("/") && (homeLink).toBeInTheDocument() && expect(homeLink).toHaveClass("current");
    ;
});

test ("clicking on 'A Propos' navigates to about page", async () => {
    render(<Header className="test-header" />);
    const aboutLink = screen.getByText(/A Propos/i);
    expect(aboutLink).toBeInTheDocument();  

    await user.click(aboutLink);
    expect(window.location.pathname).toBe("/about") && expect(aboutLink).toHaveClass("current");   
});


//TODO: fix routing 