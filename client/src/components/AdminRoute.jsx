import PrivateRoute from "./PrivateRoute";

const AdminRoute = ({ children }) => {
  return <PrivateRoute requiredRoles={["admin"]}>{children}</PrivateRoute>;
};

export default AdminRoute;
