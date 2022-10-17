import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import modalReducer from '../features/modals/modalSlice';
import productReducer from '../features/products/productSlice';
import shopReducer from '../features/shop/shopSlice';
import categoryReducer from '../features/categories/categorySlice';
import variantsReducer from '../features/variants/variantsSlice';
import productDescriptionReducer from '../features/productDescription/productDescriptionSlice';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modals: modalReducer,
    products: productReducer,
    shop: shopReducer,
    categories: categoryReducer,
    variants: variantsReducer,
    productDescription: productDescriptionReducer,
    cart: cartReducer,
  },
});
