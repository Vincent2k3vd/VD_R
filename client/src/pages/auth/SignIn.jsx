import React, { useState } from "react";
import { Mail } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AuthLayout from "../../components/auth/AuthLayout";
import InputField from "../../components/auth/InputField";
import PasswordField from "../../components/auth/PasswordField";
import AuthButton from "../../components/auth/AuthButton";
import SocialLogin from "../../components/auth/SocialLogin";
import FullPageLoader from "../../components/ui/FullPageLoader";

import Authservice from "../../services/Auth";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../stores/authSlice";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = "Vui lòng nhập email";
    if (!form.password.trim()) newErrors.password = "Vui lòng nhập mật khẩu";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(import.meta.env.GOOGLE_CLIENT_ID);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await Authservice.signin(
        form.email,
        form.password,
        form.remember
      );

      if (response.error) {
        setErrors({ email: response.error });
        toast.error("Tài khoản hoặc mật khẩu không đúng.");
        return;
      }

      dispatch(
        setCredentials({
          user: response.user,
          accessToken: response.accessToken,
        })
      );

      if (form.remember) {
        localStorage.setItem("remember", "true");
      } else {
        localStorage.removeItem("remember");
      }

      toast.success("Đăng nhập thành công!");
      navigator("/");
    } catch (err) {
      toast.error("Đăng nhập thất bại. Vui lòng thử lại.");
      setForm((prev) => ({ ...prev, password: "" }));
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginGoogle = async (credentialResponse) => {
    try {
      setLoading(true);

      const id_token = credentialResponse.credential;

      const response = await Authservice.loginGoogle(id_token);

      if (response?.error) {
        toast.error("Đăng nhập bằng Google thất bại.");
        return;
      }

      dispatch(
        setCredentials({
          user: response.user,
          accessToken: response.accessToken,
        })
      );

      if (form.remember) {
        localStorage.setItem("remember", "true");
      } else {
        localStorage.removeItem("remember");
      }

      toast.success("Đăng nhập thành công!");
      navigator("/");
    } catch (err) {
      toast.error("Đăng nhập thất bại. Vui lòng thử lại.");
      setForm((prev) => ({ ...prev, password: "" }));
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
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
              className="mr-2 rounded border-gray-300 focus:ring-blue-500"
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

        <div className="text-center mt-4">
          <p className="text-white/50 text-sm">
            Bằng cách đăng nhập, bạn đồng ý với{" "}
            <button className="text-blue-400 hover:text-blue-300 transition-colors">
              Điều khoản dịch vụ
            </button>{" "}
            và{" "}
            <button className="text-blue-400 hover:text-blue-300 transition-colors">
              Chính sách bảo mật
            </button>
          </p>
        </div>

        <AuthButton type="submit" label="Đăng nhập" loading={loading} />
      </form>

      <span className="block text-center text-sm text-gray-400 mt-4">
        Hoặc đăng nhập bằng
      </span>
      <SocialLogin onGoogleClick={handleLoginGoogle} />
      <p className="text-sm text-center mt-4">
        Bạn chưa có tài khoản?{" "}
        <NavLink to="/auth/signup" className="text-blue-400 underline">
          Đăng ký
        </NavLink>
      </p>
    </AuthLayout>
  );
};

export default SignIn;
