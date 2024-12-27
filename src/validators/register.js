import * as yup from "yup";

export const registerValidation = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
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
