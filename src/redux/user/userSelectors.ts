import { AppState } from "../store";

export const getLogin = (state: AppState) => state.userSlice.isLoggedIn;
export const getUserData = (state: AppState) => state.userSlice.user;
export const getLoading = (state: AppState) => state.userSlice.loading;
export const getUsersData = (state: AppState) => state.userSlice.users;
export const getRole = (state: AppState) => state.userSlice.user?.role
