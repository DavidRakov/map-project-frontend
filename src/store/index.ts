import { configureStore } from "@reduxjs/toolkit";
import polygonReducer from "./slices/polygonSlice";
import objectReducer from "./slices/objectSlice";

export const store = configureStore({
  reducer: {
    polygons: polygonReducer,
    objects: objectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
