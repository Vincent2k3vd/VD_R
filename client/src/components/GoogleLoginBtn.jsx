// src/components/GoogleLoginBtn.jsx
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const GoogleLoginBtn = () => {
  const handleLogin = async (credentialResponse) => {
    const id_token = credentialResponse.credential;
    const userInfo = jwt_decode(id_token);

    // Gửi id_token lên server để xác thực
    const res = await fetch("http://localhost:5000/api/auth/google-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // nếu backend trả cookie
      body: JSON.stringify({ id_token }),
    });

    const data = await res.json();
    console.log(data); // thông tin user + token từ server
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_CLIENT_ID_HERE">
      <GoogleLogin
        onSuccess={handleLogin}
        onError={() => console.log("Login Failed")}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginBtn;
