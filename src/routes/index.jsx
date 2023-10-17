import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { NotAuthRoute } from "./NotAuthRoute";
import Root from "pages/Root.jsx";
import DefaultError from "pages/error/Default.jsx";
import Landing from "pages/landing/Landing.jsx";
import Products from "pages/products/Products.jsx";
import ProductDetail from "src/pages/productDetail/ProductDetail.jsx";
import { SignIn, SignUp } from "src/pages/session";
import { OrderDetail, Profile } from "src/pages/user";
import { Blog, PostDetail } from "src/pages/blog";
import { AboutUs } from "src/pages/aboutUs";
import ShoppingCart from "src/pages/shoppingCart/ShoppingCart";
import { autoLoginLoader, notAuthLoader, blogLoader } from "./loaders";
import { APIHydro } from "src/api";

export function Routes() {
  const publicRoutes = [
    {
      path: "/",
      element: <Root />,
      errorElement: <DefaultError />,
      loader: autoLoginLoader,
      children: [
        { path: "/", element: <Landing />, index: true },
        { path: "/products", element: <Products /> },
        {
          path: "/productDetail/:id", // TODO: Cuando tengamos data real utilizar el loader con el param de :id
          element: <ProductDetail />, // * Por el momento se rompe
          // loader: ({ params }) => {
          //   return APIHydro.getProductDetail(params.id);
          // },
        },
        {
          path: "shoppingCart",
          element: <ShoppingCart />,
        },
        {
          path: "/blog",
          children: [
            {
              path: "/blog",
              loader: blogLoader,
              element: <Blog />,
              index: true,
            },
            {
              path: "/blog/:postId",
              element: <PostDetail />,
              loader: async ({ params }) => {
                const { data } = await APIHydro.getPostDetail(params.postId);
                return data;
              },
            },
          ],
        },
        { path: "/AboutUs", element: <AboutUs /> },
      ],
    },
  ];

  const onlyNotAuthRoutes = [
    // * Tener en cuenta que al cambiar cualquiera de estos paths tambien hay que cambiarlos en la google_console y en el backend
    {
      path: "/",
      errorElement: <DefaultError />,
      loader: notAuthLoader,
      element: <NotAuthRoute />,
      children: [
        {
          path: "session/signIn",
          element: <SignIn />,
        },
        {
          path: "session/signUp",
          element: <SignUp />,
        },
      ],
    },
  ];

  const onlyAuthRoutes = [
    {
      path: "/",
      errorElement: <DefaultError />,
      element: <ProtectedRoute />,
      loader: autoLoginLoader, // * los loaders tienen que devolver una promesa
      children: [
        {
          path: "/user/profile",
          children: [
            {
              path: "/user/profile",
              element: <Profile />,
              index: true,
            },
            {
              path: "order/:orderId",
              element: <OrderDetail />,
            },
          ],
        },
      ],
    },
  ];

  const router = createBrowserRouter([...publicRoutes, ...onlyAuthRoutes, ...onlyNotAuthRoutes]);

  return <RouterProvider router={router} />;
}
