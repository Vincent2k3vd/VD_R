import React, { useState } from "react";
import { Mail } from "lucide-react";
import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { validateSignIn } from "../../utils/validators";

import AuthLayout from "../../components/auth/AuthLayout";
import InputField from "../../components/auth/InputField";
import PasswordField from "../../components/auth/PasswordField";
import AuthButton from "../../components/auth/AuthButton";
import SocialLogin from "../../components/auth/SocialLogin";
import FullPageLoader from "../../components/ui/FullPageLoader";

const LoginPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const { login, loginWithGoogle, loading, errors, setErrors } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateSignIn(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    await login(form);
  };

  return (
    <AuthLayout>
      {loading && <FullPageLoader />}
      <h2 className="text-2xl font-bold text-center mb-6">Đăng nhập</h2>
      <form onSubmit={handleSubmit} noValidate>
        <InputField
          label="Email"
          name="email"
          icon={Mail}
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />
        <PasswordField
          label="Mật khẩu"
          name="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />

        <div className="flex items-center mb-4 justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="mr-2 rounded border-gray-300"
              checked={form.remember}
              onChange={(e) => setForm({ ...form, remember: e.target.checked })}
            />
            <label htmlFor="remember" className="text-sm text-gray-300">
              Ghi nhớ đăng nhập
            </label>
          </div>
          <NavLink
            to="/auth/forgotpassword"
            className="text-blue-400 underline"
          >
            Quên mật khẩu?
          </NavLink>
        </div>

        <div className="text-center mt-4 text-white/50 text-sm">
          Bằng cách đăng nhập, bạn đồng ý với{" "}
          <button className="text-blue-400 hover:text-blue-300">
            Điều khoản dịch vụ
          </button>{" "}
          và{" "}
          <button className="text-blue-400 hover:text-blue-300">
            Chính sách bảo mật
          </button>
        </div>

        <AuthButton type="submit" label="Đăng nhập" loading={loading} />
      </form>

      <span className="block text-center text-sm text-gray-400 mt-4">
        Hoặc đăng nhập bằng
      </span>
      <SocialLogin onGoogleClick={(res) => loginWithGoogle(res.credential)} />

      <p className="text-sm text-center mt-4">
        Bạn chưa có tài khoản?{" "}
        <NavLink to="/auth/signup" className="text-blue-400 underline">
          Đăng ký
        </NavLink>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
