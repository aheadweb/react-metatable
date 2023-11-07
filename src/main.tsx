import React from "react";
import ReactDOM from "react-dom/client";
import { BaseCellExample } from "./table-demo";

const rootApp = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(rootApp).render(
  <React.StrictMode>
    <section>
      <h1>Base cell example</h1>
      <BaseCellExample />
    </section>
    <hr />
  </React.StrictMode>
);
