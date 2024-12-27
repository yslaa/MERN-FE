import * as yup from "yup";

const noSpecialCharacters = /^[a-zA-Z\s]+$/;

export const createProductValidation = yup.object().shape({
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
  image: yup
    .mixed()
    .test("fileRequired", "At least one image is required", (value) => {
      return value && value.length > 0;
    })
    .test("fileType", "Only image files are allowed", (value) => {
      if (!value || value.length === 0) return true;
      return value.every((file) => {
        const fileType = file.type.split("/")[0];
        return fileType === "image";
      });
    }),
});
