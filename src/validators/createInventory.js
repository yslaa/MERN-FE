import * as yup from "yup";

export const createInventoryValidation = yup.object().shape({
  product: yup.string().required("Product is required"),
  quantity: yup
    .number()
    .required("Quantity is required")
    .min(1, "Quantity must be greater than or equal to 1"),
  warehouseLocation: yup
    .string()
    .required("Warehouse location is required")
    .min(3, "Warehouse location must be at least 3 characters long"),
});
