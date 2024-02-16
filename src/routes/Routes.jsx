import { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute, NotAuthRoute, AdminRoutes } from "./index";
import {
  autoLoginLoader,
  notAuthLoader,
  blogLoader,
  productsLoader,
  productDetailLoader,
  allProductsLoader,
  allUsersLoader,
  getLastUsdPrice,
  featuredProductsLoader,
  ordersLoader,
  oneOrderLoader,
  getAllOrders,
  filteredProductsLoader,
  getPromotionalCodes,
} from "./loaders";
import DefaultError from "pages/error/Default.jsx";
import Products from "pages/products/Products.jsx";
import ProductDetail from "src/pages/productDetail/ProductDetail.jsx";
import { SignIn, SignUp } from "src/pages/session";
import { OrderDetail, Profile } from "src/pages/user";
import { Blog, PostDetail } from "src/pages/blog";
import { AboutUs } from "src/pages/aboutUs";
import ShoppingCart from "src/pages/shoppingCart/ShoppingCart";
import { APIHydro } from "src/api";
import { Aurora } from "src/components";
import { Dashboard } from "src/pages/dashboard";
const Landing = lazy(() => import("pages/landing/Landing.jsx"));
const Root = lazy(() => import("pages/Root.jsx"));

export function Routes() {
  const publicRoutes = [
    {
      path: "/",
      element: (
        <Suspense fallback={<Aurora />}>
          <Root />
        </Suspense>
      ),
      errorElement: <DefaultError />,
      loader: autoLoginLoader,
      children: [
        {
          path: "/",
          element: <Landing />,
          loader: async () => {
            // * Rompera hasta mergear PR del back
            return featuredProductsLoader();
          },
          index: true,
        },
        {
          path: "/products/:pag",
          loader: async ({ params }) => {
            if (params.pag.length < 4) {
              return productsLoader(params.pag);
            } else {
              // ? si entra en este if es por que se lo redirigio desde Categories.jsx
              const query = params.pag.split("=");
              return filteredProductsLoader(query[1]);
            }
          },
          element: <Products />,
        },
        {
          path: "/productDetail/:id",
          element: <ProductDetail />,
          loader: productDetailLoader,
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
              path: "/user/profile/:userId",
              //   loader: async ({ params }) => {
              //     let dictionary = {};
              //     const { data } = await APIHydro.getSavedPosts(params.userId);
              //     const posts = data?.map((p) => {
              //       dictionary[p.postId] = p.postId;
              //       return p.post;
              //     });
              //     return {
              //       posts,
              //       dictionary,
              //     };
              //   },
              //! Desactivo porque los post no estan integrados todavia
              loader: ({ params }) => {
                return ordersLoader(params.userId);
              },
              element: <Profile />,
              index: true,
            },
            {
              path: "/user/profile/:userId/order/:orderId",
              element: <OrderDetail />,
              loader: ({ params }) => {
                return oneOrderLoader(params.orderId);
              },
            },
          ],
        },
      ],
    },
  ];

  const onlyAdminRoutes = [
    {
      path: "/",
      errorElement: <DefaultError />,
      element: <AdminRoutes />,
      loader: autoLoginLoader, // * los loaders tienen que devolver una promesa
      children: [
        {
          path: "/admin",
          children: [
            {
              path: "/admin/dashboard",
              element: <Dashboard />,
              loader: async () => {
                const [products, users, lastUsdPrice, allOrders, promotionalCodes] = await Promise.all([
                  allProductsLoader(), // TODO Refactorizar en childrens de la ruta "/admin/dashboard" para un uso mas efectivo
                  allUsersLoader(),
                  getLastUsdPrice(),
                  getAllOrders(),
                  getPromotionalCodes(),
                ]);
                return { products, users, lastUsdPrice, allOrders, promotionalCodes };
              },
              index: true,
            },
          ],
        },
      ],
    },
  ];

  const router = createBrowserRouter([...publicRoutes, ...onlyAuthRoutes, ...onlyNotAuthRoutes, ...onlyAdminRoutes]);

  return <RouterProvider router={router} />;
}
