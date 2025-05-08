import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.scss";

import Homepage from "./pages/Home.jsx";
import AboutPage from "./pages/About.jsx";
import ApartmentPage from "./pages/Apartment.jsx";
import ErrorPage from "./pages/Error.jsx";

// localhost:5174/

const router = createBrowserRouter([
	{
	  path: "/",
	  element: <Homepage />,
	  errorElement: <ErrorPage />,
	},
	{
	  path: "/about",
	  element: <AboutPage />,
	  errorElement: <ErrorPage />,
	},
	{
	  path: "/apartment",
	  element: <ApartmentPage />,
	  errorElement: <ErrorPage />,
	}
  ]);

createRoot(document.getElementById("root")).render(
	<RouterProvider router={router} />
);

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;
