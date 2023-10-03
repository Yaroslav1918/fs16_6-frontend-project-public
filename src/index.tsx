import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeContextProvider } from "./utils/theme/ThemeContextProvider";

import App from "./App";
import "./styles/globalStyles.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </React.StrictMode>
);
