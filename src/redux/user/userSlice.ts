import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import operations from "./userOperations";
import { SignIn, User } from "../../types/User";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  error: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.isLoggedIn = false;
      state.error = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(operations.register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
        state.loading = false;
      })
      .addCase(operations.register.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(operations.register.rejected, (state, action) => {
        state.error = action.error.message as string | null;
        state.loading = false;
      })
      .addCase(operations.logIn.fulfilled, (state, action) => {
        state.token = action.payload.access_token;
        state.isLoggedIn = true;
        state.error = null;
        state.loading = false;
      })
      .addCase(operations.logIn.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(operations.logIn.rejected, (state, action) => {
        state.error = action.error.message as string | null;
        state.loading = false;
      })
      .addCase(operations.logOut.fulfilled, (state) => {
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
        state.loading = false;
      })
      .addCase(operations.logOut.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(operations.fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
        state.loading = false;
      })
      .addCase(operations.fetchCurrentUser.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(operations.fetchCurrentUser.rejected, (state, action) => {
        state.error = action.error.message as string | null;
        state.loading = false;
      })
      .addCase(operations.uptadeUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
        state.loading = false;
      })
      .addCase(operations.uptadeUser.rejected, (state, action) => {
        return {
          ...state,
          error: action.error.message as string | null,
          loading: false,
        };
      })
      .addCase(operations.uptadeUser.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      });
  },
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;
