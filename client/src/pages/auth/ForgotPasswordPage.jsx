import React, { useState, useEffect } from "react";
import { Mail, ArrowLeft, CheckCircle, Clock } from "lucide-react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import AuthLayout from "../../components/auth/AuthLayout";
import InputField from "../../components/auth/InputField";
import AuthButton from "../../components/auth/AuthButton";
import FullPageLoader from "../../components/ui/FullPageLoader";
import useAuth from "../../hooks/useAuth";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [error, setError] = useState("");
  const { forgotPassword, loading } = useAuth();

  // Đếm ngược gửi lại liên kết
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  const validateEmail = (email) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Vui lòng nhập địa chỉ email hợp lệ.");
      return;
    }

    try {
      await forgotPassword(email);
      setSubmitted(true);
      setResendTimer(30);
      setError("");
      toast.success(
        "Liên kết khôi phục đã được gửi. Vui lòng kiểm tra email của bạn."
      );
    } catch (err) {
      console.error(err);
      setError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
  };

  const handleResendLink = async () => {
    if (!validateEmail(email)) {
      setError("Vui lòng nhập địa chỉ email hợp lệ.");
      return;
    }

    try {
      await forgotPassword(email);
      setResendTimer(30);
      setError("");
      toast.success("Liên kết khôi phục đã được gửi lại.");
    } catch (err) {
      console.error("Lỗi gửi lại liên kết:", err);
      setError("Đã xảy ra lỗi khi gửi lại liên kết.");
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <AuthLayout>
      {loading && <FullPageLoader />}

      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Quên mật khẩu?</h2>
        </div>

        {!submitted ? (
          <div className="space-y-6">
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <InputField
                label="Địa chỉ Email"
                name="email"
                icon={Mail}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                error={error}
                placeholder="Nhập địa chỉ email của bạn"
              />

              <AuthButton
                label="Gửi liên kết đặt lại"
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                disabled={loading}
              />
            </form>

            <div className="text-center">
              <NavLink
                to="/auth/signin"
                className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Quay lại đăng nhập
              </NavLink>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6">
            {/* Success State */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  Email đã được gửi!
                </h3>
                <p className="text-green-700 text-sm">
                  Chúng tôi đã gửi liên kết khôi phục mật khẩu đến
                </p>
                <p className="text-green-800 font-medium text-sm mt-1">
                  {email}
                </p>
              </div>

              <div className="text-xs text-green-600 bg-green-100 rounded-lg p-3">
                💡 Kiểm tra cả thư mục spam nếu bạn không thấy email
              </div>
            </div>

            {/* Resend Section */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              {resendTimer > 0 ? (
                <div className="flex items-center justify-center text-gray-600 text-sm">
                  <Clock className="w-4 h-4 mr-2" />
                  Có thể gửi lại sau {formatTime(resendTimer)}
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Không nhận được email?
                  </p>
                  <button
                    type="button"
                    onClick={handleResendLink}
                    className="w-full bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
                  >
                    Gửi lại liên kết
                  </button>
                </div>
              )}
            </div>

            <div className="text-center">
              <NavLink
                to="/auth/signin"
                className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Quay lại đăng nhập
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
