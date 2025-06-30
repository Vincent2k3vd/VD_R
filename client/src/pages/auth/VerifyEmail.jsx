import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  CheckCircle,
  XCircle,
  Loader2,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { jwtDecode } from "jwt-decode";

import { useNavigate, useSearchParams } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthButton from "../../components/auth/AuthButton";
import Auth from "../../services/Auth";

const VerifyEmail = () => {
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const hasVerified = useRef(false);

  const MAX_RETRY_ATTEMPTS = 3;
  const RETRY_DELAY = 2000; // 2 seconds

  const handleVerificationError = useCallback((error, retryAttempt) => {
    const errorMessage =
      typeof error === "string"
        ? error
        : error?.error ||
          error?.response?.data?.error ||
          "Xác thực thất bại. Vui lòng thử lại.";
    setError(error?.error);
    if (isRetryableError(error) && retryAttempt < MAX_RETRY_ATTEMPTS) {
      setStatus("retrying");
      setRetryCount(retryAttempt + 1);

      setTimeout(() => {
        verifyEmail(retryAttempt + 1);
      }, RETRY_DELAY * (retryAttempt + 1));
    } else {
      setStatus("error");
      setError(errorMessage);
    }
  }, []);

  const verifyEmail = useCallback(
    async (retryAttempt = 0) => {
      // Prevent double execution
      if (hasVerified.current && retryAttempt === 0) return;
      if (retryAttempt === 0) hasVerified.current = true;

      if (!token) {
        setStatus("invalid_token");
        setError("Không tìm thấy mã xác thực trong URL");
        return;
      }

      try {
        setStatus("loading");
        setError(null);

        const res = await Auth.verifyEmail(token);

        if (res.success) {
          setStatus("success");

          setTimeout(() => {
            navigate("/auth/signin", { replace: true });
          }, 3000);
        } else {
          // Xử lý các loại lỗi cụ thể từ server
          handleVerificationError(res.message);
        }
      } catch (error) {
        handleVerificationError(error, retryAttempt);
      }
    },
    [token, navigate, handleVerificationError]
  );

  const isRetryableError = (error) => {
    const retryableCodes = ["NETWORK_ERROR", "TIMEOUT", "SERVER_ERROR"];
    return (
      retryableCodes.includes(error?.code) || error?.name === "NetworkError"
    );
  };

  const handleResendEmail = async () => {
    try {
      setStatus("resending");
      const decoded = jwtDecode(token);
      await Auth.resendVerificationEmail(decoded.email);
      setStatus("resent");
      setTimeout(() => setStatus("error"), 3000);
    } catch (error) {
      console.log(error);
      setError("Người dùng không tồn tại hoặc đã xác thực");
      setStatus("error");
    }
  };

  const handleManualRetry = () => {
    hasVerified.current = false;
    setRetryCount(0);
    verifyEmail();
  };

  useEffect(() => {
    if (!hasVerified.current && token) {
      verifyEmail(0);
    } else if (!token) {
      setStatus("invalid_token");
      setError("Không tìm thấy mã xác thực trong URL");
    }
  }, []);

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <>
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-500" />
            <p className="mt-4 text-gray-300">Đang xác thực email...</p>
          </>
        );

      case "retrying":
        return (
          <>
            <RefreshCw className="mx-auto h-12 w-12 animate-spin text-yellow-500" />
            <p className="mt-4 text-gray-300">
              Đang thử lại... (Lần thử {retryCount}/{MAX_RETRY_ATTEMPTS})
            </p>
          </>
        );

      case "success":
        return (
          <>
            <CheckCircle className="mx-auto h-16 w-16 text-green-400" />
            <h2 className="mt-4 text-2xl font-bold text-green-400">
              Xác thực thành công!
            </h2>
            <p className="mt-2 text-gray-300">
              Tài khoản của bạn đã được xác thực thành công.
            </p>
            <p className="mt-1 text-sm text-gray-400">
              Đang chuyển đến trang đăng nhập...
            </p>
            <div className="mt-4 space-y-2">
              <AuthButton
                label="Đăng nhập ngay"
                onClick={() => navigate("/auth/signin", { replace: true })}
              />
            </div>
          </>
        );

      case "resending":
        return (
          <>
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-500" />
            <p className="mt-4 text-gray-300">Đang gửi lại email xác thực...</p>
          </>
        );

      case "resent":
        return (
          <>
            <CheckCircle className="mx-auto h-16 w-16 text-green-400" />
            <h2 className="mt-4 text-2xl font-bold text-green-400">
              Đã gửi lại!
            </h2>
            <p className="mt-2 text-gray-300">
              Vui lòng kiểm tra email và click vào liên kết xác thực mới.
            </p>
          </>
        );

      case "invalid_token":
        return (
          <>
            <AlertCircle className="mx-auto h-16 w-16 text-orange-400" />
            <h2 className="mt-4 text-2xl font-bold text-orange-400">
              URL không hợp lệ
            </h2>
            <p className="mt-2 text-gray-300">{error}</p>
            <div className="mt-6 space-y-2">
              <AuthButton
                label="Về trang chủ"
                onClick={() => navigate("/", { replace: true })}
              />
            </div>
          </>
        );

      case "error":
      default:
        return (
          <>
            <XCircle className="mx-auto h-16 w-16 text-red-400" />
            <h2 className="mt-4 text-2xl font-bold text-red-400">
              Xác thực thất bại!
            </h2>
            <p className="mt-2 text-gray-300">{error}</p>
            <div className="mt-6 space-y-2">
              <AuthButton
                label="Thử lại"
                onClick={handleManualRetry}
                className="bg-blue-600 hover:bg-blue-700"
              />
              <AuthButton
                label="Gửi lại email xác thực"
                onClick={handleResendEmail}
                variant="outline"
              />
              <AuthButton
                label="Về trang chủ"
                onClick={() => navigate("/", { replace: true })}
                variant="ghost"
              />
            </div>
          </>
        );
    }
  };

  return (
    <AuthLayout>
      <div className="text-center max-w-md mx-auto">{renderContent()}</div>
    </AuthLayout>
  );
};

export default VerifyEmail;
