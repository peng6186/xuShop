import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apislice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => PRODUCTS_URL,
      keepUnusedDataFor: 20,
    }),
    getProductById: builder.query({
      query: (id) => `${PRODUCTS_URL}/${id}`,
      keepUnusedDataFor: 20,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApiSlice;
