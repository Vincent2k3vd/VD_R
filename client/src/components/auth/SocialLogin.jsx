import { GoogleLogin } from "@react-oauth/google";

const SocialLogin = ({ onGoogleClick }) => {
  return (
    <div className="flex flex-col gap-2 mt-4">
      <GoogleLogin
        onSuccess={onGoogleClick}
        onError={() => console.log("Google login failed")}
        useOneTap
        width="100%"
        text="signin_with"
        theme="filled_black"
      />
    </div>
  );
};

export default SocialLogin;
