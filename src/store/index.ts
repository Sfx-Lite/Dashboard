import { configureStore } from "@reduxjs/toolkit";
import topBarReducer from './topBarSlice';

export const store = configureStore({
    reducer: {
        topBar: topBarReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch