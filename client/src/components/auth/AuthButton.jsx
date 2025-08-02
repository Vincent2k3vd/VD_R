import React from "react";
import { Loader2 } from "lucide-react";

const AuthButton = ({ label, type = "submit", loading = false, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`mt-6 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-xl transition hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
    >
      {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : null}
      {loading ? "Đang xử lý..." : label}
    </button>
  );
};

export default AuthButton;
