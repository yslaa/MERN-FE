import React from "react";
import { useFormik } from "formik";
import { FadeLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "@hooks";
import { createTransactionValidation } from "@validators";
import { hooks } from "@api";
import { Toast } from "@utils";
import { TOAST } from "@constants";

export function CreateTransaction() {
  const cartItems = useSelector((state) => state.cart.products);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const user = useSelector((state) => state.auth.user);
  const [createTransaction, { isLoading }] =
    hooks.useCreateTransactionMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      payment: "",
    },
    validationSchema: createTransactionValidation,
    onSubmit: async (values) => {
      const transactionData = {
        user: user._id,
        product: cartItems.map((item) => ({
          id: item._id,
          quantity: item.quantity,
        })),
        totalPrice,
        payment: values.payment,
      };
      createTransaction(transactionData)
        .unwrap()
        .then((response) => {
          console.log(response);
          Toast(TOAST.SUCCESS, "Transaction created successfully!");
          if (values.payment === "Maya") {
            window.location.href = response?.data[0]?.checkoutUrl;
          } else if (values.payment === "Cash") {
            navigate("/home");
          }
          dispatch(clearCart());
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
    <section className="p-12">
      <h1 className="mb-6 text-3xl font-bold text-primary-default">
        Complete Your Transaction
      </h1>
      {isLoading ? (
        <div className="loader">
          <FadeLoader color="#FAF7F7" loading={true} size={50} />
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-secondary-default">
              Order Summary
            </h2>
            <div className="mt-4 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-4 border rounded-lg bg-light-variant"
                >
                  <img
                    src={item.image[0]?.url}
                    alt={item.name}
                    className="object-cover w-20 h-20 rounded-lg shadow-md"
                  />
                  <div className="flex-1 ml-4">
                    <p className="text-lg font-bold text-dark-default">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-sm text-dark-default/80">
                      Price: ₱{item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <p className="text-lg font-semibold text-primary-default">
                    ₱{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="flex items-center justify-between pt-4 mt-4 border-t">
                <p className="text-xl font-bold text-dark-default">
                  Total Price:
                </p>
                <p className="text-xl font-bold text-primary-default">
                  ₱{totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div>
              <label
                htmlFor="payment"
                className="block text-lg font-semibold text-light-default"
              >
                Payment Method <span className="text-error-default">*</span>
              </label>
              <select
                id="payment"
                name="payment"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.payment}
                className={`w-full p-4 text-lg placeholder-gray-400 border rounded-md bg-light-default text-dark-default focus:ring-2 focus:ring-primary-default focus:outline-none ${
                  formik.errors.payment && formik.touched.payment
                    ? "border-error-default"
                    : ""
                }`}
              >
                <option value="">Select Payment Method</option>
                <option value="Cash">Cash</option>
                <option value="Maya">Maya</option>
              </select>
              {formik.errors.payment && formik.touched.payment && (
                <p className="mt-2 text-xl text-error-default">
                  {formik.errors.payment}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end mt-20">
              <button
                type="submit"
                className="px-6 py-2 text-lg font-semibold rounded-md bg-primary-default text-light-default hover:bg-primary-default/70"
              >
                Confirm Transaction
              </button>
            </div>
          </form>
        </>
      )}
    </section>
  );
}
