import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { user, accessToken } = useSelector((state) => state.auth);
  return user && accessToken ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
