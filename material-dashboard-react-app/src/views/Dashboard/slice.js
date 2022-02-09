import { createSlice, isPending, isRejected, isFulfilled } from "@reduxjs/toolkit";

import { arts } from "./thunk";

const initialState = {
    status: "idle",
    fetchStatus: false,
    fetchSuccess: false,
    fetchResponse: [],
    responseMessage:"",
    fetchError: null,
};

var thunks = [arts];

export const slice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        // updateProfile: (state, action) => {
        //     console.log("updateProfile");
        //     console.log(action.payload);
            
        //     let data = action.payload;
        //     console.log(data);
        //     state.fetchResponse = {...state.loginResponse, ...data};
        // }

    },
    extraReducers: (builder) => {
        builder
            .addCase(arts.fulfilled, (state, action) => {
                state.status = "success";
                
                if(action.payload.message) {
                  state.fetchError = true;
                  state.fetchStatus = false;
                  state.fetchResponse = [];
                  state.responseMessage = action.payload.message;
                }

                else {
                  state.fetchSuccess = true;
                  let {arts} = action.payload;
                  state.fetchResponse = arts;
                  state.fetchError= null;
                  state.responseStatus = true;
                }
            })

            .addMatcher(isPending(...thunks), (state) => {
                console.log("pending");
                state.status = "loading";
                state.fetchSuccess = false;
                state.fetchError = true;
                state.fetchStatus = false;
                state.fetchResponse = [];
            })
            .addMatcher(isRejected(...thunks), (state, action) => {
                console.log("rejected");
                state.status = "failed";
                state.fetchError = true;
                state.fetchStatus = false;
                state.fetchResponse = [];
                state.fetchSuccess = false;
            });
    },
});

// export const selectlogin = (state) => state.login.loginSuccess;
// export const selectloginError = (state) => state.login.loginError;
// export const selectloginResponseMessage = (state) => state.login.responseMessage;
// export const selectloginStatus = (state) => state.login.status === "loading";
// export const selectloginResponseStatus = (state) => state.login.responseStatus;
// export const selectLoginResponse = (state) => state.login.loginResponse;

//create export for all the states in dashboard individually
export const selectDashboard = (state) => state.dashboard.status;
export const selectDashboardFetchStatus = (state) => state.dashboard.fetchStatus;
export const selectDashboardFetchResponse = (state) => state.dashboard.fetchResponse;
export const selectDashboardFetchError = (state) => state.dashboard.fetchError;
export const selectDashboardResponseMessage = (state) => state.dashboard.responseMessage;

// export const { updateProfile,  } = slice.actions;

export default slice.reducer;
