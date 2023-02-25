"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  useGetUserByIdQuery,
  useDeleteUserMutation,
} from "../../../../redux/services/account";
import { BiLogOut, BiTrash, BiHeart } from "react-icons/bi";
import Unknown from "../../../../assets/unknown-user.png";

function ImgUser() {
  const [id, setId] = useState("63f88a5ff14dbb75213f8e51");
  const [deleteAccount, result] = useDeleteUserMutation();
  const { data, isFetching, error } = useGetUserByIdQuery(id);
  const [showOptions, setShowOptions] = useState(false);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState<{
    email: string;
    username: string;
    image: string;
    id: string;
  }>();

  useEffect(() => {
    if (window) setShow(true);
  }, []);

  useEffect(() => {
    const account = window.localStorage.getItem("account-blog");

    if (account) {
      setId(JSON.parse(account).id);

      if (error) window.localStorage.removeItem("account-blog");

      if (!error)
        setUser({
          email: JSON.parse(account).email,
          username: JSON.parse(account).username,
          image: JSON.parse(account).image,
          id: JSON.parse(account).id,
        });
    }
  }, [isFetching]); //eslint-disable-line

  return (
    <>
      {error || !user ? (
        <>
          {show ? (
            <>
              <Link
                href="/login"
                className="py-1 px-2 border-2 border-cyan-400 bg-cyan-400 text-white rounded-full transition hover:bg-white hover:text-cyan-400 duration-200"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="py-1 px-2 border-2 border-cyan-400 text-cyan-400 rounded-full
      transition hover:bg-cyan-400 hover:text-white duration-200"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="py-1 px-2 border-2 border-cyan-400 bg-cyan-400 text-white rounded-full transition hover:bg-white hover:text-cyan-400 duration-200 cursor-default">
                Login
              </div>

              <div
                className="py-1 px-2 border-2 border-cyan-400 text-cyan-400 rounded-full
      transition hover:bg-cyan-400 hover:text-white duration-200 cursor-default"
              >
                Register
              </div>
            </>
          )}
        </>
      ) : (
        <div className="relative">
          <button className="" onClick={() => setShowOptions(!showOptions)}>
            <img
              className="rounded-full w-[2.5rem] h-[2.5rem]"
              src={user?.image ? user.image : Unknown.src}
              alt="User Image"
            />
          </button>

          {showOptions ? (
            <div className="absolute left-[50%] -translate-x-[50%] bg-[#4fa7b6] rounded-xl shadow-lg shadow-black/20 py-2">
              <div className="flex flex-col items-center gap-2">
                <h3 className="font-semibold text-xl text-amber-300">
                  <span className="text-white">Hello</span> {user.username}
                </h3>

                <p className="flex flex-col items-center text-white px-4">
                  <span className="font-medium">User ID:</span> {user.id}
                </p>
              </div>

              <div className="flex flex-col mt-2 gap-2">
                <Link
                  className="font-semibold text-white text-[15px] flex items-center justify-center gap-2 py-0.5 transition-colors hover:bg-[#4e767c]"
                  href="/user"
                >
                  My Blogs
                  <BiHeart className="text-white text-lg" />
                </Link>

                <button
                  className="font-semibold text-white text-[15px] flex items-center justify-center gap-2 py-0.5 transition-colors hover:bg-[#4e767c]"
                  onClick={() => {
                    window.localStorage.removeItem("account-blog");
                    location.reload();
                  }}
                >
                  Log Out
                  <BiLogOut className="text-white text-lg" />
                </button>

                <button
                  className="font-semibold text-white text-[15px] flex items-center justify-center gap-2 transition-colors hover:bg-[#4e767c] py-0.5 rounded-b-lg"
                  onClick={() => {
                    deleteAccount(user.id);
                    location.reload();
                  }}
                >
                  Delete Account
                  <BiTrash className="text-white text-lg" />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}

export default ImgUser;
