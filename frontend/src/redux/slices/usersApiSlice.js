import { USERS_URL } from "../constants";
import { apiSlice } from "./apislice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLogInMutation } = usersApiSlice;
