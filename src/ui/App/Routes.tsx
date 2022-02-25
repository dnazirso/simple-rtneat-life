import { useRoutes } from "react-router-dom";
import PetriBox from "../PetriBox";
import Settings from "../Settings";

export default function Routes() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Settings />,
    },
    {
      path: "/petri",
      element: <PetriBox />,
    },
  ]);
  return routes;
}
