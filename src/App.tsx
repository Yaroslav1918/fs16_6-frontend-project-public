import { StyledEngineProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <Provider store={store}>
          <RouterProvider router={router} />
          <ToastContainer position="top-center" autoClose={4000} />
        </Provider>
      </StyledEngineProvider>
    </>
  );
};

export default App;
