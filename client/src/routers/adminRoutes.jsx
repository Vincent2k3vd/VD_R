import { lazy } from "react";

const Dashboard = lazy(() => import("../pages/admin/AdminDashboard"));

export const adminRoutes = [{ path: "/dashboard", element: <Dashboard /> }];
