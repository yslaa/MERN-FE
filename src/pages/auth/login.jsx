import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { FadeLoader } from "react-spinners";
import { MyCarousel } from "@components";
import { PasswordVisibility, Toast } from "@utils";
import { loginValidation } from "@validators";
import { hooks } from "@api";
import { TOAST } from "@constants";

export function Login() {
  const navigate = useNavigate();
  const { isPasswordVisible, togglePasswordVisibility } = PasswordVisibility();
  const [loginUser, { isLoading }] = hooks.useLoginUserMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: (values) => {
      loginUser(values)
        .unwrap()
        .then((res) => {
          if (res.status) {
            Toast(TOAST.SUCCESS, "Login successful!");
          } else
            Toast(
              TOAST.ERROR,
              res.error?.data?.message ||
                "Something went wrong. Please try again.",
            );
        })
        .catch((error) => {
          const errorMessage =
            error?.data?.message ||
            "An unexpected error occurred. Please try again.";
          Toast(TOAST.ERROR, errorMessage);
        });
    },
    validateOnBlur: true,
    validateOnChange: true,
  });

  return (
    <section className="grid min-h-screen grid-cols-1 md:grid-cols-2 bg-dark-default text-light-default">
      <MyCarousel />
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FAF7F7" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="grid w-full h-screen p-12 overflow-y-auto">
            <div className="grid justify-between grid-cols-2 items">
              <h1 className="pt-3 text-3xl font-semibold">Welcome Back</h1>
              <span className="grid justify-end">
                <p className="pt-3 text-3xl">Sign in to get started</p>
              </span>
            </div>

            <hr className="mb-8" />

            <form onSubmit={formik.handleSubmit} className="">
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block mb-2 text-lg font-medium"
                >
                  Email address <span className="text-error-default">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className={`text-xl w-full p-4 border rounded-md ${
                    formik.errors.email && formik.touched.email
                      ? "border-error-default"
                      : "border-light-default"
                  } text-light-default placeholder-light-default focus:border-info-secondary focus:outline-none`}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="mt-2 text-xl text-error-default">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block mb-2 text-lg font-medium"
                >
                  Password <span className="text-error-default">*</span>
                </label>
                <div className="relative">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    id="password"
                    placeholder="Enter password"
                    className={`text-xl w-full p-4 border rounded-md ${
                      formik.errors.password && formik.touched.password
                        ? "border-error-default"
                        : "border-light-default"
                    } text-light-default placeholder-light-default focus:border-info-secondary focus:outline-none`}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute transform -translate-y-1/2 right-8 top-1/2 text-light-secondary"
                  >
                    {isPasswordVisible ? "Hide" : "Show"}
                  </button>
                </div>
                {formik.errors.password && formik.touched.password && (
                  <p className="mt-2 text-xl text-error-default">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-start pt-3 pb-6">
                <button
                  type="button"
                  onClick={() => navigate("/forgotPassword")}
                  className="text-xl underline text-light-secondary"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="px-20 py-3 text-xl rounded-md bg-secondary-variant text-dark-default/80"
                  disabled={isLoading}
                >
                  Login
                </button>
              </div>
            </form>

            <div className="grid items-center justify-center grid-cols-[40%_20%_40%] text-sm text-center">
              <hr />
              <span className="text-lg text-light-secondary">Or</span>
              <hr />
            </div>

            <div className="flex items-center justify-center mt-3">
              <button
                onClick={() => navigate("/register")}
                className="px-20 py-3 text-xl rounded-md cursor-pointer bg-secondary-default text-dark-default/80"
              >
                Register
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
