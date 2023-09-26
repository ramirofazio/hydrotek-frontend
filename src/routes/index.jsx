import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { APIHydro } from "src/api/index.js";
import { actionsApp, actionsAuth } from "src/redux/reducers";
import { ProtectedRoute } from "./ProtectedRoute";
import Root from "pages/Root.jsx";
import DefaultError from "pages/error/Default.jsx";
import Landing from "pages/landing/Landing.jsx";
import Products from "pages/products/Products.jsx";
import ProductDetail from "src/pages/productDetail/ProductDetail.jsx";
import { SignIn, SignUp } from "src/pages/session";
import { Profile } from "src/pages/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ShoppingCart from "src/pages/shoppingCart/ShoppingCart";

export function Routes() {
  const dispatch = useDispatch();
  const { token } = useSelector((s) => s.auth);

  useEffect(() => {
    // token --> OK -->

    dispatch(actionsAuth.setToken());
  }, []);

  const publicRoutes = [
    {
      path: "/",
      element: <Root />,
      errorElement: <DefaultError />,
      lader: () => {
        APIHydro.getProducts().then((res) => actionsApp.loadProducts(res.data));
        // El elemento root carga data necesaria para la app
        // Se guarda esa data para consumirla desde redux
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
          path: "shoppingCart",
          element: <ShoppingCart/>
        }
      ],
    },
  ];

  const onlyNotAuthRoutes = [
    {
      path: "/user",
      errorElement: <DefaultError />,
      element: <Root />,
      children: [
        {
          path: "/user/signIn",
          element: <SignIn />,
        },
        {
          path: "/user/signUp",
          element: <SignUp />,
        },
      ],
    },
  ];

  const onlyAuthRoutes = [
    {
      path: "/user",
      errorElement: <DefaultError />,
      element: <ProtectedRoute token={token} />,
      children: [
        {
          path: "/user/profile",
          element: <Profile />,
        },
      ],
    },
  ];

  const router = createBrowserRouter([...publicRoutes, ...onlyAuthRoutes, ...(!token ? onlyNotAuthRoutes : onlyNotAuthRoutes /* !CAMBIAR POOR ARR VACIO AL TERMINAR */)]);

  return <RouterProvider router={router} />;
}
