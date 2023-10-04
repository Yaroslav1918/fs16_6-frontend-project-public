import { AppState } from "../store";

export const getLogin = (state: AppState) => state.userSlice.isLoggedIn;
export const getUserData = (state: AppState) => state.userSlice.user;
export const getRole = (state: AppState) => state.userSlice.user?.role
