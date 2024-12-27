import * as Yup from "yup";

export const createTransactionValidation = Yup.object().shape({
  payment: Yup.string()
    .required("Payment method is required")
    .oneOf(["Maya", "Cash"], "Invalid payment method"),
});
