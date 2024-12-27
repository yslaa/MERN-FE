import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { FadeLoader } from "react-spinners";
import { forgotPasswordValidation } from "@validators";
import { Toast } from "@utils";
import { TOAST } from "@constants";
import { hooks } from "@api";
import { MyCarousel } from "@components";

export function ForgotPassword() {
  const navigate = useNavigate();

  const [forgotPassword, { isLoading }] = hooks.useForgotPasswordMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordValidation,
    onSubmit: (values) => {
      forgotPassword({ email: values.email })
        .unwrap()
        .then((res) => {
          if (res.status) {
            Toast(TOAST.SUCCESS, res.message);
            navigate("/resetLink");
          } else
            Toast(
              TOAST.ERROR,
              res.error?.data?.message || "Email not found. Please try again.",
            );
        })
        .catch((error) => {
          Toast(
            TOAST.ERROR,
            error?.data?.message ||
              "An unexpected error occurred. Please try again.",
          );
        });
    },
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
          <div className="relative w-full h-screen py-32 overflow-y-auto scrollbar-thin">
            <div className="absolute top-0 left-0 p-8 cursor-pointer">
              <div
                onClick={() => navigate("/")}
                className="grid grid-cols-[40%_60%] items-center justify-center"
              >
                <FaChevronLeft size={25} />
                <p className="text-3xl text-light-secondary">Back</p>
              </div>
            </div>

            <div className="px-6 2xl:px-36 xl:px-28 lg:px-20 md:px-10">
              <h1 className="mb-2 text-4xl font-semibold">Forgot Password</h1>
              <p className="mb-4 text-lg">Enter your email to continue</p>
              <hr className="mb-8" />

              <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-lg font-medium"
                  >
                    Email address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Your Email"
                    className={`text-lg w-full p-4 border rounded-md ${
                      formik.errors.email && formik.touched.email
                        ? "border-error-default"
                        : "border-light-secondary"
                    } text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <p className="mt-2 text-lg text-error-default">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="px-20 py-3 my-6 text-xl rounded-md bg-secondary-variant text-light-default"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
