import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import Users from "./redux/user";
import Auth from "./redux/auth";

export const store = configureStore({
  reducer: {
    Users,
    Auth,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
