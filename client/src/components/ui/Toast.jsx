import { useEffect } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

const ICONS = {
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
  error: <XCircle className="w-5 h-5 text-red-500" />,
  warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
};

const COLORS = {
  success: "bg-green-50 border-green-300 text-green-700",
  error: "bg-red-50 border-red-300 text-red-700",
  warning: "bg-yellow-50 border-yellow-300 text-yellow-700",
  info: "bg-blue-50 border-blue-300 text-blue-700",
};

const Toast = ({ type = "info", message, onClose, duration = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 max-w-sm w-full shadow-lg rounded-xl px-4 py-3 border flex items-start space-x-3 animate-slide-in ${COLORS[type]}`}
    >
      <div>{ICONS[type]}</div>
      <div className="flex-1 text-sm">{message}</div>
      <button onClick={onClose}>
        <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
      </button>
    </div>
  );
};

export default Toast;

// import { useState } from "react";
// import Toast from "../ui/Toast";

// const Example = () => {
//   const [toast, setToast] = useState(null);

//   const handleSuccess = () => {
//     setToast({ type: "success", message: "Cập nhật thành công!" });
//   };

//   return (
//     <div>
//       <button
//         onClick={handleSuccess}
//         className="bg-green-500 text-white px-4 py-2 rounded"
//       >
//         Hiện Toast
//       </button>

//       {toast && (
//         <Toast
//           type={toast.type}
//           message={toast.message}
//           onClose={() => setToast(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default Example;
