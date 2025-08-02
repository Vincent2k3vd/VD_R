import { lazy } from "react";

const Profile = lazy(() => import("../pages/profile/ProfilePage"));
const Booking = lazy(() => import("../pages/Reservation/ReservationPage"));

export const privateRoutes = [
  { path: "profile", element: <Profile /> },
  { path: "reservation", element: <Booking /> },
];
