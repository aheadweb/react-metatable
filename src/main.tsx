import React from "react";
import ReactDOM from "react-dom/client";
import { BaseCellExample } from "./demo";

const rootApp = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(rootApp).render(
  <React.StrictMode>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Table with basic cells and features</h1>
      <BaseCellExample />
    </div>
  </React.StrictMode>
);
