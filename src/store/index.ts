import { configureStore } from "@reduxjs/toolkit";
import topBarReducer from './topBarSlice';
import authReducer from './authSlice';
import { auth } from "../api/auth";
import { kyc } from "../api/kyc";

export const store = configureStore({
    reducer: {
        topBar: topBarReducer,
        auth: authReducer,
        [auth.reducerPath]: auth.reducer,
        [kyc.reducerPath]: kyc.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            auth.middleware,
            kyc.middleware
        ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch