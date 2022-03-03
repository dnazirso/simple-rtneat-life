import { useRoutes } from "react-router-dom";
import Layout from "../Layout";
import Settings from "../Settings";

export default function Routes() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Settings />,
    },
    {
      path: "/petri",
      element: <Layout />,
    },
  ]);
  return routes;
}
