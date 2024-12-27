import React, { useEffect } from "react";
import { useFormik } from "formik";
import { FadeLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";
import { hooks } from "@api";
import { editInventoryValidation } from "@validators";
import { Toast } from "@utils";
import { TOAST } from "@constants";

export function EditInventory() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [editInventory, { isLoading: isEditing }] =
    hooks.useEditInventoryMutation();

  const { data: inventoryData, isLoading: isFetching } =
    hooks.useGetSingleInventoryQuery(id);

  const formik = useFormik({
    initialValues: {
      quantity: "",
      warehouseLocation: "",
    },
    validationSchema: editInventoryValidation,
    onSubmit: async (values) => {
      editInventory({ id: inventoryData.data._id, payload: values })
        .unwrap()
        .then(() => {
          Toast(TOAST.SUCCESS, "Inventory updated successfully!");
          navigate("/dashboard/inventory");
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
    if (inventoryData?.data) {
      formik.setValues({
        quantity: inventoryData.data.quantity || "",
        warehouseLocation: inventoryData.data.warehouseLocation || "",
      });
    }
  }, [inventoryData]);

  return (
    <section className="p-8">
      {isEditing || isFetching ? (
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
              Edit Inventory
            </h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="quantity"
                  className="block mb-2 text-lg font-semibold text-dark-default"
                >
                  Quantity
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
                  Warehouse Location
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
                  Update Inventory
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </section>
  );
}
