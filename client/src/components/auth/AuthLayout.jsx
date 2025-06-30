import React from "react";
import bglogin from "../../assets/bglogin.png";

const AuthLayout = ({ children }) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white"
      style={{
        backgroundImage: `url(${bglogin})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md bg-black/10 p-8 rounded-2xl backdrop-blur-lg border border-white/20 shadow-2xl">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
