// layouts/AuthLayout.jsx
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";

const AuthLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export default AuthLayout;
