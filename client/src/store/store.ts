import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import myListReducer from "./slices/myListSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        myList: myListReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;