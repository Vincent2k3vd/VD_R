import { createBrowserRouter } from "react-router-dom";
import { createElement } from "react";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

// Lazy load
import { lazy } from "react";
const Home = lazy(() => import("../pages/navbar/HomePage"));
const About = lazy(() => import("../pages/navbar/About"));
const Contact = lazy(() => import("../pages/navbar/Contact"));
const Menu = lazy(() => import("../pages/navbar/MenuPage"));
const Profile = lazy(() => import("../pages/profile/ProfilePage"));
const Booking = lazy(() => import("../pages/Reservation/ReservationPage"));
const NotFound = lazy(() => import("../pages/navbar/NotFound"));
const SignIn = lazy(() => import("../pages/auth/LoginPage"));
const SignUp = lazy(() => import("../pages/auth/RegisterPage"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPasswordPage"));
const ResetPassword = lazy(() => import("../pages/auth/ResetPasswordPage"));
const VerifyEmail = lazy(() => import("../pages/auth/EmailVerificationPage"));
const TableList = lazy(() => import("../pages/TableList"));

const Dashboard = lazy(() => import("../pages/admin/Dashboard"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: createElement(MainLayout),
    children: [
      { index: true, element: createElement(Home) },
      { path: "about", element: createElement(About) },
      { path: "contact", element: createElement(Contact) },
      { path: "menu", element: createElement(Menu) },
      { path: "profile", element: createElement(Profile) },
      { path: "reservation", element: createElement(Booking) },
      { path: "tablelist", element: createElement(TableList) },
      { path: "dashboard", element: createElement(Dashboard) },
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
