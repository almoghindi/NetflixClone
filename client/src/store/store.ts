import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import myListReducer from "./slices/myListSlice";
import likedReducer from "./slices/liked-slice";
import cardReducer from "./slices/card-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    myList: myListReducer,
    liked: likedReducer,
    card: cardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
