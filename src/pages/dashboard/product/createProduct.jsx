import React from "react";
import { useFormik } from "formik";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { hooks } from "@api";
import { createProductValidation } from "@validators";
import { Toast } from "@utils";
import { TOAST } from "@constants";

export function CreateProduct() {
  const navigate = useNavigate();
  const [createProduct, { isLoading }] = hooks.useCreateProductMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      image: [],
    },
    validationSchema: createProductValidation,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price);
      values.image.forEach((file) => {
        formData.append("image", file);
      });
      createProduct(formData)
        .unwrap()
        .then(() => {
          Toast(TOAST.SUCCESS, "Product created successfully!");
          navigate("/dashboard/product");
        })
        .catch((error) => {
          const errorMessage =
            error?.data?.message ||
            "An unexpected error occurred. Please try again.";
          Toast(TOAST.ERROR, errorMessage);
        });
    },
  });

  return (
    <section className="p-8">
      {isLoading ? (
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
              Create Product
            </h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block mb-2 text-lg font-semibold text-dark-default"
                >
                  Product Name <span className="text-error-default">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter product name"
                  className={`w-full p-4 text-lg placeholder-gray-400 border rounded-md bg-light-default text-dark-default focus:ring-2 focus:ring-primary-default focus:outline-none ${
                    formik.errors.name && formik.touched.name
                      ? "border-error-default"
                      : ""
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.errors.name && formik.touched.name && (
                  <p className="mt-2 text-xl text-error-default">
                    {formik.errors.name}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block mb-2 text-lg font-semibold text-dark-default"
                >
                  Description <span className="text-error-default">*</span>
                </label>
                <textarea
                  id="description"
                  placeholder="Enter product description"
                  className={`w-full p-4 text-lg placeholder-gray-400 border rounded-md bg-light-default text-dark-default focus:ring-2 focus:ring-primary-default focus:outline-none ${
                    formik.errors.description && formik.touched.description
                      ? "border-error-default"
                      : ""
                  }`}
                  rows="5"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                />
                {formik.errors.description && formik.touched.description && (
                  <p className="mt-2 text-xl text-error-default">
                    {formik.errors.description}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block mb-2 text-lg font-semibold text-dark-default"
                >
                  Price <span className="text-error-default">*</span>
                </label>
                <input
                  type="number"
                  id="price"
                  placeholder="Enter product price"
                  className={`w-full p-4 text-lg placeholder-gray-400 border rounded-md bg-light-default text-dark-default focus:ring-2 focus:ring-primary-default focus:outline-none ${
                    formik.errors.price && formik.touched.price
                      ? "border-error-default"
                      : ""
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.price}
                />
                {formik.errors.price && formik.touched.price && (
                  <p className="mt-2 text-xl text-error-default">
                    {formik.errors.price}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block mb-2 text-lg font-semibold text-dark-default"
                >
                  Images <span className="text-error-default">*</span>
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
                  onChange={(event) => {
                    const files = Array.from(event.currentTarget.files);
                    formik.setFieldValue("image", files);
                  }}
                />
                {formik.errors.image && formik.touched.image && (
                  <p className="mt-2 text-xl text-error-default">
                    {formik.errors.image}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="px-20 py-3 text-lg rounded-md text-light-default bg-primary-default"
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </section>
  );
}
