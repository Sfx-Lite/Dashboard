import { configureStore } from "@reduxjs/toolkit";
import topBarReducer from './topBarSlice';
import authReducer from './authSlice';
import { auth } from "../api/auth";
import { kyc } from "../api/kyc";
import { users } from "../api/users";
import { dashboard } from "../api/dashboard";
import { transactions } from "../api/transactions";

export const store = configureStore({
    reducer: {
        topBar: topBarReducer,
        auth: authReducer,
        [auth.reducerPath]: auth.reducer,
        [kyc.reducerPath]: kyc.reducer,
        [users.reducerPath]: users.reducer,
        [dashboard.reducerPath]: dashboard.reducer,
        [transactions.reducerPath]: transactions.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            auth.middleware,
            kyc.middleware,
            users.middleware,
            dashboard.middleware,
            transactions.middleware
        ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch