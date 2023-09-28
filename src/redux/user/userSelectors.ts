import { AppState } from "../store";

export const getLogin = (state: AppState) => state.userSlice.isLoggedIn;
