import API from "../api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  count: 0,
  total: 0,
  monthly: [],
  data: "",
  error: null,
};

export const getReportData = createAsyncThunk(
  "report/getReportData",
  async (params, thunkAPI) => {
    const response = await API.report.getReportData(params);
    return response;
  }
);

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReportData.pending, (state) => {
      state.loading = true;
      state.entries = [];
      state.error = null;
    });
    builder.addCase(getReportData.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.count = payload.count;
      state.total = payload.total;
      state.monthly = payload.monthly;
      state.data = payload.data;
      state.error = null;
    });
    builder.addCase(getReportData.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
      state.entries = [];
      state.data = "";
    });
  },
});

// export const {} = reportSlice.actions;

export const selectReport = (state) => state.report;

export default reportSlice.reducer;
