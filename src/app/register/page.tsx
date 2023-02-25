"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Formik, ErrorMessage, Field, Form } from "formik";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useCreateUserMutation } from "../../redux/services/account";
import { ErrorPostBlog } from "@/types/types";

const validateEmail = (values: string) => {
  let email = "";
  let reg = new RegExp(
    "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
  );

  if (!values) {
    email = "Required";
  } else if (!reg.test(values)) {
    email = "The email is not valid";
  }

  return email;
};

const validateName = (values: string) => {
  let name = "";

  if (!values) {
    name = "Required";
  } else if (values.length > 18) {
    name = "Too long";
  } else if (values.length < 4) {
    name = "Too short";
  }

  return name;
};

const validatePassword = (values: string) => {
  let password = "";

  if (!values) {
    password = "Required";
  } else if (values.length > 254) {
    password = "Too long";
  } else if (values.length < 4) {
    password = "Too short";
  }

  return password;
};

function Register() {
  const router = useRouter();
  const [createUser, result] = useCreateUserMutation();
  const [user, setUser] = useState<{ email: string; username: string }>();
  const [showPass, setShowPass] = useState(false);
  const [img, setImg] = useState<string | null>(null);
  const [error, setError] = useState<ErrorPostBlog | undefined>();
  const [showMessa, setShowMessa] = useState(false);

  useEffect(() => {
    if (result.status === "uninitialized") return;

    if (result.isSuccess) {
      window.localStorage.setItem(
        "account-blog",
        JSON.stringify({
          ...user,
          id: result.data.id,
          image: img,
        })
      );
      setShowMessa(true);

      setTimeout(() => {
        setShowMessa(false);
        router.push("/");
      }, 2000);
    } else if (result.isError) {
      setError(result.error);
      setShowMessa(true);

      setTimeout(() => {
        setShowMessa(false);
        setError(undefined);
      }, 2000);
    }
  }, [result]); //eslint-disable-line

  return (
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#9ee0df] flex flex-col items-center justify-center gap-2">
        <h1 className="font-bold text-lg text-[#1b86a7]">Register</h1>

        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
          }}
          onSubmit={(state) => {
            createUser({
              ...state,
              image: img,
            });

            setUser({
              username: state.username,
              email: state.email,
            });
          }}
        >
          {() => {
            return (
              <Form className="grid gap-4 bg-white py-8 px-6 rounded-lg">
                <div>
                  <Field
                    name="username"
                    validate={validateName}
                    type="text"
                    placeholder="Username"
                    className="w-full outline-none border-b border-[#ccc6c6] pl-2"
                  />

                  <ErrorMessage
                    name="username"
                    component="p"
                    className="text-sm font-medium text-red-600"
                  />
                </div>

                <div>
                  <Field
                    name="email"
                    validate={validateEmail}
                    type="email"
                    placeholder="Email"
                    className="w-full outline-none border-b border-[#ccc6c6] pl-2"
                  />

                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-sm font-medium text-red-600"
                  />
                </div>

                <div>
                  <div className="relative border-b border-[#ccc6c6]">
                    <Field
                      className="w-[85%] outline-none pl-2"
                      name="password"
                      type={showPass ? "text" : "password"}
                      placeholder="Password"
                      validate={validatePassword}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute top-[50%] right-2 -translate-y-[50%]"
                    >
                      {showPass ? (
                        <AiFillEye className="text-[#1b86a7] text-xl" />
                      ) : (
                        <AiFillEyeInvisible className="text-[#1b86a7] text-xl" />
                      )}
                    </button>
                  </div>

                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-sm font-medium text-red-600"
                  />
                </div>

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
                          fileReader.readAsDataURL(e.currentTarget.files[0]);

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

                <button
                  type="submit"
                  className="bg-[#1b86a7] text-white font-semibold py-1"
                >
                  Register
                </button>

                <p className="text-zinc-900">
                  Do you already have an account?{" "}
                  <Link className="text-[#1b86a7] underline" href="/login">
                    Login
                  </Link>
                </p>
              </Form>
            );
          }}
        </Formik>
      </div>

      {showMessa ? (
        <div
          className={`fixed top-[10%] left-[50%] -translate-x-[50%] rounded-xl py-2 px-4 ${
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
              : "You have succesfully registered!"}
          </p>
        </div>
      ) : null}
    </>
  );
}

export default Register;
