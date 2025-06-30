import { createBrowserRouter } from "react-router-dom";
import { createElement } from "react";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

// Lazy load
import { lazy } from "react";
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const Profile = lazy(() => import("../pages/Profile"));
const NotFound = lazy(() => import("../pages/NotFound"));
const SignIn = lazy(() => import("../pages/auth/SignIn"));
const SignUp = lazy(() => import("../pages/auth/SignUp"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/auth/ResetPassword"));
const VerifyEmail = lazy(() => import("../pages/auth/VerifyEmail"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: createElement(MainLayout),
    children: [
      { index: true, element: createElement(Home) },
      { path: "info", element: createElement(About) },
      { path: "contact", element: createElement(Contact) },
      { path: "profile", element: createElement(Profile) },
    ],
  },
  {
    path: "/auth",
    element: createElement(AuthLayout),
    children: [
      { path: "signin", element: createElement(SignIn) },
      { path: "signup", element: createElement(SignUp) },
      { path: "forgotpassword", element: createElement(ForgotPassword) },
      { path: "resetpassword", element: createElement(ResetPassword) },
      { path: "verifyemail", element: createElement(VerifyEmail) },
    ],
  },

  {
    path: "*",
    element: createElement(NotFound),
  },
]);

export default routes;
