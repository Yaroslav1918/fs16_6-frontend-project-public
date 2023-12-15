import { createSlice } from "@reduxjs/toolkit";

import {
  fetchByIdUser,
  fetchCreateUserAsync,
  fetchGoogleLogInAsync,
  fetchRegisterAsync,
  fetchUDeleteUserAsync,
  fetchUptadeUserAsync,
  fetchUsersAsync,
  fetchlogInAsync,
} from "./userOperations";
import { User } from "../../types/User";

export interface AuthState {
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
      state.currentUser = null;
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoggedIn = true;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchUsersAsync.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.error = action.error.message as string | null;
        state.loading = false;
      })
      .addCase(fetchRegisterAsync.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
        state.isLoggedIn = false;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchRegisterAsync.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(fetchRegisterAsync.rejected, (state, action) => {
        state.error = action.error.message as string | null;
        state.loading = false;
      })
      .addCase(fetchlogInAsync.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.currentUser = action.payload.user;
        state.isLoggedIn = true;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchlogInAsync.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(fetchlogInAsync.rejected, (state, action) => {
        state.error = action.error.message as string | null;
        state.loading = false;
      })
      .addCase(fetchGoogleLogInAsync.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.currentUser = action.payload.user;
        state.isLoggedIn = true;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchGoogleLogInAsync.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(fetchGoogleLogInAsync.rejected, (state, action) => {
        state.error = action.error.message as string | null;
        state.loading = false;
      })

      .addCase(fetchByIdUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoggedIn = true;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchByIdUser.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(fetchByIdUser.rejected, (state, action) => {
        state.error = action.error.message as string | null;
        state.loading = false;
      })
      .addCase(fetchUptadeUserAsync.fulfilled, (state, action) => {
        const foundIndex = state.users.findIndex(
          (p) => p._id === action.payload.user._id
        );
        if (foundIndex >= 0) {
          state.users[foundIndex] = action.payload.user;
        }
      })
      .addCase(fetchUptadeUserAsync.rejected, (state, action) => {
        return {
          ...state,
          error: action.error.message as string | null,
          loading: false,
        };
      })
      .addCase(fetchUptadeUserAsync.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      });
    builder.addCase(fetchUDeleteUserAsync.fulfilled, (state, action) => {
      state.users = state.users.filter((p) => p._id !== action.payload);
      state.loading = false;
    });
    builder.addCase(fetchUDeleteUserAsync.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          loading: false,
          error: action.payload.message,
        };
      }
    });
    builder.addCase(fetchUDeleteUserAsync.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(fetchCreateUserAsync.fulfilled, (state, action) => {
      state.users.push(action.payload.user);
      state.loading = false;
    });
    builder.addCase(fetchCreateUserAsync.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
    });
    builder.addCase(fetchCreateUserAsync.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });
  },
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;
