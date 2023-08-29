import { createBrowserRouter } from "react-router-dom";
import Root from "pages/Root.jsx";
import DefaultError from "pages/error/Default.jsx";
import Landing from "pages/landing/Landing.jsx";
import Products from "pages/products/Products.jsx";
import ProductDetail from "pages/productDetail/ProductDetail.jsx";
import { APIHydro } from "src/api/index.js";
import { actionsApp } from "src/redux/reducers";

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
        path: "/productDetail",
        // path: "/productDetail/:id", // TODO: Cuando tengamos data real utilizar el loader con el param de :id
        element: <ProductDetail />, // * Por el momento se rompe
        // loader: ({ params }) => {
        //   return APIHydro.getProductDetail(params.id);
        // },
      },
    ],
  },
]);
