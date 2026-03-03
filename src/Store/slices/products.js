import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const products = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/", // json-server port
  }),
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => `products`,
    }),

    getProductsById: build.query({
      query: (id) => `products/${id}`,
    }),

    getProductsBySubCategorySlug: build.query({
      query: (subCategorySlug) => `products?subCategorySlug=${subCategorySlug}`,
    }),
  }),
});

export const {
  useGetProductsBySubCategorySlugQuery,
  useGetProductsByIdQuery,
  useGetProductsQuery,
} = products;
