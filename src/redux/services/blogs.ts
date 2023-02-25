import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Blog } from "../../types/types_redux";

export const blogsApi: any = createApi({
  reducerPath: "blogsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/",
  }),

  endpoints: (builder: any) => ({
    getBlogs: builder.query({
      query: (limit: number) => `/blogs?limit=${limit}`,
    }),

    getBlogById: builder.query({
      query: (id: string) => `/blog/${id}`,
    }),

    getBlogsByCat: builder.query({
      query: ({ cat, lmt }: { cat: string; lmt: number }) =>
        `/blogs/${cat}?limit=${lmt}`,
    }),

    getBlogsByUser: builder.query({
      query: ({ user, lmt }: { user: string; lmt: number }) =>
        `/blogsauthor/${user}?limit=${lmt}`,
    }),

    createBlog: builder.mutation({
      query: (blog: Blog) => ({
        url: "/blog",
        body: blog,
        method: "POST",
      }),
    }),

    updateBlog: builder.mutation({
      query: ({ id, blog }: { id: string; blog: Blog }) => ({
        url: `blog/${id}`,
        body: blog,
        method: "PUT",
      }),
    }),

    deleteBlog: builder.mutation({
      query: (id: string) => ({
        url: `blog/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useGetBlogsByCatQuery,
  useGetBlogsByUserQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogsApi;
