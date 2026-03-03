import { configureStore } from "@reduxjs/toolkit";
import wishlist from "./slices/wishlist";
import { products } from "./slices/products";
import { categoryApi } from "./api/categoryApi";
import { subCategoryApi } from "./api/subCategoryApi";

const store = configureStore({
  reducer: {
    wishlist: wishlist,
    [products.reducerPath]: products.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [subCategoryApi.reducerPath]: subCategoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(products.middleware)
      .concat(categoryApi.middleware)
      .concat(subCategoryApi.middleware),
});
export default store;
