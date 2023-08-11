import {createBrowserRouter} from 'react-router-dom'
import { Navbar,  } from '../pages/root/Navbar';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <ErrorPage />,
    laoder: '',
    children: [
      { path: "/", element: <Landing />},
      { path: "/products", element: <Products /> },
    ],
  },
]);

