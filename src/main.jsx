import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const script = document.createElement("script");
script.src = "https://gc.zgo.at/count.js";
script.async = true;
script.setAttribute(
  "data-goatcounter",
  "https://anmolsrivastava073.goatcounter.com/count"
);

document.head.appendChild(script);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
