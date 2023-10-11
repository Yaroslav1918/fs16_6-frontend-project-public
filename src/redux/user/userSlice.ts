import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import operations from "./userOperations";
import { User } from "../../types/User";

interface AuthState {
  currentUser: User | null;
  users: User[];
  token: string | null;
  isLoggedIn: boolean;
  error: string | null;
  loading: boolean;
}

export const initialState: AuthState = {
  currentUser: null,
  users: [],
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
      .addCase(operations.fetchUsersAsync.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoggedIn = true;
        state.error = null;
        state.loading = false;
      })
      .addCase(operations.fetchUsersAsync.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(operations.fetchUsersAsync.rejected, (state, action) => {
        state.error = action.error.message as string | null;
        state.loading = false;
      })
      .addCase(operations.fetchRegisterAsync.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoggedIn = true;
        state.error = null;
        state.loading = false;
      })
      .addCase(operations.fetchRegisterAsync.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(operations.fetchRegisterAsync.rejected, (state, action) => {
        state.error = action.error.message as string | null;
        state.loading = false;
      })
      .addCase(operations.fetchlogInAsync.fulfilled, (state, action) => {
        state.token = action.payload.access_token;
        state.isLoggedIn = true;
        state.error = null;
        state.loading = false;
      })
      .addCase(operations.fetchlogInAsync.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(operations.fetchlogInAsync.rejected, (state, action) => {
        state.error = action.error.message as string | null;
        state.loading = false;
      })

      .addCase(operations.fetchCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
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
      .addCase(operations.fetchUptadeUserAsync.fulfilled, (state, action) => {
        const foundIndex = state.users.findIndex(
          (p) => p.id === action.payload.id
        );
        if (foundIndex >= 0) {
          state.users[foundIndex] = action.payload;
        }
      })
      .addCase(operations.fetchUptadeUserAsync.rejected, (state, action) => {
        return {
          ...state,
          error: action.error.message as string | null,
          loading: false,
        };
      })
      .addCase(operations.fetchUptadeUserAsync.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      });
  },
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;
