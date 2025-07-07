export const validateSignIn = ({ email, password }) => {
  const errors = {};
  if (!email) errors.email = "Email không được để trống";
  if (!password) errors.password = "Mật khẩu không được để trống";
  return errors;
};
