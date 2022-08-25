import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter email"),
  password: Yup.string()
    .min(5, "Password is too short - should be 5 minimum characters")
    .required("Please enter password"),
});

export const registerSchema = Yup.object({
  name: Yup.string().min(3).max(50).required("Please enter name"),
  age: Yup.number()
    .min(10)
    .max(99)
    .positive("Must be a positive number")
    .required("Please enter age"),
  country: Yup.string()
    .min(5)
    .max(50)
    .matches(/^[A-Za-z]+$/, "Please enter alpha characters")
    .required("Please enter country"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter email"),
  password: Yup.string()
    .min(5, "Password is too short - should be 5 minimum characters")
    .required("Please enter password"),
  cPassword: Yup.string()
    .min(5, "Password is too short - should be 5 minimum characters")
    .required("Please confirm the password")
    .oneOf([Yup.ref("password")], "Passwords do no match"),
});
