import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Check, X, Shield, ArrowLeft, CheckCircle } from "lucide-react";
import AuthLayout from "../../components/auth/AuthLayout";
import PasswordField from "../../components/auth/PasswordField";
import AuthButton from "../../components/auth/AuthButton";
import FullPageLoader from "../../components/ui/FullPageLoader";
import useAuth from "../../hooks/useAuth";

const ResetPasswordPage = () => {
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const { resetPassword, loading } = useAuth();

  useEffect(() => {
    if (!token) {
      setErrors({ submit: "Token không hợp lệ hoặc đã hết hạn." });
    }
  }, [token]);

  // Kiểm tra độ mạnh mật khẩu
  const checkPasswordStrength = (password) => {
    const strength = {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setPasswordStrength(strength);
    return strength;
  };

  // Kiểm tra mật khẩu có đạt yêu cầu không
  const isPasswordValid = (strength) => {
    return Object.values(strength).every(Boolean);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));

    // Hiển thị strength indicator khi user bắt đầu nhập password
    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.password.trim()) {
      newErrors.password = "Vui lòng nhập mật khẩu mới";
    } else {
      const strength = checkPasswordStrength(form.password);
      if (!isPasswordValid(strength)) {
        newErrors.password =
          "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt";
      }
    }

    if (!form.confirmPassword.trim()) {
      newErrors.confirmPassword = "Vui lòng nhập lại mật khẩu";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu nhập lại không khớp";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!token) {
      setErrors({ submit: "Token không hợp lệ hoặc đã hết hạn." });
      return;
    }

    const result = await resetPassword(token, form);
    if (result) {
      setSubmitted(true);
      setTimeout(() => {
        navigate("/auth/signin");
      }, 3000);
    } else {
      setErrors({ submit: "Đặt lại mật khẩu thất bại. Vui lòng thử lại." });
    }
  };

  const getStrengthColor = () => {
    const validCount = Object.values(passwordStrength).filter(Boolean).length;
    if (validCount <= 2) return "text-red-500";
    if (validCount <= 4) return "text-yellow-500";
    return "text-green-500";
  };

  const getStrengthText = () => {
    const validCount = Object.values(passwordStrength).filter(Boolean).length;
    if (validCount <= 2) return "Yếu";
    if (validCount <= 4) return "Trung bình";
    return "Mạnh";
  };

  const getStrengthProgress = () => {
    const validCount = Object.values(passwordStrength).filter(Boolean).length;
    return (validCount / 5) * 100;
  };

  const StrengthIndicator = ({ label, isValid }) => (
    <div className="flex items-center space-x-2 text-sm">
      {isValid ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <X className="w-4 h-4 text-red-500" />
      )}
      <span className={isValid ? "text-green-600" : "text-gray-600"}>
        {label}
      </span>
    </div>
  );

  return (
    <AuthLayout>
      {loading && <FullPageLoader />}

      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Đặt lại mật khẩu
          </h2>
          <p className="text-gray-600 text-sm">
            Tạo mật khẩu mới an toàn cho tài khoản của bạn
          </p>
        </div>

        {submitted ? (
          <div className="text-center space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Thành công!
              </h3>
              <p className="text-green-700 text-sm">
                Mật khẩu đã được cập nhật thành công. Đang chuyển hướng đến
                trang đăng nhập...
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <PasswordField
                  label="Mật khẩu mới"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  error={errors.password}
                  placeholder="Nhập mật khẩu mới"
                />

                {/* Password Strength Indicator */}

                <div className="mt-3 p-4 bg-amber-50 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Độ mạnh mật khẩu:
                    </span>
                    <span
                      className={`text-sm font-semibold ${getStrengthColor()}`}
                    >
                      {getStrengthText()}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        getStrengthProgress() <= 40
                          ? "bg-red-500"
                          : getStrengthProgress() <= 80
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${getStrengthProgress()}%` }}
                    />
                  </div>

                  {/* Requirements */}
                  <div className="space-y-1">
                    <StrengthIndicator
                      label="Ít nhất 8 ký tự"
                      isValid={passwordStrength.minLength}
                    />
                    <StrengthIndicator
                      label="Có chữ hoa (A-Z)"
                      isValid={passwordStrength.hasUppercase}
                    />
                    <StrengthIndicator
                      label="Có chữ thường (a-z)"
                      isValid={passwordStrength.hasLowercase}
                    />
                    <StrengthIndicator
                      label="Có số (0-9)"
                      isValid={passwordStrength.hasNumber}
                    />
                    <StrengthIndicator
                      label="Có ký tự đặc biệt (!@#$%^&*)"
                      isValid={passwordStrength.hasSpecialChar}
                    />
                  </div>
                </div>
              </div>

              <PasswordField
                label="Nhập lại mật khẩu"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                placeholder="Xác nhận mật khẩu mới"
              />

              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-700 text-sm text-center">
                    {errors.submit}
                  </p>
                </div>
              )}

              <AuthButton
                label="Xác nhận đặt lại mật khẩu"
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              />
            </form>

            <div className="text-center">
              <a
                href="/auth/signin"
                className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Quay lại đăng nhập
              </a>
            </div>
          </div>
        )}
      </div>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
