"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDeleteBlogMutation } from "@/redux/services/blogs";
import { useGetUserByIdQuery } from "@/redux/services/account";
import { BiTrash, BiPencil } from "react-icons/bi";

function Blog({
  title,
  author,
  author_id,
  category,
  time,
  description,
  image,
  id,
}: {
  title: string;
  author_id: string;
  author: string;
  category: string;
  time: number;
  description: string;
  image?: string;
  id: string;
}) {
  const [deleteBlog, deleteResult] = useDeleteBlogMutation();
  const { data, isFetching, error } = useGetUserByIdQuery(author_id);
  const [account, setAccount] = useState<{
    id: string;
    username: string;
    email: string;
    image?: string;
  }>();

  useEffect(() => {
    if (!window) return;

    const accountLocal = window.localStorage.getItem("account-blog");
    if (accountLocal) setAccount(JSON.parse(accountLocal));
  }, []);

  const handlerInner = () => ({
    __html: description,
  });

  return (
    <div className="w-[70%] grid gap-4 mt-4">
      <div className="w-full">
        <img className="w-full h-[15rem]" src={image} alt={title} />
      </div>

      <div className={data?.image ? "flex gap-3" : ""}>
        {data?.image ? (
          <div>
            <img
              className="w-[3rem] h-[3rem] rounded-full"
              src={data.image}
              alt={data.username}
            />
          </div>
        ) : null}

        <div>
          <h4 className="font-semibold text-lg text-zinc-800">{author}</h4>

          <p className="text-sm">
            {/* @ts-ignore */}
            {((new Date().getTime() - time) / (1000 * 60)).toFixed(0) > 60
              ? // @ts-ignore
                ((new Date().getTime() - time) / (1000 * 60 * 60)).toFixed(0) >
                24
                ? `${(
                    (new Date().getTime() - time) /
                    (1000 * 60 * 60 * 24)
                  ).toFixed(0)} Days Ago`
                : `${((new Date().getTime() - time) / (1000 * 60 * 60)).toFixed(
                    0
                  )} Hours Ago`
              : `${
                  Number(
                    ((new Date().getTime() - time) / (1000 * 60)).toFixed(0)
                  ) === 0
                    ? 1
                    : (
                        (new Date().getTime() - new Date(time).getTime()) /
                        (1000 * 60)
                      ).toFixed(0)
                } Minutes Ago`}
          </p>
        </div>

        {author_id === account?.id ? (
          <div className="flex items-center gap-1">
            <Link
              href={`/update_blog/${id}`}
              className="w-7 h-7 border-2 font-medium text-white bg-yellow-400 border-yellow-400 rounded-full text-xl flex items-center justify-center"
            >
              <BiPencil/>
            </Link>

            <button
              onClick={() => deleteBlog(id)}
              className="bg-red-500 border-2 w-7 h-7 border-red-500 rounded-full text-white text-xl font-bold flex items-center justify-center"
            >
              <BiTrash />
            </button>
          </div>
        ) : null}
      </div>

      <h1 className="text-4xl font-bold text-zinc-800">{title}</h1>

      <p className="text-zinc-800" dangerouslySetInnerHTML={handlerInner()} />
    </div>
  );
}

export default Blog;
