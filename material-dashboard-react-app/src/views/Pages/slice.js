import { createSlice, isPending, isRejected, isFulfilled } from "@reduxjs/toolkit";

import { login, signup } from "./thunk";

const initialState = {
  status: "idle",
  responseStatus: null,
  loginSuccess: false,
  loginError: null,
  loginResponse: {},
};

var thunks = [
  login,
  signup,
]

export const slice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(login.fulfilled, (state, action) => {
      state.status = "success";
      state.loginSuccess = true;
      state.loginResponse = action.payload.user;
    })
    .addCase(signup.fulfilled, (state, action) => {
      state.status = "success";
      state.loginSuccess = true;
      state.loginResponse = action.payload.user;
    })   
    .addMatcher(isPending(...thunks), (state) => {
      state.status = "loading";
      // state.taskCreatedSuccess = false;
      // state.taskUpdateSuccess = false;
      // state.taskDeletedSuccess = false;
      // state.taskCompletedSuccessfully = false;
    })
    .addMatcher(isRejected(...thunks), (state, action) => {
      state.status = "failed";
      state.responseStatus= null,
      state.loginSuccess= false,
      state.loginError= action.error.message,
      state.loginResponse= {}
    })
  },
});

export const selectlogin = (state) => state.login.loginSuccess;
// export const selectloginError = (state) => state.login.loginError;
// export const selectloginResponse = (state) => state.login.loginResponse;
export const selectloginStatus = (state) => state.login.status === "loading";
export const selectloginResponseStatus = (state) => state.login.responseStatus;
export const selectLoginResponse = (state) => state.login.loginResponse;
// export const selectStatus = (state) => state.login.status;

// export const { getProfile } = slice.actions;

export default slice.reducer;
