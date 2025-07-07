const InputField = ({
  inputRef,
  label,
  type = "text",
  name,
  value,
  onChange,
  icon: Icon,
  error,
}) => {
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
        {Icon && <Icon className="w-5 h-5 mr-2 text-gray-400" />}
        <input
          ref={inputRef}
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
