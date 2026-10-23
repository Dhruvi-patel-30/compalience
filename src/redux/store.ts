import { configureStore } from "@reduxjs/toolkit";
import displayReducer from "@/redux/slices/displaySlice";
import detailReducer from "@/redux/slices/complienceDetail";

export const store = configureStore({
  reducer: {
    displaySlice: displayReducer,
    detail: detailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
