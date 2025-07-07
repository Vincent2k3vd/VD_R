import { createBrowserRouter } from "react-router-dom";
import { createElement } from "react";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

// Lazy load
import { lazy } from "react";
const Home = lazy(() => import("../pages/HomePage"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const Profile = lazy(() => import("../pages/profile/ProfilePage"));
const Booking = lazy(() => import("../pages/booking/BookingPage"));
const NotFound = lazy(() => import("../pages/NotFound"));
const SignIn = lazy(() => import("../pages/auth/LoginPage"));
const SignUp = lazy(() => import("../pages/auth/RegisterPage"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPasswordPage"));
const ResetPassword = lazy(() => import("../pages/auth/ResetPasswordPage"));
const VerifyEmail = lazy(() => import("../pages/auth/EmailVerificationPage"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: createElement(MainLayout),
    children: [
      { index: true, element: createElement(Home) },
      { path: "info", element: createElement(About) },
      { path: "contact", element: createElement(Contact) },
      { path: "profile", element: createElement(Profile) },
      { path: "reservation", element: createElement(Booking) },
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
