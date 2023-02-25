"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/generic/Header/Header";
import ShowBlogs from "@/components/home/ShowBlogs/ShowBlogs";
import CreatePost from "../../components/generic/CreatePost/CreatePost";
import { useInView } from "react-intersection-observer";
import { useGetBlogsByUserQuery } from "@/redux/services/blogs";
import reverseFunction from "@/utilities/reverseFunction";
import { Blog } from "@/types/types_redux";

function User() {
  const [blogsPerPage, setBlogsPerPage] = useState(5);
  const [len, setLen] = useState(0);
  const [user, setUser] = useState<{
    username: string;
    image?: string;
    email: string;
    id: string;
  }>();
  const { data, isFetching, error } = useGetBlogsByUserQuery({
    user: user?.username,
    lmt: blogsPerPage,
  });
  const [ref, inView] = useInView({
    root: null,
    threshold: 0.1,
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/blogslen")
      .then((res) => res.json())
      .then((res) => {
        setLen(res);
      });

    const accountData = window.localStorage.getItem("account-blog");

    if (accountData) {
      setUser(JSON.parse(accountData));
    }
  }, []);

  useEffect(() => {
    if (inView) {
      if (len > blogsPerPage) setBlogsPerPage(blogsPerPage + 5);
    }
  }, [inView]); //eslint-disable-line

  return (
    <>
      <Header />

      <main className="min-h-[70.3vh] mt-8">
        <section className="flex flex-col gap-[4rem]">
          {data ? (
            <>
              {data.map(
                (
                  {
                    body,
                    author,
                    category,
                    id,
                    image,
                    time,
                    title,
                    author_id,
                  }: Blog,
                  i: number
                ) => {
                  return (
                    <ShowBlogs
                      author_id={author_id}
                      description={body}
                      title={title}
                      image={image}
                      time={time}
                      author={author}
                      category={category}
                      isPair={i % 2 === 0}
                      id={id}
                      key={id}
                    />
                  );
                }
              )}

              <div ref={ref} />
            </>
          ) : null}
        </section>

        <CreatePost />
      </main>
    </>
  );
}

export default User;
