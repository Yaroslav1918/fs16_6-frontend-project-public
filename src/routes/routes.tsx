import { createBrowserRouter } from "react-router-dom";

import NotFoundPage from "../pages/NotFoundPage";
import Root from "../components/root/Root";
import Home from "../pages/Home";
import CartPage from "../pages/CartPage";
import ProfilePage from "../pages/ProfilePage";
import SignIn from "../components/signIn";
import SignUp from "../components/signUp";
import ProductPage from "../pages/ProductPage";
import CategoriesList from "../components/categoriesList";
import ScrollToTop from "../utils/scrollToTop";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <Root />
      </>
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "product/:id",
        element: <ProductPage />,
      },
      {
        path: "signIn",
        element: <SignIn />,
      },
      {
        path: "products",
        element: <CategoriesList />,
      },
      {
        path: "signUp",
        element: <SignUp />,
      },
    ],
  },
]);
