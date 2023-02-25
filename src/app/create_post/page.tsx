"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/generic/Header/Header";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import Link from "next/link";
import { Formik, ErrorMessage, Field, Form } from "formik";
import { useCreateBlogMutation } from "../../redux/services/blogs";
import { categories } from "@/assets/categories";
import { ErrorPostBlog } from "@/types/types";

function CreatePost() {
  const [updatePost, result] = useCreateBlogMutation();
  const [valueQuill, setValueQuill] = useState("");
  const [img, setImg] = useState<string | null>(null);
  const [error, setError] = useState<ErrorPostBlog | undefined>();
  const [showMessa, setShowMessa] = useState(false);
  const [showAlertQuill, setShowAlertQuill] = useState(false);

  const validateTitle = (values: string) => {
    let title = "";

    if (!values) {
      title = "Required";
    } else if (values.length > 32) {
      title = "The title is too large";
    } else if (values.length < 4) {
      title = "The title is too short";
    }

    return title;
  };

  useEffect(() => {
    if (result.status === "uninitialized") return;

    if (result.isSuccess) {
      setShowMessa(true);

      setTimeout(() => {
        setShowMessa(false);
      }, 3000);
    } else if (result.isError) {
      setError(result.error);
      setShowMessa(true);

      setTimeout(() => {
        setShowMessa(false);
        setError(undefined);
      }, 3000);
    }
  }, [result]);

  return (
    <>
      <Header />

      <main className="min-h-[76.5vh] flex items-center">
        <Formik
          initialValues={{
            title: "",
            category: "art",
          }}
          onSubmit={(values) => {
            const author = window.localStorage.getItem("account-blog");
            const anchor = document.getElementById("home-anchor-create_post");

            if (valueQuill) {
              updatePost({
                ...values,
                author: author ? JSON.parse(author).username : "",
                author_id: author ? JSON.parse(author).id : "",
                body: valueQuill,
                image: img,
                time: new Date().getTime(),
              });

              // @ts-ignore
              author ? anchor.click() : null;
            } else {
              setShowAlertQuill(true);

              setTimeout(() => {
                setShowAlertQuill(false);
              }, 2000);
            }
          }}
        >
          {() => {
            return (
              <Form className="flex justify-between gap-6 w-full h-[22rem]">
                <div className="w-[65%] flex flex-col justify-between">
                  <div>
                    <Field
                      name="title"
                      placeholder="Add a title..."
                      className="w-full border border-[#cacbce] py-[5.5px] pl-2 outline-none text-zinc-900"
                      validate={validateTitle}
                    />

                    <ErrorMessage
                      className="text-sm font-medium text-red-600"
                      name="title"
                      component="p"
                    />
                  </div>

                  <div className="relative">
                      <ReactQuill
                        className="h-[18rem]"
                        theme="snow"
                        value={valueQuill}
                        onChange={setValueQuill}
                      />

                    {showAlertQuill ? (
                      <p className="absolute -bottom-5 text-sm font-medium text-red-600">
                        The content is too Short
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="w-[35%] flex flex-col gap-2">
                  <div className="h-[60%] border flex flex-col gap-2 border-[#cacbce] p-2">
                    <h2 className="font-bold text-xl">Publish</h2>
                    <p>
                      <span className="font-medium">Status:</span> Draft
                    </p>
                    <p>
                      <span className="font-medium">Visibility:</span> Public
                    </p>
                    <button
                      type="button"
                      className="w-fit relative underline-offset-1 underline transition-colors hover:text-gray-500 duration-300"
                      onClick={(
                        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                      ) => {
                        //@ts-ignore
                        e.currentTarget.children[0]?.click();
                      }}
                    >
                      Upload Image
                      <input
                        className="hidden"
                        accept="image/png, image/jpeg"
                        type="file"
                        onChange={(e) => {
                          if (e.currentTarget.files) {
                            const fileReader = new FileReader();
                            if (e.currentTarget.files[0]) {
                              fileReader.readAsDataURL(
                                e.currentTarget.files[0]
                              );

                              fileReader.addEventListener("load", (e) => {
                                if (e.target) {
                                  if (typeof e.target.result === "string")
                                    setImg(e.target.result);
                                }
                              });
                            }
                          }
                        }}
                      />
                    </button>

                    <div className="flex justify-between">
                      <button
                        type="submit"
                        className="bg-[#288d66] text-white py-0.5 px-2 font-medium"
                      >
                        Update
                      </button>

                      <Link
                        href="/"
                        className="border border-[#bb2121] text-[#bb2121] py-0.5 px-2 font-medium"
                      >
                        Delete and Leave
                      </Link>
                    </div>
                  </div>

                  <div className="h-[50%] border flex flex-col gap-2 border-[#cacbce] p-2">
                    <h2 className="font-bold text-xl">Category</h2>

                    <div className="grid grid-cols-2">
                      <label className="font-medium">
                        <Field type="radio" name="category" value="art" /> Art
                      </label>

                      <label className="font-medium">
                        <Field type="radio" name="category" value="science" />{" "}
                        Science
                      </label>

                      <label className="font-medium">
                        <Field
                          type="radio"
                          name="category"
                          value="technology"
                        />{" "}
                        Technology
                      </label>

                      <label className="font-medium">
                        <Field type="radio" name="category" value="cinema" />{" "}
                        Cinema
                      </label>

                      <label className="font-medium">
                        <Field type="radio" name="category" value="design" />{" "}
                        Design
                      </label>

                      <label className="font-medium">
                        <Field type="radio" name="category" value="food" /> Food
                      </label>
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </main>

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
              : "The blog was succesfully created"}
          </p>
        </div>
      ) : null}

      <a href="/" id="home-anchor-create_post" className="hidden"/>
    </>
  );
}

export default CreatePost;
