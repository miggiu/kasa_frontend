import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.scss";

import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ApartmentPage from "./pages/ApartmentPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

/**
 * Router configuration defines the application's navigation structure
 * Each route object maps a URL path to a specific component
 * The errorElement provides fallback UI for route errors
 */
const router = createBrowserRouter([
	{
		path: "/", // Home page path
		element: <HomePage />, // Component to render at this path
		errorElement: <ErrorPage />, // Fallback for errors in this route
	},
	{
		path: "/about", // About page path
		element: <AboutPage />, // Component to render at this path
		errorElement: <ErrorPage />, // Fallback for errors
	},
	{
		path: "/apartment/:id", // Dynamic route with URL parameter
		// The :id syntax creates a parameter that can be accessed
		// via useParams() in the ApartmentPage component
		element: <ApartmentPage />, // Component to render at this path
		errorElement: <ErrorPage />, // Fallback for errors (e.g., invalid ID)
	},
]);

/**
 * Application entry point
 * Creates a root using React 18's concurrent rendering API
 * Renders the RouterProvider with our configured routes
 * This replaces the older ReactDOM.render() method
 */
createRoot(document.getElementById("root")).render(
	<RouterProvider router={router} />
);
