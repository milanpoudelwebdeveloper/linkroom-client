import * as yup from "yup";

export const firstNameSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .required("First name is required")
    .matches(
      /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
      "Please enter a valid first name"
    ),
});

export const lastNameSchema = yup.object().shape({
  lastName: yup
    .string()
    .trim()
    .required("Last name is required")
    .matches(
      /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
      "Please enter a valid last name"
    ),
});

export const emailSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Invalid email address"
    ),
});

export const usernameSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required("Username is required")
    .max(10, "Username must not exceed 10 characters")
    .matches(/^[a-z0-9]+$/i, "Username can only contain alphabets and numbers"),
});

export const userNameOrEmailValidation = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required("Email or username is required")
    .test({
      name: "emailOrUsername",
      message: "Invalid email or username",
      test: (value) => {
        if (value?.includes("@")) {
          return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
        } else {
          return /^[a-z0-9]+$/i.test(value);
        }
      },
    }),
});

export const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .trim()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[A-Z])(?=.*[@#$%^&+=])(?!.*\s).{8,}$/,
      "Password must contain at least one uppercase, one lowercase, one number and one special character"
    ),
});

export const oldPasswordSchema = yup.object().shape({
  oldPassword: yup.string().trim().required("Old password is required"),
});

export const confirmPasswordSchema = yup.object().shape({
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Please confirm your password"),
});

export const signUpSchema = yup.object().shape({
  ...firstNameSchema.fields,
  ...lastNameSchema.fields,
  ...emailSchema.fields,
  ...usernameSchema.fields,
  ...passwordSchema.fields,
  ...confirmPasswordSchema.fields,
});

export const loginSchema = yup.object().shape({
  ...userNameOrEmailValidation.fields,
  ...passwordSchema.fields,
});

export const createPasswordSchema = yup.object().shape({
  ...passwordSchema.fields,
  ...confirmPasswordSchema.fields,
});

export const resetPasswordSchema = yup.object().shape({
  ...oldPasswordSchema.fields,
  ...passwordSchema.fields,
  ...confirmPasswordSchema.fields,
});

export const editProfileSchema = yup.object().shape({
  ...emailSchema.fields,
});
