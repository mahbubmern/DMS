import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./app/store.js";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";

import "./assets/frontend/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/frontend/plugins/fontawesome/css/fontawesome.min.css";
import "./assets/frontend/plugins/fontawesome/css/all.min.css";
import "./assets/frontend/css/feathericon.min.css";
import "./assets/frontend/plugins/morris/morris.css";
import "./index.css";
import "./assets/frontend/css/custom.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
