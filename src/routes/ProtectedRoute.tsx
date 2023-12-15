import { ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AppState } from "../redux/store";
import { useAppSelector } from "../hooks/useAppSelector";
import { AdminRouteProps } from "../types/ProtectedRoutes";

const ProtectedRoute = ({ element, isAdmin }: AdminRouteProps): ReactElement | null => {
  const navigate = useNavigate();
  const role = useAppSelector(
    (state: AppState) => state.userSlice.currentUser?.role
  );
  const isLoggedIn = useAppSelector(
    (state: AppState) => state.userSlice.isLoggedIn
  );
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signIn");
    } else if (role !== "ADMIN" && isAdmin) {
      navigate("/");
    }
  }, [role, navigate, isLoggedIn, isAdmin]);

  return element;
};

export default ProtectedRoute;
