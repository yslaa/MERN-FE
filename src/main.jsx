import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "./state/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import { RESOURCE } from "@/constants";

createRoot(document.getElementById(RESOURCE.ROOT)).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ToastContainer />
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
);
