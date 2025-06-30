import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

const PasswordField = ({ label, name, value, onChange, error }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="mb-4">
      <div className="flex items-center">
        <label className="text-sm font-medium whitespace-nowrap">
          {label} <span className="text-red-500">*</span>
        </label>
        {error && (
          <span className="text-sm text-red-400 ml-2 whitespace-nowrap">
            {error}
          </span>
        )}
      </div>
      <div
        className={`flex items-center mt-1 px-3 py-2 rounded-xl border backdrop-blur-md
        ${
          error ? "border-red-500 bg-red-100/10" : "border-gray-300 bg-white/10"
        }`}
      >
        <Lock className="w-5 h-5 mr-2 text-gray-400" />
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          className="bg-transparent focus:outline-none text-white w-full"
        />
        <button type="button" onClick={() => setShow(!show)}>
          {show ? (
            <EyeOff className="w-4 h-4 text-gray-400" />
          ) : (
            <Eye className="w-4 h-4 text-gray-400" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordField;
