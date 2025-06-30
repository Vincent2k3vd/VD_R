import React from "react";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  icon: Icon,
}) => {
  return (
    <div className="mb-4">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex items-center mt-1 bg-white/10 border border-gray-300 rounded-xl px-3 py-2 backdrop-blur-md">
        {Icon && <Icon className="w-4 h-4 mr-2 text-gray-400" />}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="bg-transparent focus:outline-none text-white w-full"
        />
      </div>
    </div>
  );
};

export default InputField;
