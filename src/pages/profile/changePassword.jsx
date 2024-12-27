import React from "react";
import { useFormik } from "formik";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toast } from "@utils";
import { updatePasswordValidation } from "@validators";
import { TOAST } from "@constants";
import { hooks } from "@api";

export function ChangePassword() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const [updatePassword, { isLoading: isUpdating }] =
    hooks.useUpdatePasswordMutation();

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: updatePasswordValidation,
    onSubmit: (values) => {
      updatePassword({
        id: user._id,
        payload: {
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        },
      })
        .unwrap()
        .then((response) => {
          if (response.status) {
            Toast(TOAST.SUCCESS, "Password updated successfully!");
            navigate("/dashboard");
          } else {
            Toast(
              TOAST.ERROR,
              response.error?.data?.message || "Error updating password.",
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

  return (
    <section className="p-8">
      {isUpdating ? (
        <div className="loader">
          <FadeLoader color="#FAF7F7" loading={true} size={50} />
        </div>
      ) : (
        <>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 mb-6 rounded-md text-light-default bg-primary-default"
          >
            Go Back
          </button>
          <div className="max-w-3xl p-8 mx-auto rounded-lg shadow-lg bg-light-default">
            <h1 className="mb-8 text-3xl font-bold text-primary-default">
              Change Password
            </h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="block mb-2 text-lg font-semibold text-dark-default"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  placeholder="Enter new password"
                  className={`w-full p-4 text-lg placeholder-gray-400 border rounded-md bg-light-default text-dark-default focus:ring-2 focus:ring-primary-default focus:outline-none ${
                    formik.errors.newPassword && formik.touched.newPassword
                      ? "border-error-default"
                      : ""
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.newPassword}
                />
                {formik.errors.newPassword && formik.touched.newPassword && (
                  <p className="mt-2 text-xl text-error-default">
                    {formik.errors.newPassword}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-lg font-semibold text-dark-default"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm new password"
                  className={`w-full p-4 text-lg placeholder-gray-400 border rounded-md bg-light-default text-dark-default focus:ring-2 focus:ring-primary-default focus:outline-none ${
                    formik.errors.confirmPassword &&
                    formik.touched.confirmPassword
                      ? "border-error-default"
                      : ""
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                />
                {formik.errors.confirmPassword &&
                  formik.touched.confirmPassword && (
                    <p className="mt-2 text-xl text-error-default">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>

              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="px-20 py-3 text-lg rounded-md text-light-default bg-primary-default"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </section>
  );
}
