import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";

import { getRouter } from "./router";
import "./styles.css";

// React Router owns metadata after the static document has loaded.
document.querySelectorAll("[data-prerender]").forEach(node => node.remove());
const router = getRouter();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);