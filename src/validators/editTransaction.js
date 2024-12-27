import * as Yup from "yup";

export const editTransactionValidation = Yup.object().shape({
  status: Yup.string().oneOf(
    ["Pending", "Completed", "Failed"],
    "Invalid status",
  ),
});
