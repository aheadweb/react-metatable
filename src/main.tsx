import React from "react";
import ReactDOM from "react-dom/client";
import { BaseCellExample } from "./demo";

const rootApp = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(rootApp).render(
  <React.StrictMode>
    <BaseCellExample />
  </React.StrictMode>
);
