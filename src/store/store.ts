import { configureStore } from "@reduxjs/toolkit";
import charactersSlice from "../features/charactersSlice";

/* 1. Создаём хранилище Redux. */
export const store = configureStore({
  reducer: charactersSlice,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
