import API from "../api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  entries: [],
  error: null,
};

export const getAccounts = createAsyncThunk(
  "accounts/getAccounts",
  async (_, thunkAPI) => {
    const response = await API.accounts.getAccounts();
    if (response.status !== 200) {
      return thunkAPI.rejectWithValue({ message: "Failed to fetch accounts" });
    }
    return response.data;
  }
);

export const getAccountsByCategory = createAsyncThunk(
  "accounts/getAccountsByCategory",
  async (category, thunkAPI) => {
    try {
      const response = await API.accounts.getAccountsByCategory(category);
      if (response.status !== 200) {
        return thunkAPI.rejectWithValue({
          message: "Failed to fetch accounts by category",
        });
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error,
      });
    }
  }
);

export const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAccounts.pending, (state) => {
      state.loading = true;
      state.entries = [];
      state.error = null;
    });
    builder.addCase(getAccounts.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.entries = payload;
      state.error = null;
    });
    builder.addCase(getAccounts.rejected, (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.error = payload.message;
      state.entries = [];
    });

    builder.addCase(getAccountsByCategory.pending, (state) => {
      state.loading = true;
      state.entries = [];
      state.error = null;
    });
    builder.addCase(getAccountsByCategory.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.entries = payload;
      state.error = null;
    });
    builder.addCase(getAccountsByCategory.rejected, (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.error = payload.message;
      state.entries = [];
    });
  },
});

// export const {} = accountsSlice.actions;

export const selectAccounts = (state) => state.accounts;

export default accountsSlice.reducer;
