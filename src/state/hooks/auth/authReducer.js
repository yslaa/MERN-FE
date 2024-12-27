import { createSlice } from "@reduxjs/toolkit";
import { api } from "@api";
import { TAGS } from "@constants";

const authSlice = createSlice({
  name: TAGS.AUTH,
  initialState: {
    token: "",
    user: {},
    authenticated: false,
  },
  reducers: {
    logout(state) {
      state.token = "";
      state.user = {};
      state.authenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        if (payload?.status) {
          state.token = payload.meta.access || "";
          state.authenticated = true;
          state.user = payload.data || {};
        }
      },
    );
    builder.addMatcher(
      api.endpoints.editUser.matchFulfilled,
      (state, { payload }) => {
        if (payload?.status) {
          state.user = { ...payload.data[0] };
        }
      },
    );
  },
});

export const authActions = authSlice.actions;
export const auth = authSlice.reducer;
