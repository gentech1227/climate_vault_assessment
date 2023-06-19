import { configureStore } from "@reduxjs/toolkit";
import accounts from "./accounts";

export const store = configureStore({
  reducer: {
    accounts,
  },
});
