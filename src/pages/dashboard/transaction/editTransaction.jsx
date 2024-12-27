import React, { useEffect } from "react";
import { useFormik } from "formik";
import { FadeLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";
import { hooks } from "@api";
import { editTransactionValidation } from "@validators";
import { Toast } from "@utils";
import { TOAST } from "@constants";

export function EditTransaction() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [editTransaction, { isLoading: isEditing }] =
    hooks.useEditTransactionMutation();

  const { data: transactionData, isLoading: isFetching } =
    hooks.useGetSingleTransactionQuery(id);

  const formik = useFormik({
    initialValues: {
      status: "",
    },
    validationSchema: editTransactionValidation,
    onSubmit: async (values) => {
      editTransaction({ id: transactionData.data._id, payload: values })
        .unwrap()
        .then(() => {
          Toast(TOAST.SUCCESS, "Transaction updated successfully!");
          navigate("/dashboard/transaction");
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
    if (transactionData?.data) {
      formik.setValues({
        status: transactionData.data.status || "Pending",
      });
    }
  }, [transactionData]);

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
              Edit Transaction
            </h1>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block mb-2 text-lg font-semibold text-dark-default"
                >
                  Status
                </label>
                <select
                  id="status"
                  className={`w-full p-4 text-lg border rounded-md bg-light-default text-dark-default focus:ring-2 focus:ring-primary-default focus:outline-none ${
                    formik.errors.status && formik.touched.status
                      ? "border-error-default"
                      : ""
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.status}
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                {formik.errors.status && formik.touched.status && (
                  <p className="mt-2 text-xl text-error-default">
                    {formik.errors.status}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="px-20 py-3 text-lg rounded-md text-light-default bg-primary-default"
                >
                  Update Transaction
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </section>
  );
}
