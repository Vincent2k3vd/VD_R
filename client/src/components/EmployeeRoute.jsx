import PrivateRoute from "./PrivateRoute";

const EmployeeRoute = ({ children }) => {
  return (
    <PrivateRoute requiredRoles={["admin", "employee"]}>
      {children}
    </PrivateRoute>
  );
};

export default EmployeeRoute;
