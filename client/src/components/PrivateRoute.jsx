import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Giả sử bạn có auth hook

const PrivateRoute = ({ children, requiredRoles = [] }) => {
  const { user, isAuthenticated, loading } = useAuth();

  // Hiển thị loading khi đang kiểm tra authentication
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect đến login nếu chưa đăng nhập
  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" replace />;
  }

  // Kiểm tra quyền truy cập nếu có yêu cầu role cụ thể
  if (requiredRoles.length > 0 && !requiredRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
