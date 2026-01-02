import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { BLEMiddleware } from "./states/BLEstate/listner";
import BLEReducer from "./states/BLEstate/slice";

export const store = configureStore({
  reducer: {
    BLE: BLEReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(BLEMiddleware.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
