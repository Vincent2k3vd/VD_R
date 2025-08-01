// components/routes/AdminRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/auth/signin" />;
  if (user.role !== 1 && user.role !== 2) return <Navigate to="/" />;

  return <Outlet />;
};

export default AdminRoute;
