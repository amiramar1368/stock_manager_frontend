import * as yup from "yup";

export const userValidator = yup.object().shape({
  fullname: yup
    .string("fullname must be string")
    .trim()
    .required("fullname is required")
    .test("len", "fullname must be more than 3 characters", (val) => val.length > 3),
  username: yup
    .string("username must be string")
    .trim()
    .required("username is required")
    .test("len", "username must be more than 3 characters", (val) => val.length > 3),
  password: yup
    .string()
    .trim()
    .required("password is required")
    .test("len", "password must be more than 3 characters", (val) => val.length > 3),
  confirmPassword: yup
    .string()
    .trim()
    .required("confirmPassword is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  roleId: yup.number().positive().required("role is required"),
});
export const editUserValidator = yup.object().shape({
  fullname: yup
    .string("fullname must be string")
    .trim()
    .required("fullname is required")
    .test("len", "fullname must be more than 3 characters", (val) => val.length > 3),
  username: yup
    .string("username must be string")
    .trim()
    .required("username is required")
    .test("len", "username must be more than 3 characters", (val) => val.length > 3),
  password: yup
    .string()
    .trim()
    .required("password is required")
    .test("len", "password must be more than 3 characters", (val) => val.length > 3),
  roleId: yup.number().positive().required("role is required"),
});
