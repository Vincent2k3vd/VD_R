import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import PrivateRoute from "../components/routes/PrivateRoute";
import AdminRoute from "../components/routes/AdminRoute";

import { publicRoutes } from "./publicRoutes";
import { privateRoutes } from "./privateRoutes";
import { adminRoutes } from "./adminRoutes";

import { lazy } from "react";
const SignIn = lazy(() => import("../pages/auth/LoginPage"));
const SignUp = lazy(() => import("../pages/auth/RegisterPage"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPasswordPage"));
const ResetPassword = lazy(() => import("../pages/auth/ResetPasswordPage"));
const VerifyEmail = lazy(() => import("../pages/auth/EmailVerificationPage"));
const NotFound = lazy(() => import("../pages/navbar/NotFound"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      ...publicRoutes,
      {
        element: <PrivateRoute />,
        children: [...privateRoutes],
      },
      {
        element: <AdminRoute />,
        children: [...adminRoutes],
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      { path: "forgotpassword", element: <ForgotPassword /> },
      { path: "resetpassword", element: <ResetPassword /> },
      { path: "verifyemail", element: <VerifyEmail /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default routes;
