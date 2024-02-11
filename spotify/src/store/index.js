import { configureStore } from "@reduxjs/toolkit";
import musicSlice from "./musicSlice";

export const store = configureStore({
  reducer: {
    music: musicSlice,
  },
});
