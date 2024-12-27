import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { FadeLoader } from "react-spinners";
import { MyCarousel } from "@components";
import { Toast, PasswordVisibility } from "@utils";
import { resetPasswordValidation } from "@validators";
import { TOAST } from "@constants";
import { hooks } from "@api";

export function ResetPassword() {
  const navigate = useNavigate();

  const {
    isPasswordVisible,
    togglePasswordVisibility,
    isConfirmPasswordVisible,
    toggleConfirmPasswordVisibility,
  } = PasswordVisibility();

  const [resetPassword, { isLoading }] = hooks.useResetPasswordMutation();

  const formik = useFormik({
    initialValues: {
      otp: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordValidation,
    onSubmit: (values) => {
      resetPassword({
        otpCode: values.otp,
        newPassword: values.password,
        confirmPassword: values.confirmPassword,
      })
        .unwrap()
        .then((res) => {
          if (res.status) {
            Toast(TOAST.SUCCESS, res.message);
            navigate("/");
          } else
            Toast(
              TOAST.ERROR,
              res.error?.data?.message ||
                "Failed to reset password. Please try again.",
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
          <div className="relative w-full h-screen py-32 overflow-y-auto text-[15px] scrollbar-thin">
            <div className="absolute top-0 left-0 p-8 cursor-pointer">
              <div
                onClick={() => navigate("/forgotPassword")}
                className="grid grid-cols-[40%_60%] items-center justify-center"
              >
                <FaChevronLeft size={20} />
                <p className="text-[15px] text-light-secondary">Back</p>
              </div>
            </div>

            <div className="px-6 2xl:px-36 xl:px-28 lg:px-20 md:px-10">
              <h1 className="mb-1 text-[30px] font-semibold">Reset Password</h1>
              <p className="mb-2 text-[15px]">
                Enter your OTP and new password
              </p>
              <hr className="mb-8" />

              <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="otp"
                    className="block mb-2 text-[15px] font-medium"
                  >
                    OTP <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    placeholder="Enter Your OTP"
                    className={`text-[15px] w-full p-4 border rounded-md ${
                      formik.errors.otp && formik.touched.otp
                        ? "border-error-default"
                        : "border-light-secondary"
                    } text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.otp}
                  />
                  {formik.errors.otp && formik.touched.otp && (
                    <p className="mt-2 text-[15px] text-error-default">
                      {formik.errors.otp}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-[15px] font-medium"
                  >
                    Password <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Enter password"
                      className={`text-[15px] w-full p-4 border rounded-md ${
                        formik.errors.password && formik.touched.password
                          ? "border-error-default"
                          : "border-light-secondary"
                      } text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-[15px] absolute transform -translate-y-1/2 right-8 top-1/2 text-light-secondary"
                    >
                      {isPasswordVisible ? "Hide" : "Show"}
                    </button>
                  </div>
                  {formik.errors.password && formik.touched.password && (
                    <p className="mt-2 text-[15px] text-error-default">
                      {formik.errors.password}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-[15px] font-medium"
                  >
                    Confirm Password <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={isConfirmPasswordVisible ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm New Password"
                      className={`text-[15px] w-full p-4 border rounded-md ${
                        formik.errors.confirmPassword &&
                        formik.touched.confirmPassword
                          ? "border-error-default"
                          : "border-light-secondary"
                      } text-light-default placeholder-light-secondary focus:border-info-secondary focus:outline-none`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="text-[15px] absolute transform -translate-y-1/2 right-8 top-1/2 text-light-secondary"
                    >
                      {isConfirmPasswordVisible ? "Hide" : "Show"}
                    </button>
                  </div>
                  {formik.errors.confirmPassword &&
                    formik.touched.confirmPassword && (
                      <p className="mt-2 text-[15px] text-error-default">
                        {formik.errors.confirmPassword}
                      </p>
                    )}
                </div>

                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="px-20 py-3 my-6 text-xl rounded-md bg-secondary-variant text-light-default"
                  >
                    Reset Password
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
