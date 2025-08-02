import { lazy } from "react";

const Home = lazy(() => import("../pages/navbar/HomePage"));
const About = lazy(() => import("../pages/navbar/About"));
const Contact = lazy(() => import("../pages/navbar/Contact"));
const Menu = lazy(() => import("../pages/navbar/MenuPage"));

export const publicRoutes = [
  { index: true, element: <Home /> },
  { path: "about", element: <About /> },
  { path: "contact", element: <Contact /> },
  { path: "menu", element: <Menu /> },
];
