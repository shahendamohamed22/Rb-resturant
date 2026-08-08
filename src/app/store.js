import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import branchReducer from '../features/branches/branchSlice';
import ordersReducer from '../features/orders/ordersSlice';
import languageReducer from '../features/languages/languageSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    branch: branchReducer,
    orders: ordersReducer,
    language: languageReducer,

  },
});