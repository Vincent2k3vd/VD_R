import React from "react";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  iconLeft: IconLeft,
  iconRight: IconRight,
  className = "",
}) {
  const baseStyle =
    "inline-flex items-center justify-center font-medium rounded-lg transition focus:outline-none";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-2.5 text-lg",
  };

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const spinnerColor = variant === "secondary" ? "text-gray-600" : "text-white";

  const isDisabled = loading || disabled;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        ${baseStyle}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {loading ? (
        <svg
          className={`animate-spin h-5 w-5 mr-2 ${spinnerColor}`}
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          ></path>
        </svg>
      ) : IconLeft ? (
        <IconLeft className="mr-2" size={18} />
      ) : null}
      {children}
      {IconRight && !loading && <IconRight className="ml-2" size={18} />}
    </button>
  );
}
