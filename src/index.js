import React from "react";
import ReactDOM from "react-dom/client";
import "./bootstrap.min.css";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/Store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
  <Provider store={store}>
    <App />
  </Provider>
);
