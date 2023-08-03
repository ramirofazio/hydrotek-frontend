import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Landing } from "./pages/landing/Landing,jsx";
import { Navbar } from "./pages/Navbar,jsx";
import { Home } from "./pages/home/Home,jsx";
import ErrorPage from "./pages/ErrorPage,jsx";
//! Root seria la navbar, dentro del "Outlet" se renderizan los children.
//! Leer docs de react-router-dom para usar loaders y actions dependiendo el proyecto.
//? https://reactrouter.com/en/main/start/tutorial

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/home", element: <Home /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
