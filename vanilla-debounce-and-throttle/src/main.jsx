import React from "react";
import ReactDOM from "react-dom/client";
import Debounce from "./Debounce.jsx";
import Throttle from "./Throttle.jsx";

import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="main">
    <h1>Debounce vs Throttle</h1>
    <Debounce />
    <Throttle />
    </div>
  </React.StrictMode>
);
