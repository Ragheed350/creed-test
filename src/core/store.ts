import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import Users from "./redux/user";

export const store = configureStore({
  reducer: {
    Users,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
