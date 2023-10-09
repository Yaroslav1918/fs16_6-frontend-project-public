import * as yup from "yup";

export const signIn = yup
  .object({
    userName: yup.string().max(20).required(),
    email: yup.string().required(),
    feedback: yup.string().min(8).max(200).required(),
  })
  .required();

export const registerValidation = yup
  .object({
    name: yup.string().max(20).required(),
    email: yup.string().required(),
    password: yup.string().min(7).max(30).required(),
    avatar: yup.string().required(),
  })
  .required();
