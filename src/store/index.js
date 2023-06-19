import { configureStore } from "@reduxjs/toolkit";
import report from "./report";

export const store = configureStore({
  reducer: {
    report,
  },
});
