import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root.jsx";
import DefaultError from "../pages/error/default.jsx";
import Landing from "../pages/landing/Landing.jsx";
import Products from "../pages/products/Products.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <DefaultError />,
    laoder: "",
    children: [
      { path: "/", element: <Landing /> },
      { path: "/products", element: <Products /> },
    ],
  },
]);
