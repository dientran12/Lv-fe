import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slides/productSlide';
import userReducer from './slides/userSlide';
import counterReducer from './slides/counterSlide';

export const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
    },
});

// middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//         serializableCheck: false, // Tắt kiểm tra tính serializable
//     }),

