import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeContextProvider } from "./utils/theme/ThemeContextProvider";

import App from "./App";
import "./styles/globalStyles.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID ?? ""}
    >
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
