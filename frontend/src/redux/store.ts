import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import ubsReducer from "./ubsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ubs: ubsReducer,
  },
});

//Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
