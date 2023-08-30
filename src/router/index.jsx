import { createBrowserRouter } from "react-router-dom";
import Root from "pages/Root.jsx";
import DefaultError from "pages/error/Default.jsx";
import Landing from "pages/landing/Landing.jsx";
import Products from "pages/products/Products.jsx";
import ProductDetail from "pages/productDetail/ProductDetail.jsx";
import { APIHydro } from "src/api/index.js";
import { actionsApp } from "src/redux/reducers";
import { SignIn, SignUp } from "src/pages/session";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <DefaultError />,
    laoder: () => {
      APIHydro.getProducts().then((res) => actionsApp.loadProducts(res.data));
      // El elemento root carga data necesaria para la app
      //Se guarda esa data para consumirla desde redux
    },
    children: [
      { path: "/", element: <Landing />, index: true },
      { path: "/products", element: <Products /> },
      {
        path: "/productDetail/:id",
        element: <ProductDetail />,
        loader: ({ params }) => {
          return APIHydro.getProductDetail(params.id);
        },
      },
      {
        path: "/signIn",
        element: <SignIn />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
    ],
  },
]);
