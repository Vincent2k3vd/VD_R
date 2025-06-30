import React, { useState, useEffect } from "react";
import { Mail } from "lucide-react";
import { NavLink } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import InputField from "../../components/auth/InputField";
import AuthButton from "../../components/auth/AuthButton";
import Auth from "../../services/Auth";
import { toast } from "react-toastify";
import FullPageLoader from "../../components/ui/FullPageLoader";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0); // 👈 Timer state

  // Đếm ngược thời gian mỗi giây
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
    try {
      setLoading(true);
      if (!validateEmail(email)) {
        setError("Vui lòng nhập địa chỉ email hợp lệ.");
        return;
      }

      const response = await Auth.forgotPassword(email);
      if (!response.success) {
        setError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
        return;
      }

      setTimeout(() => {
        setSubmitted(true);
        setResendTimer(30); // 👈 Bắt đầu đếm ngược 30s
        setEmail("");
        setError("");
      }, 1000);
    } catch (err) {
      console.error("Error during password reset:", err);
      setError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendLink = () => {
    if (!validateEmail(email)) {
      setError("Vui lòng nhập địa chỉ email hợp lệ.");
      return;
    }

    Auth.forgotPassword(email)
      .then((response) => {
        if (response.success) {
          setError("");
          toast.success("Liên kết khôi phục đã được gửi lại.");
          setResendTimer(30); // 👈 Reset lại timer mỗi khi gửi
        } else {
          setError("Đã xảy ra lỗi khi gửi lại liên kết.");
        }
      })
      .catch((error) => {
        console.error("Error resending link:", error);
        setError("Đã xảy ra lỗi khi gửi lại liên kết.");
      });
  };

  return (
    <AuthLayout>
      {loading && <FullPageLoader />}
      <h2 className="text-2xl font-bold text-center mb-6">Quên mật khẩu</h2>

      <form onSubmit={handleSubmit} noValidate>
        <InputField
          label="Email"
          name="email"
          icon={Mail}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          error={error}
        />

        {submitted ? (
          <div className="text-green-500 text-center mt-4 space-y-2">
            <p className="text-lg font-semibold">
              Liên kết khôi phục đã được gửi. Vui lòng kiểm tra email của bạn.
            </p>
            {resendTimer > 0 ? (
              <p className="text-sm text-gray-500">
                Bạn có thể gửi lại sau {resendTimer}s
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResendLink}
                className="mt-6 w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-xl transition hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                Gửi lại liên kết
              </button>
            )}
          </div>
        ) : error ? (
          <div className="text-red-500 text-center mb-4">
            <p>{error}</p>
          </div>
        ) : (
          <AuthButton
            label={"Gửi liên kết đặt lại mật khẩu"}
            type="submit"
            className="w-full"
          ></AuthButton>
        )}
      </form>

      <p className="text-sm text-center mt-4">
        <NavLink to="/auth/signin" className="text-blue-400 underline">
          Quay lại đăng nhập
        </NavLink>
      </p>
    </AuthLayout>
  );
};

export default ForgotPassword;
