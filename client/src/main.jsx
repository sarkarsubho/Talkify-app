import { CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <CssBaseline />
      {/* using preventDefault on app context menu to prevent the right click behavior in the app  */}
      <div onContextMenu={(e) => e.preventDefault()}>
        <App />
      </div>
    </HelmetProvider>
  </React.StrictMode>
);
