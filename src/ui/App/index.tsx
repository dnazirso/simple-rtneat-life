import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../core/store";
import Routes from "./Routes";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}
