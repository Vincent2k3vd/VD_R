// layouts/AuthLayout.jsx
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const AuthLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export default AuthLayout;
