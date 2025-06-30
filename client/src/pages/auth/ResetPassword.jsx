import React, { useState } from "react";
import AuthLayout from "../../components/auth/AuthLayout";
import PasswordField from "../../components/auth/PasswordField";
import AuthButton from "../../components/auth/AuthButton";
import Auth from "../../services/Auth";
import FullPageLoader from "../../components/ui/FullPageLoader";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.password.trim()) {
      newErrors.password = "Vui lòng nhập mật khẩu mới";
    } else if (form.password.length < 6) {
      newErrors.password = "Mật khẩu phải từ 6 ký tự";
    }

    if (!form.confirmPassword.trim()) {
      newErrors.confirmPassword = "Vui lòng nhập lại mật khẩu";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu nhập lại không khớp";
    }

    return newErrors;
  };

  // Lấy token từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      const response = await Auth.resetPassword(token, form.password);
      if (response.success) {
        setSubmitted(true);
      } else {
        setErrors({ submit: response.message });
      }
    } catch (error) {
      setErrors({ submit: "Đã xảy ra lỗi. Vui lòng thử lại sau." });
      setLoading(false);
      console.error("Error during password reset:", error);
    } finally {
      setLoading(false);
    }
    setSubmitted(true);
  };

  return (
    <AuthLayout>
      {loading && <FullPageLoader />}
      <h2 className="text-2xl font-bold text-center mb-6">Đặt lại mật khẩu</h2>

      {submitted ? (
        <p className="text-green-500 text-center mt-4 bg-black p-4 rounded-lg shadow-md text-xl">
          Mật khẩu đã được cập nhật thành công. Bạn có thể đăng nhập lại.
        </p>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <PasswordField
            label="Mật khẩu mới"
            name="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />
          <PasswordField
            label="Nhập lại mật khẩu"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
          <AuthButton label="Xác nhận đặt lại mật khẩu" />
        </form>
      )}

      <p className="text-sm text-center mt-4">
        <a href="/auth/signin" className="text-blue-400 underline">
          Quay lại đăng nhập
        </a>
      </p>
    </AuthLayout>
  );
};

export default ResetPassword;
