import React from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { ThemeContextProvider } from "./utils/theme/ThemeContextProvider";
import App from "./App";
import "./styles/globalStyles.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="891482245290-ad2o62u8gf7tfsh4dif7odg3sgm07tju.apps.googleusercontent.com">
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
