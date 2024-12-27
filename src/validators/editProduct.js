import * as yup from "yup";

const noSpecialCharacters = /^[a-zA-Z\s]+$/;

export const editProductValidation = yup.object().shape({
  name: yup
    .string()
    .matches(
      noSpecialCharacters,
      "Product name should not contain special characters or numbers",
    )
    .required("Product name is required"),
  description: yup.string().required("Description is required"),
  price: yup
    .number()
    .positive("Price must be a positive number")
    .required("Price is required"),
});
