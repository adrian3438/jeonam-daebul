import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/accountInfoSlice";


export const store = configureStore({
    reducer : {
        accountData : accountReducer,
    },
    middleware : getMiddleware => getMiddleware().concat(
       
    ),
    devTools : process.env.NODE_ENV === 'production'
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;