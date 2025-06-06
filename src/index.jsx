import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.scss";

import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ApartmentPage from "./pages/ApartmentPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";


const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/about",
		element: <AboutPage />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/apartment/:id",
		element: <ApartmentPage />,
		errorElement: <ErrorPage />,
	}
]);

createRoot(document.getElementById("root")).render(
	<RouterProvider router={router} />
);

