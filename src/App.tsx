import {
  StyledEngineProvider,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";

import store from "./redux/store";
import { useThemeContext } from "./utils/theme/ThemeContextProvider";

const App = () => {
  const { theme } = useThemeContext();
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StyledEngineProvider injectFirst>
          <Provider store={store}>
            <RouterProvider router={router} />
            <ToastContainer position="top-center" autoClose={4000} />
          </Provider>
        </StyledEngineProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
