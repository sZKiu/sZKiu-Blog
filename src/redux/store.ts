import { configureStore } from "@reduxjs/toolkit";
import { blogsApi } from "./services/blogs";
import { accountApi } from "./services/account";

export const store = configureStore({
  reducer: {
    [blogsApi.reducerPath]: blogsApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
  },

  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat(accountApi.middleware, blogsApi.middleware)
    // getDefaultMiddleware().concat(blogsApi.middleware)
  ),
});
