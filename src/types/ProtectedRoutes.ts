import { ReactElement, ReactNode } from "react";

export interface RouteElement {
  element: ReactElement;
}

export interface AdminRouteProps extends RouteElement {
  children?: ReactNode;
  isAdmin?: boolean;
}
