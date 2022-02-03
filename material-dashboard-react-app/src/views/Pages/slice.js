import { createSlice, isPending, isRejected, isFulfilled } from "@reduxjs/toolkit";

import { login, signup } from "./thunk";

const initialState = {
    status: "idle",
    responseStatus: null,
    loginSuccess: false,
    loginError: null,
    loginResponse: {},
    responseMessage:"",
};

var thunks = [login, signup];

export const slice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.status = "success";
                if(action.payload.message) {
                  state.loginError= true;
                  state.responseStatus = false;
                  state.responseMessage = action.payload.message;
                  state.loginResponse = {};
                  state.loginSuccess = false;
                }
                else {

                  state.loginSuccess = true;
                  let {data, token} = action.payload;
                  state.loginResponse = {...data.user, token};
                  state.loginError= null;
                  state.responseStatus = true;
                }
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.status = "success";
                state.loginSuccess = true;
                state.loginResponse = action.payload.user;
            })
            .addMatcher(isPending(...thunks), (state) => {
                console.log("pending");
                state.status = "loading";
                state.loginError = null;
                state.loginSuccess = false;

                // state.taskCreatedSuccess = false;
                // state.taskUpdateSuccess = false;
                // state.taskDeletedSuccess = false;
                // state.taskCompletedSuccessfully = false;
            })
            .addMatcher(isRejected(...thunks), (state, action) => {
                console.log("rejected");
                console.log("action", action);
                state.status = "failed";
                state.responseStatus = null;
                state.loginSuccess = false;
                state.loginError = action.error.message;
                state.loginResponse = {};
            });
    },
});

export const selectlogin = (state) => state.login.loginSuccess;
export const selectloginError = (state) => state.login.loginError;
export const selectloginResponseMessage = (state) => state.login.responseMessage;
export const selectloginStatus = (state) => state.login.status === "loading";
export const selectloginResponseStatus = (state) => state.login.responseStatus;
export const selectLoginResponse = (state) => state.login.loginResponse;
// export const selectStatus = (state) => state.login.status;

// export const { getProfile } = slice.actions;

export default slice.reducer;
