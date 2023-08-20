import { configureStore } from "@reduxjs/toolkit";
import storageReducer from "./features/storageSlice";

export const store = configureStore({
  reducer: {
    storageReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;