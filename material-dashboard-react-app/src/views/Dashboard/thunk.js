import { createAsyncThunk } from "@reduxjs/toolkit";

import { arts as artsAPI } from "./service";


export const arts = createAsyncThunk("dashboard/arts", async (qs) => {
    const response = await artsAPI(qs);
    return response.data;
});
