"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDeleteBlogMutation } from "@/redux/services/blogs";
import { BiTrash } from "react-icons/bi";
import { User } from "@/types/types_redux";
import { ErrorPostBlog } from "@/types/types";

function ButtonsBlog({ author_id, id }: { author_id: string; id: string }) {
  const [deleteBlog, deleteResult] = useDeleteBlogMutation();
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<ErrorPostBlog | undefined>();
  const [showMessa, setShowMessa] = useState(false);

  useEffect(() => {
    if (window) {
      const userLocal = localStorage.getItem("account-blog");

      if (userLocal) {
        setUser(JSON.parse(userLocal));
      }
    }
  }, []);

  useEffect(() => {
    if (deleteResult.status === "uninitialized") return;

    if (deleteResult.isSuccess) {
      setShowMessa(true);

      setTimeout(() => {
        location.reload();
      }, 500);

      setTimeout(() => {
        setShowMessa(false);
      }, 3000);
    } else if (deleteResult.isError) {
      setError(deleteResult.error);
      setShowMessa(true);

      setTimeout(() => {
        setShowMessa(false);
        setError(undefined);
      }, 3000);
    }
  }, [deleteResult]);

  return (
    <>
      <div>
        {user?.id === author_id ? (
          <div className="flex gap-3">
            <Link
              href={`/user/${id}`}
              className="w-fit h-fit py-1 px-3 border-2 font-medium text-[#477cc2] border-[#477cc2]"
            >
              Read More
            </Link>

            <Link
              href={`/update_blog/${id}`}
              className="w-fit h-fit py-1 px-3 border-2 font-medium text-white bg-yellow-400 border-yellow-400"
            >
              Update
            </Link>

            <button
              onClick={() => deleteBlog(id)}
              className="bg-red-500 border-2 border-red-500 text-white px-2 text-xl font-bold"
            >
              <BiTrash />
            </button>
          </div>
        ) : (
          <Link
            href={`/user/${id}`}
            className="w-fit h-fit py-1 px-3 border-2 font-medium text-[#477cc2] border-[#477cc2]"
          >
            Read More
          </Link>
        )}
      </div>

      {showMessa ? (
        <div
          className={`fixed top-[10%] left-[50%] z-[2000] -translate-x-[50%] rounded-xl py-2 px-4 ${
            error
              ? "border-2 border-red-600 text-red-600"
              : "bg-green-600 text-white"
          }`}
        >
          <p className="font-medium">
            {error
              ? `Status code: ${error.status}, Error: ${
                  !error?.data ? error?.error : error.data.detail
                }`
              : "The blog was succesfully deleted"}
          </p>
        </div>
      ) : null}
    </>
  );
}

export default ButtonsBlog;
