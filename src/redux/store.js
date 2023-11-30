import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slides/productSlide';
import userReducer from './slides/userSlide';
import categoryReducer from './slides/categorySlide';

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        product: productReducer,
        user: userReducer,
    },
});

// middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//         serializableCheck: false, // Tắt kiểm tra tính serializable
//     }),

