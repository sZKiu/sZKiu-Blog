"use client";
import React from "react";
import Blog from "@/components/individualblog/Blog/Blog";
import Header from "../../../components/generic/Header/Header";
import CreatePost from "@/components/generic/CreatePost/CreatePost";
import RecoBlogs from "@/components/individualblog/RecoBlogs/RecoBogs";
import {
  useGetBlogByIdQuery,
  useGetBlogsByCatQuery,
} from "../../../redux/services/blogs";
import filterBlogCat from "@/utilities/filterBlogsCat";

function BlogId({ params: { blogid } }: { params: { blogid: string } }) {
  const {
    data: userData,
    isFetching: UserIsFetching,
    error: userError,
  } = useGetBlogByIdQuery(blogid);
  const {
    data: catData,
    isFetching: catIsFetching,
    error: catError,
  } = useGetBlogsByCatQuery({
    lmt: 10,
    cat: userData?.category,
  });

  let filteredBlogs;
  if (catData) filteredBlogs = filterBlogCat(catData, blogid);

  return (
    <>
      <Header noSticky={true} />

      <main className="mb-6">
        <section className="flex gap-8 relative">
          <Blog
            author={userData?.author}
            author_id={userData?.author_id}
            category={userData?.category}
            description={userData?.body}
            id={userData?.id}
            time={userData?.time}
            title={userData?.title}
            image={userData?.image}
          />

          {filterBlogCat.length !== 0 ? (
            <RecoBlogs catBlogs={filteredBlogs} />
          ) : null}
        </section>

        <CreatePost />
      </main>
    </>
  );
}

export default BlogId;
