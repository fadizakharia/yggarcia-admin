import * as yup from "yup";

export const createBookValidator = yup.object().shape({
  body: yup.string().required().min(25),
  header: yup.string().required().min(5),
  status: yup.number().required().min(0).max(2),
  subtitle: yup.string().required().min(5),
  title: yup.string().required().min(5).max(50),
  warning_message: yup.string().min(5).max(50),
});
export const updateBookValidator = yup.object().shape({
  body: yup.string().min(25),
  header: yup.string().min(5),
  status: yup.number().min(0).max(2),
  subtitle: yup.string().min(5),
  title: yup.string().min(5).max(50),
  warning_message: yup.string().optional().min(5).max(50),
});
export const createCharacterValidator = yup.object().shape({
  category: yup.string().optional(),

  name: yup.string().min(3),

  gender: yup.string().oneOf(["male", "female"]),

  color: yup.string().min(2).max(255),

  ethnicity: yup.string().min(2).max(255),

  bio: yup.string().min(50),
});
export const updateCharacterValidator = yup.object().shape({
  id: yup.string().uuid("Invalid Id"),

  category: yup.string().optional(),

  name: yup.string().optional().min(3),

  gender: yup.string().optional().oneOf(["male", "female"]),

  color: yup.string().optional().min(2).max(255),

  ethnicity: yup.string().optional().min(2).max(255),

  bio: yup.string().optional().min(50),
});
