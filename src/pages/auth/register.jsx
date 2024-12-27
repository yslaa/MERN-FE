import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { FadeLoader } from "react-spinners";
import { MyCarousel } from "@components";
import { PasswordVisibility, Toast } from "@utils";
import { registerValidation } from "@validators";
import { hooks } from "@api";
import { TOAST } from "@constants";

export function Register() {
  const navigate = useNavigate();
  const { isPasswordVisible, togglePasswordVisibility } = PasswordVisibility();
  const [isChecked, setIsChecked] = useState(true);

  const [registerUser, { isLoading }] = hooks.useRegisterUserMutation();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      role: "Customer",
      email: "",
      password: "",
      image: [],
    },
    validationSchema: registerValidation,

    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("role", values.role);
      formData.append("email", values.email);
      formData.append("password", values.password);
      values.image.forEach((file) => {
        formData.append("image", file);
      });

      registerUser(formData)
        .unwrap()
        .then((res) => {
          if (res.status) {
            Toast(TOAST.SUCCESS, "Registration successful!");
            navigate("/");
          } else {
            Toast(
              TOAST.ERROR,
              res.error?.data?.message ||
                "Something went wrong. Please try again.",
            );
          }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isChecked) {
      Toast(TOAST.ERROR, "You must agree to the terms and conditions.");
      return;
    }
    formik.handleSubmit();
  };

  return (
    <section className="grid min-h-screen grid-cols-1 md:grid-cols-2 bg-dark-default text-light-default">
      <MyCarousel />
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FAF7F7" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="relative w-full h-screen py-32 overflow-y-auto">
            <div
              className="absolute top-0 left-0 p-8 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="grid grid-cols-[40%_60%] items-center justify-center">
                <FaChevronLeft size={25} />
                <p className="text-3xl text-light-secondary">Back</p>
              </div>
            </div>

            <div className="px-6 2xl:px-36 xl:px-28 lg:px-20 md:px-10">
              <h1 className="mb-1 text-4xl font-semibold">Register</h1>
              <p className="mb-2 text-lg">Your details are required.</p>
              <hr className="mb-8" />

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-lg font-medium"
                  >
                    First Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="Enter your first name"
                    className={`text-lg w-full p-4 border rounded-md ${
                      formik.errors.firstName && formik.touched.firstName
                        ? "border-error-default"
                        : "border-light-default"
                    } text-light-default capitalize placeholder-light-default focus:border-info-secondary focus:outline-none`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                  />
                  {formik.errors.firstName && formik.touched.firstName && (
                    <p className="mt-2 text-lg text-error-default">
                      {formik.errors.firstName}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-lg font-medium"
                  >
                    Last Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Enter your last name"
                    className={`text-lg w-full p-4 border rounded-md ${
                      formik.errors.lastName && formik.touched.lastName
                        ? "border-error-default"
                        : "border-light-default"
                    } text-light-default capitalize placeholder-light-default focus:border-info-secondary focus:outline-none`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                  />
                  {formik.errors.lastName && formik.touched.lastName && (
                    <p className="mt-2 text-lg text-error-default">
                      {formik.errors.lastName}
                    </p>
                  )}
                </div>
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
                    placeholder="Enter your email address"
                    className={`text-lg w-full p-4 border rounded-md ${
                      formik.errors.email && formik.touched.email
                        ? "border-error-default"
                        : "border-light-default"
                    } text-light-default placeholder-light-default focus:border-info-secondary focus:outline-none`}
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
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-lg font-medium"
                  >
                    Create password <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      id="password"
                      placeholder="Enter password"
                      className={`text-lg w-full p-4 border rounded-md ${
                        formik.errors.password && formik.touched.password
                          ? "border-error-default"
                          : "border-light-default"
                      } text-light-default placeholder-light-default focus:border-info-secondary focus:outline-none`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute text-lg transform -translate-y-1/2 right-8 top-1/2 text-light-secondary"
                    >
                      {isPasswordVisible ? "Hide" : "Show"}
                    </button>
                  </div>
                  {formik.errors.password && formik.touched.password && (
                    <p className="mt-2 text-lg text-error-default">
                      {formik.errors.password}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="image"
                    className="block mb-2 text-lg font-medium"
                  >
                    Image <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    id="image"
                    name="image"
                    autoComplete="off"
                    onChange={(event) => {
                      const files = Array.from(event.currentTarget.files);
                      formik.setFieldValue("image", files);
                    }}
                    onBlur={formik.handleBlur}
                    multiple
                    className={`text-lg w-full p-4 border rounded-md ${
                      formik.errors.image && formik.touched.image
                        ? "border-error-default"
                        : "border-light-default"
                    } text-light-default placeholder-light-default focus:border-info-secondary focus:outline-none bg-dark-secondary`}
                  />
                  {formik.errors.image && formik.touched.image && (
                    <p className="mt-2 text-lg text-error-default">
                      {formik.errors.image}
                    </p>
                  )}
                </div>

                <label
                  htmlFor="terms"
                  className="relative flex items-center pt-3 pb-20 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="terms"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="w-5 h-5 rounded-sm appearance-none cursor-pointer bg-light-default peer checked:bg-info-default checked:border-transparent checked:ring-2 checked:ring-info-default checked:ring-offset-2 checked:ring-offset-light-default"
                  />
                  <span className="ml-4 text-lg text-light-default">
                    I agree to the
                    <a href="#" className="ml-1 underline">
                      terms & conditions
                    </a>
                  </span>
                </label>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="px-20 py-3 text-lg rounded-md bg-secondary-variant text-light-default"
                  >
                    Register Account
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
