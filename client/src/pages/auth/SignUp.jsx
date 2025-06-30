import React, { useState } from "react";
import { Mail, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import InputField from "../../components/auth/InputField";
import PasswordField from "../../components/auth/PasswordField";
import AuthButton from "../../components/auth/AuthButton";
import SocialLogin from "../../components/auth/SocialLogin";
import FullPageLoader from "../../components/ui/FullPageLoader";
import Auth from "../../services/Auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../stores/authSlice";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
    if (!form.fullName.trim()) newErrors.fullName = "Vui lòng nhập họ tên";
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

    const validationErrors = validate();
    setLoading(true);
    try {
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      await Auth.signup(form.fullName, form.email, form.password);
      toast.success("Đăng ký thành công!! Kiểm tra mail để xác thực.");
      navigate("/auth/signin");
    } catch (error) {
      toast.error("Đăng ký thất bại. Vui lòng thử lại sau!!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginGoogle = async (credentialResponse) => {
    try {
      setLoading(true);

      const id_token = credentialResponse.credential;

      const response = await Auth.loginGoogle(id_token);

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
      <h2 className="text-2xl font-bold text-center mb-6">Tạo tài khoản</h2>
      <form onSubmit={handleSubmit} noValidate>
        <InputField
          label="Họ tên"
          name="fullName"
          icon={User}
          value={form.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />
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
        <PasswordField
          label="Nhập lại mật khẩu"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            name="agree"
            id="agree"
            checked={form.agree}
            onChange={handleChange}
            className="mr-2"
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

        <AuthButton label="Đăng ký" type="submit" />
      </form>

      <span className="block text-center text-sm text-gray-400 mt-4">
        Hoặc đăng ký bằng
      </span>
      <SocialLogin onGoogleClick={handleLoginGoogle} />
      <p className="text-sm text-center mt-4">
        Đã có tài khoản?{" "}
        <NavLink to="/auth/signin" className="text-blue-400 underline">
          Đăng nhập
        </NavLink>
      </p>
    </AuthLayout>
  );
};

export default SignUp;
