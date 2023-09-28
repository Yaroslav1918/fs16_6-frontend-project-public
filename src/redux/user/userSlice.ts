import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import operations from "./userOperations";
import { SignIn } from "../../types/User";

interface AuthState {
  user: SignIn | null;
  token: string | null;
  isLoggedIn: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
  error: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state ) => {
      state.isLoggedIn = false;
      state.error = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(operations.register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(operations.register.rejected, (state, action) => {
        state.error = action.error.message as string | null;
      })
      .addCase(operations.logIn.fulfilled, (state, action) => {
        state.token = action.payload.access_token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(operations.logIn.rejected, (state, action) => {
        state.error = action.error.message as string | null;
      })
      .addCase(operations.logOut.fulfilled, (state) => {
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(operations.fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(operations.fetchCurrentUser.rejected, (state, action) => {
        state.error = action.error.message as string | null;
      });
  },
});
export const { logOut } = userSlice.actions;
export default userSlice.reducer;
