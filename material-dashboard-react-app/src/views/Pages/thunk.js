import { createAsyncThunk } from "@reduxjs/toolkit";

import { login as loginAPI, signup as singupAPI } from "./service";

// export const signInAdmin = createAsyncThunk(
//   "sign-in/superman",
//   async (payload) => {
//     const response = await signInAPI(payload);
//     return response.data;
//   }
// );

export const login = createAsyncThunk("login/user", async (payload) => {
    const response = await loginAPI(payload);
    return response.data;
});
export const signup = createAsyncThunk("signup/user", async (payload) => {
    const response = await singupAPI(payload);
    return response.data;
});
