import { createBrowserRouter } from "react-router-dom";

import NotFoundPage from "../pages/NotFoundPage";
import Root from "../components/root/Root";
import Home from "../pages/HomePage";
import CartPage from "../pages/CartPage";
import ProfilePage from "../pages/ProfilePage";
import SignIn from "../components/signIn";
import SignUp from "../components/signUp";
import ProductPage from "../pages/ProductPage";
import CategoriesList from "../components/categoriesList";
import ScrollToTop from "../utils/scrollToTop";
import DashBoardPage from "../pages/DashBoardPage";
import LogoutTimer from "../components/logoutTimer";
import PaymentPage from "../pages/PaymentPage";
import OrderHistoryPage from "../pages/OrderHistoryPage";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <LogoutTimer />
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
        element: <ProtectedRoute element={<ProfilePage />} />,
      },
      {
        path: "product/:_id",
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
        path: "products/:categoryName",
        element: <CategoriesList />,
      },
      {
        path: "signUp",
        element: <SignUp />,
      },
      {
        path: "dashboard",
        element: <ProtectedRoute isAdmin={true} element={<DashBoardPage />} />,
      },
      {
        path: "payment",
        element: <ProtectedRoute element={<PaymentPage />} />,
      },
      {
        path: "order",
        element: <ProtectedRoute element={<OrderHistoryPage />} />,
      },
    ],
  },
]);
