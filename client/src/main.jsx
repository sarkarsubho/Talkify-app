import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { CssBaseline } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      {/* <BrowserRouter> */}
        <CssBaseline />
        {/* using preventDefault on app context menu to prevent the right click behavior in the app  */}
        <div onContextMenu={(e) => e.preventDefault()}>
          <App />
        </div>
      {/* </BrowserRouter> */}
    </HelmetProvider>
  </React.StrictMode>
);
