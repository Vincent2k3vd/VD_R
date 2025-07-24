import React from "react";
import { Check } from "lucide-react";

const StepHeader = ({ step }) => {
  return (
    <div className="mb-10 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Đặt Bàn Nhà Hàng
      </h1>
      <div className="flex justify-center items-center space-x-4">
        {[1, 2, 3].map((stepNum) => (
          <div key={stepNum} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                ${
                  step >= stepNum
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
            >
              {step > stepNum ? <Check className="w-4 h-4" /> : stepNum}
            </div>
            <span
              className={`ml-2 text-sm ${
                step >= stepNum ? "text-blue-600" : "text-gray-500"
              }`}
            >
              {stepNum === 1
                ? "Chọn bàn"
                : stepNum === 2
                ? "Chọn món"
                : "Xác nhận"}
            </span>
            {stepNum < 3 && <div className="w-8 h-px bg-gray-300 mx-4" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepHeader;
