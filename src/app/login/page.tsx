"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter, redirect } from "next/navigation";
import { Formik, ErrorMessage, Field, Form } from "formik";
import { ErrorPostBlog } from "@/types/types";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

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

function Login() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState<ErrorPostBlog>();
  const [showMessa, setShowMessa] = useState(false);

  return (
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#9ee0df] flex flex-col items-center justify-center gap-2">
        <h1 className="font-bold text-lg text-[#1b86a7]">Login</h1>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}

          onSubmit={async ({ email, password }) => {
            const fetchDataJson = await fetch(
              `http://127.0.0.1:8000/account/login?email=${email}&password=${password}`
            );
            const fetchData = await fetchDataJson.json();

            if (fetchDataJson.ok) {
              window.localStorage.setItem(
                "account-blog",
                JSON.stringify(fetchData)
              );

              setShowMessa(true);

              setTimeout(() => {
                setShowMessa(false);
                router.push("/");
              }, 2000);
            } else {
              setError({
                data: { detail: fetchData.detail },
                status: fetchDataJson.status,
              });

              setShowMessa(true);

              setTimeout(() => {
                setShowMessa(false);

                setError(undefined)
              }, 2000);
            }
          }}
        >
          {() => {
            return (
              <Form className="grid gap-4 bg-white py-8 px-6 rounded-lg">
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
                  type="submit"
                  className="bg-[#1b86a7] text-white font-semibold py-1"
                >
                  Login
                </button>

                <p className="text-zinc-900">
                  Dont you have an account?{" "}
                  <Link className="text-[#1b86a7] underline" href="/register">
                    Register
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
              : "You have succesfully logged!"}
          </p>
        </div>
      ) : null}
    </>
  );
}

export default Login;
