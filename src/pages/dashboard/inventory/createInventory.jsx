import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { hooks } from "@api";
import { createInventoryValidation } from "@validators";
import { Toast } from "@utils";
import { TOAST } from "@constants";

export function CreateInventory() {
  const navigate = useNavigate();
  const [createInventory, { isLoading }] = hooks.useCreateInventoryMutation();
  const { data: products } = hooks.useGetAllProductsQuery();
  const [productOptions, setProductOptions] = useState([]);

  useEffect(() => {
    if (products?.data) {
      setProductOptions(products.data);
    }
  }, [products]);

  const formik = useFormik({
    initialValues: {
      product: "",
      quantity: "",
      warehouseLocation: "",
    },
    validationSchema: createInventoryValidation,
    onSubmit: async (values) => {
      createInventory(values)
        .unwrap()
        .then(() => {
          Toast(TOAST.SUCCESS, "Inventory created successfully!");
          navigate("/dashboard/inventory");
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
              Create Inventory
            </h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="product"
                  className="block mb-2 text-lg font-semibold text-dark-default"
                >
                  Product <span className="text-error-default">*</span>
                </label>
                <select
                  id="product"
                  className={`w-full p-4 text-lg placeholder-gray-400 border rounded-md bg-light-default text-dark-default focus:ring-2 focus:ring-primary-default focus:outline-none ${
                    formik.errors.product && formik.touched.product
                      ? "border-error-default"
                      : ""
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.product}
                >
                  <option value="">Select a product</option>
                  {productOptions.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.name}
                    </option>
                  ))}
                </select>
                {formik.errors.product && formik.touched.product && (
                  <p className="mt-2 text-xl text-error-default">
                    {formik.errors.product}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="quantity"
                  className="block mb-2 text-lg font-semibold text-dark-default"
                >
                  Quantity <span className="text-error-default">*</span>
                </label>
                <input
                  type="number"
                  id="quantity"
                  placeholder="Enter product quantity"
                  className={`w-full p-4 text-lg placeholder-gray-400 border rounded-md bg-light-default text-dark-default focus:ring-2 focus:ring-primary-default focus:outline-none ${
                    formik.errors.quantity && formik.touched.quantity
                      ? "border-error-default"
                      : ""
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.quantity}
                />
                {formik.errors.quantity && formik.touched.quantity && (
                  <p className="mt-2 text-xl text-error-default">
                    {formik.errors.quantity}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="warehouseLocation"
                  className="block mb-2 text-lg font-semibold text-dark-default"
                >
                  Warehouse Location{" "}
                  <span className="text-error-default">*</span>
                </label>
                <input
                  type="text"
                  id="warehouseLocation"
                  placeholder="Enter warehouse location"
                  className={`w-full p-4 text-lg placeholder-gray-400 border rounded-md bg-light-default text-dark-default focus:ring-2 focus:ring-primary-default focus:outline-none ${
                    formik.errors.warehouseLocation &&
                    formik.touched.warehouseLocation
                      ? "border-error-default"
                      : ""
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.warehouseLocation}
                />
                {formik.errors.warehouseLocation &&
                  formik.touched.warehouseLocation && (
                    <p className="mt-2 text-xl text-error-default">
                      {formik.errors.warehouseLocation}
                    </p>
                  )}
              </div>

              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="px-20 py-3 text-lg rounded-md text-light-default bg-primary-default"
                >
                  Create Inventory
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </section>
  );
}
