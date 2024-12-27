import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { editUserValidation } from "@validators";
import { Toast } from "@utils";
import { TOAST } from "@constants";
import { hooks } from "@api";

export function EditProfile() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const [previewImages, setPreviewImages] = useState([]);

  const [editUser, { isLoading: isEditing }] = hooks.useEditUserMutation();

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      image: [],
    },
    validationSchema: editUserValidation,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("email", values.email);
      values.image.forEach((file) => {
        formData.append("image", file);
      });

      editUser({
        id: user._id,
        payload: formData,
      })
        .unwrap()
        .then((response) => {
          if (response.status) {
            Toast(TOAST.SUCCESS, "Profile updated successfully!");
            navigate("/dashboard");
          } else {
            Toast(
              TOAST.ERROR,
              response.error?.data?.message || "Error updating profile.",
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
    enableReinitialize: true,
  });

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      formik.setValues({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        image: [],
      });

      if (Array.isArray(user?.image) && user?.image.length > 0) {
        setPreviewImages(user?.image.map((img) => img.url));
      } else {
        setPreviewImages([]);
      }
    }
  }, [user]);

  const handleImageChange = (event) => {
    const files = Array.from(event.currentTarget.files);
    formik.setFieldValue("image", files);
    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(filePreviews);
  };

  return (
    <section className="p-8">
      {isEditing ? (
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
              Edit Profile
            </h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-lg font-semibold text-dark-default"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Enter first name"
                  className={`w-full p-4 text-lg placeholder-gray-400 border rounded-md bg-light-default text-dark-default focus:ring-2 focus:ring-primary-default focus:outline-none ${
                    formik.errors.firstName && formik.touched.firstName
                      ? "border-error-default"
                      : ""
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                />
                {formik.errors.firstName && formik.touched.firstName && (
                  <p className="mt-2 text-xl text-error-default">
                    {formik.errors.firstName}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-lg font-semibold text-dark-default"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Enter last name"
                  className={`w-full p-4 text-lg placeholder-gray-400 border rounded-md bg-light-default text-dark-default focus:ring-2 focus:ring-primary-default focus:outline-none ${
                    formik.errors.lastName && formik.touched.lastName
                      ? "border-error-default"
                      : ""
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                />
                {formik.errors.lastName && formik.touched.lastName && (
                  <p className="mt-2 text-xl text-error-default">
                    {formik.errors.lastName}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block mb-2 text-lg font-semibold text-dark-default"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  className={`w-full p-4 text-lg placeholder-gray-400 border rounded-md bg-light-default text-dark-default focus:ring-2 focus:ring-primary-default focus:outline-none ${
                    formik.errors.email && formik.touched.email
                      ? "border-error-default"
                      : ""
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
                  htmlFor="image"
                  className="block mb-2 text-lg font-semibold text-dark-default"
                >
                  Profile Picture
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  multiple
                  className={`w-full p-4 text-lg placeholder-gray-400 border rounded-md bg-light-default text-dark-default focus:ring-2 focus:ring-primary-default focus:outline-none ${
                    formik.errors.image && formik.touched.image
                      ? "border-error-default"
                      : ""
                  }`}
                  onChange={handleImageChange}
                />
                {formik.errors.image && formik.touched.image && (
                  <p className="mt-2 text-xl text-error-default">
                    {formik.errors.image}
                  </p>
                )}
              </div>

              {previewImages.length > 0 && (
                <div className="mb-6">
                  <label className="block mb-2 text-lg font-semibold text-dark-default">
                    Preview Images
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {previewImages.map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt={`Preview ${index + 1}`}
                        className="object-cover w-32 h-32 border rounded-lg shadow-md border-primary-default"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="px-20 py-3 text-lg rounded-md text-light-default bg-primary-default"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </section>
  );
}
