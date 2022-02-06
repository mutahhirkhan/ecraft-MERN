import { createAsyncThunk } from "@reduxjs/toolkit";

import { arts as artsAPI } from "./service";


export const arts = createAsyncThunk("dashboard/arts", async (payload) => {
    const response = await artsAPI(payload);
    return response.data;
});
