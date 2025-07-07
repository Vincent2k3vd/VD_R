import React, { useState, useEffect, useRef } from "react";
import { Mail, User } from "lucide-react";
import { NavLink } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout";
import InputField from "../../components/auth/InputField";
import PasswordField from "../../components/auth/PasswordField";
import AuthButton from "../../components/auth/AuthButton";
import SocialLogin from "../../components/auth/SocialLogin";
import FullPageLoader from "../../components/ui/FullPageLoader";

import useAuth from "../../hooks/useAuth";

const RegisterPage = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const { register, loginWithGoogle, loading, errors, setErrors } = useAuth();

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  useEffect(() => {
    setErrors({});
  }, [setErrors]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = "Vui lòng nhập họ tên";
    if (!form.email.trim()) newErrors.email = "Vui lòng nhập email";
    if (!form.password.trim()) newErrors.password = "Vui lòng nhập mật khẩu";
    if (!form.confirmPassword.trim())
      newErrors.confirmPassword = "Vui lòng nhập lại mật khẩu";
    else if (form.confirmPassword !== form.password)
      newErrors.confirmPassword = "Mật khẩu nhập lại không khớp";
    if (!form.agree)
      newErrors.agree = "Bạn phải đồng ý với điều khoản & chính sách";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      if (validationErrors.username) usernameRef.current?.focus();
      else if (validationErrors.email) emailRef.current?.focus();
      else if (validationErrors.password) passwordRef.current?.focus();
      else if (validationErrors.confirmPassword)
        confirmPasswordRef.current?.focus();
      return;
    }

    console.log(form);

    await register(form);
  };

  return (
    <AuthLayout>
      {loading && <FullPageLoader />}
      <h2 className="text-2xl font-bold text-center mb-6">Tạo tài khoản</h2>

      {/* Lỗi tổng quát */}
      {errors.general && (
        <p className="text-red-400 text-sm text-center mb-4">
          {errors.general}
        </p>
      )}
      {errors.validation && (
        <p className="text-red-400 text-sm text-center mb-4">
          {errors.validation}
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <InputField
          label="Họ tên"
          name="username"
          icon={User}
          value={form.username}
          onChange={handleChange}
          error={errors.username}
          inputRef={usernameRef}
        />
        <InputField
          label="Email"
          name="email"
          icon={Mail}
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          inputRef={emailRef}
        />
        <PasswordField
          label="Mật khẩu"
          name="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          inputRef={passwordRef}
        />
        <PasswordField
          label="Nhập lại mật khẩu"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          inputRef={confirmPasswordRef}
        />

        <div className="flex items-start mb-2">
          <input
            type="checkbox"
            name="agree"
            id="agree"
            checked={form.agree}
            onChange={handleChange}
            className="mr-2 mt-1"
          />
          <label htmlFor="agree" className="text-sm text-gray-300">
            Tôi đồng ý với{" "}
            <a href="/terms" className="text-blue-400 underline">
              điều khoản
            </a>{" "}
            và{" "}
            <a href="/privacy" className="text-blue-400 underline">
              chính sách bảo mật
            </a>
          </label>
        </div>
        {errors.agree && (
          <p className="text-sm text-red-400 mt-1">{errors.agree}</p>
        )}

        <AuthButton
          label="Đăng ký"
          type="submit"
          loading={loading}
          disabled={loading}
        />
      </form>

      <span className="block text-center text-sm text-gray-400 mt-4">
        Hoặc đăng ký bằng
      </span>
      <SocialLogin onGoogleClick={(res) => loginWithGoogle(res.credential)} />

      <p className="text-sm text-center mt-4">
        Đã có tài khoản?{" "}
        <NavLink to="/auth/signin" className="text-blue-400 underline">
          Đăng nhập
        </NavLink>
      </p>
    </AuthLayout>
  );
};

export default RegisterPage;
