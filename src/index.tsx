import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./core/store";
import { Home } from "./pages/home";
import reportWebVitals from "./reportWebVitals";
import { SnackbarProvider } from "notistack";
import { ToastConfigurator } from "./utils/helpers/ToastConfigurator";
import { Router } from "./Routes";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <ToastConfigurator />
        <Router />
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
