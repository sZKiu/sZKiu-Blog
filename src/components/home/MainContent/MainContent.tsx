"use client";
import React, { useState, useEffect } from "react";
import ShowBlogs from "../ShowBlogs/ShowBlogs";
import { useInView } from "react-intersection-observer";
import {
  useGetBlogsQuery,
} from "../../../redux/services/blogs";
import reverseFunction from "@/utilities/reverseFunction";
import { Blog } from "../../../types/types_redux";

function MainContent() {
  const [blogsPerPage, setBlogsPerPage] = useState(5);
  const [len, setLen] = useState(0);
  const {
    data,
    isFetching,
    error,
  }: { data: Blog[]; isFetching: boolean; error: any } =
    useGetBlogsQuery(blogsPerPage);
  const [ref, inView] = useInView({
    root: null,
    threshold: 0.1,
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/blogslen").then(res => res.json()).then(res => {
      setLen(res);
    })
  }, [])

  useEffect(() => {
    if (inView) {
      if (len > blogsPerPage) setBlogsPerPage(blogsPerPage + 5);
    }
  }, [inView]); //eslint-disable-line

  return (
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

          <div ref={ref}/>
        </>
      ) : null}
    </section>
  );
}

export default MainContent;
