import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "../../core/AppContext";
import Routes from "./Routes";

export default function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AppContextProvider>
  );
}
