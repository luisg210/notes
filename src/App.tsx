import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { AppRouter } from "./router/AppRouter";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>{" "}
      wgw gol []
    </Provider>
  );
}

export default App;
