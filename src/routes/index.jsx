import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { APIHydro } from "src/api/index.js";
import { actionsApp } from "src/redux/reducers";
import { useAuth } from "src/provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Root from "pages/Root.jsx";
import DefaultError from "pages/error/Default.jsx";
import Landing from "pages/landing/Landing.jsx";
import Products from "pages/products/Products.jsx";
import ProductDetail from "src/pages/productDetail/ProductDetail.jsx";
import { SignIn, SignUp } from "src/pages/session";

export function Routes() {
  const { token } = useAuth();

  const routesForPublic = [
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
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/userProfile",
          element: <div>User profile</div>,
        },
      ],
    },
  ];

  const router = createBrowserRouter([...routesForPublic, ...(!token ? routesForAuthenticatedOnly : [])]);

  return <RouterProvider router={router} />;
}
