import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";
import { useEffect } from "react";
import clsx from "clsx";

const iconMap = {
  success: <CheckCircle className="w-6 h-6 text-green-600" />,
  error: <XCircle className="w-6 h-6 text-red-600" />,
  info: <Info className="w-6 h-6 text-blue-600" />,
  warning: <AlertTriangle className="w-6 h-6 text-yellow-600" />,
};

const bgMap = {
  success: "bg-green-50 border-green-300",
  error: "bg-red-50 border-red-300",
  info: "bg-blue-50 border-blue-300",
  warning: "bg-yellow-50 border-yellow-300",
};

const AuthAlert = ({ type = "info", message, onClose, duration = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={clsx(
        "flex items-start gap-3 p-4 border rounded-xl shadow-lg max-w-md w-full animate-fade-in-up",
        bgMap[type]
      )}
    >
      <div className="pt-1">{iconMap[type]}</div>
      <div className="flex text-sm text-gray-700 text-center justify-center mt-1">
        {message + "!!!"}
      </div>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default AuthAlert;
