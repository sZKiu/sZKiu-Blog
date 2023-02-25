import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types/types_redux";

export const accountApi: any = createApi({
  reducerPath: "accountApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/",
  }),

  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (id) => `/accountgetuser/${id}`,
    }),

    createUser: builder.mutation({
      query: (user: User) => ({
        url: "/account/register",
        body: user,
        method: "POST",
      }),
    }),

    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `/account/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUserByLoginQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
} = accountApi;
