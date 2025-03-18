import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../screens/Home";
import About from "../screens/About";
import Service from "../screens/Service";
import Gallery from "../screens/Gallery";
import NotFound from "../screens/NotFound";
import Upcoming from "../screens/Upcoming";
import AppointmentPage from "../screens/AppointmentPage";
import Event from "../components/events/Event";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/services",
        element: <Service />,
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
      {
        path: "/events",
        element: <Upcoming />,
      },
      {
        path: "/appointment",
        element: <AppointmentPage />,
      },
      {
        path: "/events/:eventId",
        element: <Event />,
      },
      {
        path: "/tickets/:eventId",
        element: <Event />,
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
