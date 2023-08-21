import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/Route.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer position="top-right" />
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>
);
